import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';
import { DashboardLayout } from './dashboard/dashboard.layout';
import { FinancePage } from './dashboard/finance/finance.page';
import { DashboardPage } from './dashboard/dashboard.page';
import { RouteObject } from 'react-router-dom';
import { LandingPage } from './landing';

export const paths: Record<string, string> = {
  home: '/',
  landing: '/landing',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  finance: '/dashboard/finance'
};

export const routes: RouteObject[] = [
  { path: paths.home, element: <HomePage /> },
  { path: paths.landing, element: <LandingPage /> },
  { path: paths.login, element: <LoginPage /> },
  { path: paths.register, element: <RegisterPage /> },
  {
    element: <DashboardLayout />,
    children: [
      {
        path: paths.dashboard,
        element: <DashboardPage />
      },
      {
        path: paths.finance,
        element: <FinancePage />
      }
    ]
  }
];
