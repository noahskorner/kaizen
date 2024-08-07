import {
  SidebarDispatch,
  toggleSidebarAction,
  Button,
  Input
} from '@kaizen/core-client';
import { useDispatch } from 'react-redux';
import { Form } from 'react-router-dom';

export const Navbar = () => {
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
