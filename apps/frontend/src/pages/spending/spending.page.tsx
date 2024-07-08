import { PieChart } from '@kaizen/core-client';
import {
  TransactionsTable,
  selectTransactionsByCategory
} from '@kaizen/finance-client';
import { useSelector } from 'react-redux';

export const SpendingPage = () => {
  const transactions = useSelector(selectTransactionsByCategory);

  return (
    <div className="flex w-full flex-col-reverse gap-6 lg:flex-row">
      <div className="flex w-full max-w-5xl flex-col gap-4">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <TransactionsTable />
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center lg:h-[50rem]">
        <PieChart data={transactions} />
      </div>
    </div>
  );
};
