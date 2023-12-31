import { CreateUserForm } from '@kaizen/user-client';
import { useNavigate } from 'react-router-dom';
import { paths } from '../routes';

export const RegisterPage = () => {
  const navigate = useNavigate();

  const onRegisterSuccess = () => {
    navigate(paths.login);
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center lg:justify-center">
      <CreateUserForm
        loginHref={paths.login}
        onRegisterSuccess={onRegisterSuccess}
      />
    </div>
  );
};
