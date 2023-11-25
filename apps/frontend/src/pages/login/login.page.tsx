import { LoginForm } from '@kaizen/auth-client';
import { routes } from '../routes';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <LoginForm onLoginSuccess={() => navigate(routes.dashboard.path)} />
    </div>
  );
};
