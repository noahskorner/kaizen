import { LoginForm } from '@kaizen/auth-client';
import { useNavigate } from 'react-router-dom';
import { paths } from '../routes';
import { useSearchParams } from '@kaizen/core-client';

export interface LoginPageQueryParams {
  email?: string;
  password?: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams<LoginPageQueryParams>();

  return (
    <div className="flex h-screen w-screen justify-center pt-4 lg:pt-16">
      <LoginForm
        registerHref={paths.register}
        email={searchParams.email}
        password={searchParams.password}
        onLoginSuccess={() => navigate(paths.dashboard)}
      />
    </div>
  );
};
