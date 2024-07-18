import { Button, Input } from '@kaizen/core-client';

export const HomePage = () => {
  return (
    <div className="flex flex-col gap-y-8 p-4">
      <div className="flex flex-col gap-2">
        <Button to={'/'}>/</Button>
        <Button to={'/login?email=noahskorner@gmail.com&password=12345678a$'}>
          /login
        </Button>
        <Button to={'/register'}>/register</Button>
        <Button to={'/dashboard'}>/dashboard</Button>
        <Button to={'/dashboard/finance'}>/dashboard/finance</Button>
        <Input />
      </div>
    </div>
  );
};
