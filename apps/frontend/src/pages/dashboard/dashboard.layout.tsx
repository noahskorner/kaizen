import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { AuthRoute } from '@kaizen/auth-client/src/auth-route';
import { paths } from '../routes';

export const DashboardLayout = () => {
  const navigate = useNavigate();

  const onUnauthenticated = () => {
    navigate(paths.login);
  };

  return (
    <AuthRoute onUnauthenticated={onUnauthenticated}>
      <div className="flex h-screen">
        <Sidebar />
        <div className="ml-64 w-full p-2">
          <Outlet />
        </div>
      </div>
    </AuthRoute>
  );
};
