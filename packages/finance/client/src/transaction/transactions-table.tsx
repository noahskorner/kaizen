import { useSelector } from 'react-redux';
import { selectTransactions } from './transaction.selectors';
import { TransactionItem } from './transaction-item';

export const TransactionsTable = () => {
  const transactions = useSelector(selectTransactions);

  return (
    <div className="flex w-full flex-col gap-2">
      {transactions.map((transaction) => {
        return (
          <TransactionItem key={transaction.id} transaction={transaction} />
        );
      })}
    </div>
  );
};
