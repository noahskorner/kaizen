import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';
import { DashboardPage } from './dashboard/dashboard.page';

export const routes: Record<
  string,
  { path: string; element: React.ReactNode }
> = {
  home: { path: '/', element: <HomePage /> },
  login: { path: '/login', element: <LoginPage /> },
  register: { path: '/register', element: <RegisterPage /> },
  dashboard: { path: '/dashboard', element: <DashboardPage /> }
};
