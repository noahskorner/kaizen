import { Button, Link } from '@kaizen/ui';
import { routes } from '../routes';
import { useAuthStore } from '@kaizen/auth-client/src/use-auth-store';
import { useNavigate } from 'react-router-dom';

const HOME_PAGE_LOGOUT_BUTTON_ID = 'home-page-logout-button';

export const HomePage = () => {
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const onLogoutClick = async () => {
    authStore.logout();
    navigate(routes.home.path);
  };

  return (
    <div className="flex flex-col gap-y-8 p-4">
      <div className="flex flex-col gap-2">
        {Object.keys(routes).map((key) => {
          return (
            <Link key={key} to={routes[key].path ?? '/'}>
              {routes[key].path}
            </Link>
          );
        })}
        {authStore.authenticated && (
          <Button id={HOME_PAGE_LOGOUT_BUTTON_ID} onClick={onLogoutClick}>
            logout
          </Button>
        )}
      </div>
    </div>
  );
};
