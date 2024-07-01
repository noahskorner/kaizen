import { SidebarButton } from './sidebar-link';
import {
  BankNotesIcon,
  CoinsIcon,
  LogoutIcon,
  SparklesIcon
} from '@kaizen/core-client';
import { Avatar } from './avatar';
import { selectWallet } from '@kaizen/wallet-client';
import { useSelector } from 'react-redux';

export interface SidebarProps {
  transcribedAudio: string | null;
  financeHref: string;
  onLogoutClick?: React.MouseEventHandler<HTMLButtonElement>;
  onAssistantClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Sidebar = ({
  transcribedAudio,
  financeHref,
  onLogoutClick,
  onAssistantClick
}: SidebarProps) => {
  const wallet = useSelector(selectWallet);

  return (
    <div className="fixed h-full">
      <div
        className={`hidden h-full w-full flex-col items-center justify-between bg-neutral-700 px-3 py-2 text-neutral-600 md:flex md:w-64`}>
        <div className="flex w-full flex-col gap-y-4">
          <div>
            <button className="rounded-lg p-2 text-neutral-50 hover:bg-neutral-600">
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
          {/* <div className="flex items-center gap-x-3 border-b border-neutral-700 pb-4">
            <Avatar />
            <div className="flex flex-col gap-y-1">
              <h6 className="text-sm font-medium text-neutral-50">
                Noah Korner
              </h6>
              <div className="-ml-1 flex items-center text-neutral-0">
                <CoinsIcon />
                {wallet && (
                  <span className="text-xs text-neutral-0">
                    {wallet.balance}
                  </span>
                )}
              </div>
            </div>
          </div> */}

          {/* <SidebarButton
            onClick={onAssistantClick}
            icon={<SparklesIcon />}
            label="Assistant"
          /> */}
          {/* {transcribedAudio && (
            <p className="rounded-lg bg-indigo-500 p-4 text-xs text-neutral-100">
              {transcribedAudio}
            </p>
          )} */}
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
  );
};
