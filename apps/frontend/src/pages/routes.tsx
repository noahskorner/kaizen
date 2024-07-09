import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';
import { AppLayout } from './app.layout';
import { DashboardPage } from './dashboard/dashboard.page';
import { RouteObject } from 'react-router-dom';
import { SpendingPage } from './spending/spending.page';
import { SettingsPage } from './settings/settings-page';

export const paths = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  spending: '/spending',
  accounts: '/accounts',
  settings: '/settings'
};

export const routes: RouteObject[] = [
  { path: paths.home, element: <HomePage /> },
  { path: paths.login, element: <LoginPage /> },
  { path: paths.register, element: <RegisterPage /> },
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
      }
    ]
  }
];
