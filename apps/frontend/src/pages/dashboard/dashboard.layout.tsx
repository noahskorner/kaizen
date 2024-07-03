import { Outlet, useNavigate } from 'react-router-dom';
import { AuthRoute, AuthDispatch, logout } from '@kaizen/auth-client';
import { paths } from '../routes';
import { Sidebar, selectShowSidebar } from '@kaizen/core-client';
import { useDispatch, useSelector } from 'react-redux';
import { AssistClient } from '@kaizen/assist-client';
import { useRef, useState } from 'react';

export const DashboardLayout = () => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const dispatch = useDispatch<AuthDispatch>();
  const navigate = useNavigate();
  const [transcribedAudio, setTranscribedAudio] = useState<string | null>(null);
  const showSidebar = useSelector(selectShowSidebar);

  const onLogoutClick = () => {
    dispatch(logout());
    navigate(paths.home);
  };

  const onUnauthenticated = () => {
    navigate(paths.login);
  };

  const transcribeAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });
      mediaRecorderRef.current = new MediaRecorder(stream);
      const audioChunks = new Array<Blob>();

      mediaRecorderRef.current.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorderRef.current.addEventListener('stop', async () => {
        const response = await AssistClient.transcribe(
          new Blob(audioChunks, { type: 'audio/wav' })
        );
        if (response.type === 'SUCCESS') {
          setTranscribedAudio(response.data);
        }
      });

      mediaRecorderRef.current.start();
    } catch (error) {
      console.error(error);
    }
  };

  const onAssistantClick = async () => {
    if (mediaRecorderRef.current === null) {
      await transcribeAudio();
    } else {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
  };

  return (
    <AuthRoute onUnauthenticated={onUnauthenticated}>
      <div className="flex h-screen">
        <Sidebar
          transcribedAudio={transcribedAudio}
          financeHref={paths.finance}
          onLogoutClick={onLogoutClick}
          onAssistantClick={onAssistantClick}
        />
        <div className={`${showSidebar ? 'md:ml-64' : 'ml-12'} w-full px-2`}>
          <Outlet />
        </div>
      </div>
    </AuthRoute>
  );
};
