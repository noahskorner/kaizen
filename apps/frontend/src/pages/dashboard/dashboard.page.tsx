import { NetworthGraph } from '@kaizen/finance-client';
import './dashboard.css';

export const DashboardPage = () => {
  return (
    <div className="flex h-full w-full flex-col gap-y-6">
      <NetworthGraph />
    </div>
  );
};
