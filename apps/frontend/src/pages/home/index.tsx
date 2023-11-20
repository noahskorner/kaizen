import { Link } from '@kaizen/ui';
import { routes } from '../routes';

export const HomePage = () => {
  return (
    <div className="flex flex-col gap-2">
      <Link to={routes.login.path}>/login</Link>
      <Link to={routes.register.path}>/register</Link>
    </div>
  );
};
