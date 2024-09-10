import { CreateUserForm } from '@kaizen/user-client';
import { useNavigate } from 'react-router-dom';
import { paths } from '../routes';
import { AuthLayout } from '../auth-layout';

export const RegisterPage = () => {
  const navigate = useNavigate();

  const onRegisterSuccess = () => {
    navigate(paths.login);
  };

  return (
    <AuthLayout>
      <CreateUserForm
        loginHref={paths.login}
        onRegisterSuccess={onRegisterSuccess}
      />
    </AuthLayout>
  );
};
