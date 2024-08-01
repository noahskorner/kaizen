import { TransactionsTable } from '@kaizen/finance-client';

export const SpendingPage = () => {
  return (
    <div className="flex w-full flex-col-reverse gap-6 lg:flex-row">
      <div className="flex w-full flex-col gap-4">
        <TransactionsTable />
      </div>
    </div>
  );
};
