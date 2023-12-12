import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';
import { DashboardLayout } from './dashboard/dashboard.layout';
import { FinancePage } from './dashboard/finance/finance.page';
import { DashboardPage } from './dashboard/dashboard.page';
import { RouteObject } from 'react-router-dom';
import { TodosPage } from './dashboard/todos/todos.page';

export const paths: Record<string, string> = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  finance: '/dashboard/finance',
  todos: '/dashboard/todos'
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
        element: <DashboardPage />
      },
      {
        path: paths.finance,
        element: <FinancePage />
      },
      {
        path: paths.todos,
        element: <TodosPage />
      }
    ]
  }
];
