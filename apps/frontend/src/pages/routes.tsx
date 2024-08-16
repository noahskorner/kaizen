import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';
import { DashboardPage } from './dashboard/dashboard.page';
import { RouteObject } from 'react-router-dom';
import { SpendingPage } from './spending/spending.page';
import { SettingsPage } from './settings/settings-page';
import { VerifyUpdateEmailPage } from './verify-update-email';
import { AccountsPage } from './accounts';
import { RetirementPage } from './retirement/retirement.page';
import { AppLayout } from './app-layout';

export const paths = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  spending: '/spending',
  accounts: '/accounts',
  settings: '/settings',
  verifyUpdateEmail: '/verify-update-email',
  finance: '/dashboard/finance',
  retirement: '/retirement'
};

export const routes: RouteObject[] = [
  { path: paths.home, element: <HomePage /> },
  { path: paths.login, element: <LoginPage /> },
  { path: paths.register, element: <RegisterPage /> },
  { path: paths.verifyUpdateEmail, element: <VerifyUpdateEmailPage /> },
  {
    element: <AppLayout />,
    children: [
      {
        path: paths.dashboard,
        element: <DashboardPage />
      },
      {
        path: paths.spending,
        element: <SpendingPage />
      },
      {
        path: paths.settings,
        element: <SettingsPage />
      },
      {
        path: paths.accounts,
        element: <AccountsPage />
      },
      {
        path: paths.retirement,
        element: <RetirementPage />
      }
    ]
  }
];
