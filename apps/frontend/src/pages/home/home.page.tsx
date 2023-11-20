import { Link } from '@kaizen/ui';
import { routes } from '../routes';

export const HomePage = () => {
  return (
    <div className="flex flex-col gap-2 p-2">
      {Object.keys(routes).map((key) => {
        return (
          <Link key={key} to={routes[key].path ?? '/'}>
            {routes[key].path}
          </Link>
        );
      })}
    </div>
  );
};
