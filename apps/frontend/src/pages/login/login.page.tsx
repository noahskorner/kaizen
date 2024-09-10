import { LoginForm } from '@kaizen/auth-client';
import { useNavigate } from 'react-router-dom';
import { paths } from '../routes';
import { useSearchParams } from '@kaizen/core-client';
import { AuthLayout } from '../auth-layout';

export interface LoginPageQueryParams {
  email?: string;
  password?: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams<LoginPageQueryParams>();

  return (
    <AuthLayout>
      <LoginForm
        registerHref={paths.register}
        email={searchParams.email}
        password={searchParams.password}
        onLoginSuccess={() => navigate(paths.dashboard)}
      />
    </AuthLayout>
  );
};
