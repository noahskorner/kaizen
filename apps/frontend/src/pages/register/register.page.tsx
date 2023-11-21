import { CreateUserForm } from '@kaizen/user-client';
import { useNavigate } from 'react-router-dom';
import { routes } from '../routes';

export const RegisterPage = () => {
  const navigate = useNavigate();

  const onRegisterSuccess = () => {
    navigate(routes.login.path);
  };

  return <CreateUserForm onRegisterSuccess={onRegisterSuccess} />;
};
