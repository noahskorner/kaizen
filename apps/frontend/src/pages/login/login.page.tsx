import { LoginForm } from '@kaizen/auth-client';
import { routes } from '../routes';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const navigate = useNavigate();

  return <LoginForm onLoginSuccess={() => navigate(routes.home.path)} />;
};
