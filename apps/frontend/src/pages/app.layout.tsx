import { Outlet, useNavigate } from 'react-router-dom';
import { AuthRoute, AuthDispatch, logout } from '@kaizen/auth-client';
import { paths } from './routes';
import {
  Sidebar,
  SidebarDispatch,
  selectShowSidebar,
  toggleSidebarAction
} from '@kaizen/core-client';
import { useDispatch, useSelector } from 'react-redux';
import { AssistClient } from '@kaizen/assist-client';
import { useRef, useState } from 'react';

export const AppLayout = () => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const dispatch = useDispatch<AuthDispatch & SidebarDispatch>();
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

  const onSidebarToggleClick = () => {
    dispatch(toggleSidebarAction());
  };

  return (
    <AuthRoute onUnauthenticated={onUnauthenticated}>
      <div className="flex h-screen">
        <Sidebar
          transcribedAudio={transcribedAudio}
          dashboardHref={paths.dashboard}
          spendingHref={paths.spending}
          accountHref={paths.settings}
          onLogoutClick={onLogoutClick}
          onAssistantClick={onAssistantClick}
        />
        <div className="fixed left-0 right-0 top-0 flex w-full flex-col items-start justify-between px-3 py-2">
          <button
            onClick={onSidebarToggleClick}
            className={`${!showSidebar ? 'appear' : 'disappear'} rounded-lg bg-zinc-600 p-2 text-zinc-50 hover:bg-zinc-500`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className={`${showSidebar ? 'md:ml-64' : ''} w-full p-2 lg:p-8`}>
          <Outlet />
        </div>
      </div>
    </AuthRoute>
  );
};
