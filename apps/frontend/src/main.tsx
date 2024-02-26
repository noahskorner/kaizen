import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './globals.css';
import { GlobalLayout } from './pages/global-layout';
import { routes } from './pages/routes';

const router = createBrowserRouter(Object.values(routes));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GlobalLayout>
    <RouterProvider router={router} />
  </GlobalLayout>
);
