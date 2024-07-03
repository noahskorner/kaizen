import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './globals.css';
import { GlobalLayout } from './pages/global-layout';
import { routes } from './pages/routes';
import { Provider } from 'react-redux';
import { store } from './store';
import { ScreenProvider } from '@kaizen/core-client';

const router = createBrowserRouter(Object.values(routes));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ScreenProvider>
        <GlobalLayout>
          <RouterProvider router={router} />
        </GlobalLayout>
      </ScreenProvider>
    </Provider>
  </React.StrictMode>
);
