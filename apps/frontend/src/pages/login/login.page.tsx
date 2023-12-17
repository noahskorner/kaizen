import { LoginForm } from '@kaizen/auth-client';
import { useNavigate } from 'react-router-dom';
import { paths } from '../routes';

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <LoginForm onLoginSuccess={() => navigate(paths.finance)} />
    </div>
  );
};
