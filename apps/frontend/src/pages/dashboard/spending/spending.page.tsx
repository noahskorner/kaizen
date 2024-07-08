import { TransactionsTable } from '@kaizen/finance-client';

export const SpendingPage = () => {
  return (
    <div className="flex">
      <div className="flex w-full max-w-5xl flex-col gap-4">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <TransactionsTable />
      </div>
    </div>
  );
};
