import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar';

export const DashboardLayout = () => {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="ml-64 w-full p-2">
          <Outlet />
        </div>
      </div>
    </>
  );
};
