import './sidebar.css';
import { useEffect, useRef } from 'react';
import { SidebarButton } from './sidebar-link';
import {
  BankNotesIcon,
  LogoutIcon,
  SidebarDispatch,
  selectShowSidebar,
  toggleSidebarAction
} from '@kaizen/core-client';
import { useDispatch, useSelector } from 'react-redux';

export interface SidebarProps {
  transcribedAudio: string | null;
  financeHref: string;
  onLogoutClick?: React.MouseEventHandler<HTMLButtonElement>;
  onAssistantClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Sidebar = ({ financeHref, onLogoutClick }: SidebarProps) => {
  const firstRenderRef = useRef(true);
  const dispatch = useDispatch<SidebarDispatch>();
  const showSidebar = useSelector(selectShowSidebar);

  const toggleSidebar = () => {
    dispatch(toggleSidebarAction());
  };

  useEffect(() => {
    firstRenderRef.current = false;
  }, []);

  return (
    <>
      <div
        className={`${showSidebar ? (!firstRenderRef.current ? 'slide-in-from-left' : '') : 'slide-out-from-left'} fixed h-full`}>
        <div
          className={`flex h-full w-64 flex-col items-center justify-between bg-neutral-700 px-3 py-2 text-neutral-600`}>
          <div className="flex w-full flex-col gap-y-4">
            <div>
              <button
                onClick={toggleSidebar}
                className="rounded-lg p-2 text-neutral-50 hover:bg-neutral-600">
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
            <SidebarButton
              icon={<BankNotesIcon />}
              href={financeHref}
              label="Finances"
            />
          </div>
          <div className="w-full">
            <p className="mb-2 text-xs text-neutral-100">Account</p>
            <SidebarButton
              icon={<LogoutIcon />}
              onClick={onLogoutClick}
              label="Logout"
            />
          </div>
        </div>
      </div>
      <button
        onClick={toggleSidebar}
        className={`${!showSidebar ? 'appear' : 'disappear'} fixed left-3 top-2 rounded-lg bg-neutral-700 p-2 text-neutral-50 hover:bg-neutral-800`}>
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
    </>
  );
};
