import { Outlet, useNavigate } from 'react-router-dom';
import { AuthRoute, useAuthStore } from '@kaizen/auth-client';
import { paths } from '../routes';
import { Sidebar } from '@kaizen/core-client';

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const authStore = useAuthStore();

  const onLogoutClick = () => {
    authStore.logout();
    navigate(paths.home);
  };

  const onUnauthenticated = () => {
    navigate(paths.login);
  };

  return (
    <AuthRoute onUnauthenticated={onUnauthenticated}>
      <div className="flex h-screen">
        <Sidebar financeHref={paths.finance} onLogoutClick={onLogoutClick} />
        <div className="w-full p-2 md:ml-64">
          <Outlet />
        </div>
      </div>
    </AuthRoute>
  );
};
