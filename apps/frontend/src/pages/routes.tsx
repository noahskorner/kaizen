import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';
import { DashboardLayout } from './dashboard/dashboard.layout';
import { FinancePage } from './dashboard/finance/finance.page';
import { RouteObject } from 'react-router-dom';
import { SpendingPage } from './dashboard/spending/spending.page';

export const paths: Record<string, string> = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  spending: '/spending',
  accounts: '/accounts'
};

export const routes: RouteObject[] = [
  { path: paths.home, element: <HomePage /> },
  { path: paths.login, element: <LoginPage /> },
  { path: paths.register, element: <RegisterPage /> },
  {
    element: <DashboardLayout />,
    children: [
      {
        path: paths.dashboard,
        element: <FinancePage />
      },
      {
        path: paths.spending,
        element: <SpendingPage />
      }
    ]
  }
];
