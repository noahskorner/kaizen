import { Outlet, useNavigate } from 'react-router-dom';
import { AuthRoute, AuthDispatch, logout } from '@kaizen/auth-client';
import { paths } from './routes';
import {
  Button,
  Form,
  Input,
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
      <div className="flex h-screen flex-col overflow-hidden">
        <Navbar />
        <Sidebar
          transcribedAudio={transcribedAudio}
          dashboardHref={paths.dashboard}
          spendingHref={paths.spending}
          accountHref={paths.accounts}
          settingsHref={paths.settings}
          onLogoutClick={onLogoutClick}
          onAssistantClick={onAssistantClick}
        />
        <div
          className={`${showSidebar ? 'md:ml-64' : ''} flex w-full justify-center overflow-auto px-4 pt-12`}>
          <Outlet />
        </div>
      </div>
    </AuthRoute>
  );
};

const Navbar = () => {
  const dispatch = useDispatch<SidebarDispatch>();

  const toggleSidebar = () => {
    dispatch(toggleSidebarAction());
  };

  return (
    <div className="fixed top-0 z-10 flex h-12 w-full items-center justify-between border-b border-zinc-800 bg-zinc-950 bg-opacity-60 px-2 backdrop-blur-md">
      <div className="w-1/3">
        <Button
          onClick={toggleSidebar}
          size="icon"
          variant="ghost"
          className="rounded-lg p-2 text-zinc-50 hover:bg-zinc-700">
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
        </Button>
      </div>
      <div className="w-1/3">
        <div>
          <Form>
            <Input
              className="h-8 text-xs dark:bg-zinc-900"
              placeholder="Search for anything"
            />
          </Form>
        </div>
      </div>
      <div className="w-1/3"></div>
    </div>
  );
};
