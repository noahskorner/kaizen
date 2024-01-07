import { Button } from '@kaizen/core-client';
import { paths } from '../routes';
import { useAuthStore } from '@kaizen/auth-client';
import { useNavigate } from 'react-router-dom';

const HOME_PAGE_LOGOUT_BUTTON_ID = 'home-page-logout-button';

export const HomePage = () => {
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const onLogoutClick = async () => {
    authStore.logout();
    navigate(paths.home);
  };

  return (
    <div className="flex flex-col gap-y-8 p-4">
      <div className="flex flex-col gap-2">
        {Object.keys(paths).map((key) => {
          return (
            <Button key={key} to={paths[key]}>
              {paths[key]}
            </Button>
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
