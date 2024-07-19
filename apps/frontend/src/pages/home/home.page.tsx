import { Button } from '@kaizen/core-client';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div className="flex flex-col gap-y-8 p-4">
      <div className="flex flex-col gap-2">
        <Button asChild variant={'secondary'}>
          <Link to={'/login?email=noahskorner@gmail.com&password=12345678a$'}>
            /login
          </Link>
        </Button>
        <Button asChild variant={'secondary'}>
          <Link to={'/register'}>/register</Link>
        </Button>
      </div>
    </div>
  );
};
