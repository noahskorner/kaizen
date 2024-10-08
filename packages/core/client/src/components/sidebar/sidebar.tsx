import './sidebar.css';
import { useEffect, useRef } from 'react';
import { SidebarButton } from './sidebar-link';
import { useDispatch, useSelector } from 'react-redux';
import { HomeIcon } from '../../icons/home';
import { TagIcon } from '../../icons/tag';
import { SidebarDispatch } from './sidebar.store';
import { selectShowSidebar } from './sidebar.selectors';
import { toggleSidebarAction } from './sidebar.actions';
import { SettingsIcon } from '../../icons/settings';
import { LogoutIcon } from '../../icons/logout';
import { CreditCardIcon, PresentationChartIcon } from '../../icons';
import { Button } from '../button/button';

export interface SidebarProps {
  transcribedAudio: string | null;
  dashboardHref: string;

  spendingHref: string;
  accountHref: string;
  settingsHref: string;
  retirementHref: string;
  onLogoutClick?: React.MouseEventHandler<HTMLButtonElement>;
  onAssistantClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Sidebar = ({
  dashboardHref,

  spendingHref,
  accountHref,
  settingsHref,
  retirementHref,
  onLogoutClick
}: SidebarProps) => {
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
        className={`${showSidebar ? (!firstRenderRef.current ? 'slide-in-from-left' : '') : 'slide-out-from-left'} fixed z-20 h-full`}>
        <div
          className={`flex h-full w-64 flex-col items-center justify-between border-r border-zinc-800 bg-zinc-950 p-2 text-zinc-600`}>
          <div className="flex w-full flex-col gap-y-4">
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
            <div className="flex flex-col gap-y-1">
              <SidebarButton
                icon={<HomeIcon />}
                href={dashboardHref}
                label="Dashboard"
              />
              <SidebarButton
                icon={<TagIcon />}
                href={spendingHref}
                label="Spending"
              />
              <SidebarButton
                icon={<CreditCardIcon />}
                href={accountHref}
                label="Accounts"
              />
              <SidebarButton
                icon={<PresentationChartIcon />}
                href={retirementHref}
                label="Retirement"
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-y-1">
            <SidebarButton
              icon={<SettingsIcon />}
              href={settingsHref}
              label="Settings"
            />
            <SidebarButton
              icon={<LogoutIcon />}
              onClick={onLogoutClick}
              label="Logout"
            />
          </div>
        </div>
      </div>
      {showSidebar && (
        <button
          onClick={toggleSidebar}
          className="fixed bottom-0 left-0 right-0 top-0 z-10 block bg-black bg-opacity-50 md:hidden"></button>
      )}
    </>
  );
};
