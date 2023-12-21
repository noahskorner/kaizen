import { useAuthStore } from '@kaizen/auth-client';
import { useNavigate } from 'react-router-dom';
import { paths } from '../routes';
import { SidebarButton } from './sidebar-link';
import { BankNotesIcon, CoinsIcon, LogoutIcon, TodosIcon } from '@kaizen/core-client';
import { Avatar } from './avatar';

export const Sidebar = () => {
  const navigate = useNavigate();
  const authStore = useAuthStore();

  const onLogoutClick = () => {
    authStore.logout();
    navigate(paths.home);
  };

  return (
    <div className="fixed h-full">
      <div className="bg-primary-800 flex h-full w-64 flex-col items-center justify-between p-4 text-neutral-600">
        <div className="flex w-full flex-col gap-y-4">
          <div className="border-primary-700 flex items-center gap-x-3 border-b pb-4">
            <Avatar />
            <div className="flex flex-col gap-y-1">
              <h6 className="text-sm font-medium text-neutral-50">
                Noah Korner
              </h6>
              <div className="text-neutral-0 -ml-1 flex items-center">
                <CoinsIcon />
                <span className="text-xs text-yellow-300">4,422</span>
              </div>
            </div>
          </div>

          <div className="w-full">
            <p className="mb-2 text-xs text-neutral-100">Dashboards</p>
            <SidebarButton
              icon={<BankNotesIcon />}
              href={paths.finance}
              label="Finances"
            />
            <SidebarButton
              icon={<TodosIcon />}
              href={paths.todos}
              label="Todos"
            />
          </div>
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
