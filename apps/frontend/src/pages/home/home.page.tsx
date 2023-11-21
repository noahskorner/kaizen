import { Button, Link } from '@kaizen/ui';
import { routes } from '../routes';
import { authService } from '@kaizen/auth-client';
import { useAuthStore } from '@kaizen/auth-client/src/use-auth-store';

export const HomePage = () => {
  const authStore = useAuthStore();

  const onLogoutClick = async () => {
    await authService.logout();
    authStore.logout();
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
        {authStore.isLoggedIn && (
          <Button onClick={onLogoutClick}>logout</Button>
        )}
      </div>
    </div>
  );
};
