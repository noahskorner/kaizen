import { useSelector } from 'react-redux';
import { selectTransactions } from './transaction.selectors';
import { TransactionItem } from './transaction-item';

export const TransactionsTable = () => {
  const transactions = useSelector(selectTransactions);

  return (
    <div className="relative flex w-full flex-col rounded-lg">
      <div className="sticky top-0 flex w-full items-center justify-between border-b border-zinc-800 bg-zinc-950 bg-opacity-60 p-4 backdrop-blur-md">
        <span className="w-4/12 text-left text-xs text-zinc-300">Name</span>
        <span className="w-2/12 text-left text-xs text-zinc-300">Category</span>
        <span className="w-2/12 text-left text-xs text-zinc-300">Date</span>
        <span className="w-2/12 text-left text-xs text-zinc-300">
          Merchant Name
        </span>
        <span className="w-2/12 text-right text-xs text-zinc-300">Amount</span>
      </div>
      {transactions.map((transaction) => {
        return (
          <TransactionItem key={transaction.id} transaction={transaction} />
        );
      })}
    </div>
  );
};
