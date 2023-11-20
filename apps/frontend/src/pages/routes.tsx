import { HomePage } from './home';
import { LoginPage } from './login';
import { RegisterPage } from './register';

export const routes = {
  home: { path: '/', element: <HomePage /> },
  login: { path: '/login', element: <LoginPage /> },
  register: { path: '/register', element: <RegisterPage /> }
};
