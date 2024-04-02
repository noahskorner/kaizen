import { Outlet, useNavigate } from 'react-router-dom';
import { AuthRoute, logoutAction, AuthDispatch } from '@kaizen/auth-client';
import { paths } from '../routes';
import { Sidebar } from '@kaizen/core-client';
import { useDispatch } from 'react-redux';

export const DashboardLayout = () => {
  const dispatch = useDispatch<AuthDispatch>();
  const navigate = useNavigate();

  const onLogoutClick = () => {
    dispatch(logoutAction());
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
