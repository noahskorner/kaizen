import { RouteObject } from 'react-router-dom';
import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';

export const routes: Record<string, RouteObject> = {
  home: { path: '/', element: <HomePage /> },
  login: { path: '/login', element: <LoginPage /> },
  register: { path: '/register', element: <RegisterPage /> }
};
