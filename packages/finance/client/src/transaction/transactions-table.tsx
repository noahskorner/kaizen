import { useSelector } from 'react-redux';
import './transactions-table.css';
import { selectTransactions } from './transaction.selectors';
import { formatCurrency } from '../format-currency';

export const TransactionsTable = () => {
  const transactions = useSelector(selectTransactions);

  return (
    <div>
      {transactions.map((transaction) => {
        return (
          <div
            key={transaction.id}
            className="bg-transaction flex w-full items-center justify-between p-2">
            <div className="flex items-center justify-start gap-x-1 text-sm font-medium capitalize">
              {transaction.logoUrl && (
                <img
                  className="h4 w-4 rounded-full"
                  src={transaction.logoUrl}
                />
              )}
              <h6>{transaction.name}</h6>
            </div>
            <div
              className={`text-sm ${
                transaction.amount < 0 ? 'text-primary-700' : 'text-neutral-700'
              }`}>
              {formatCurrency(
                transaction.amount,
                transaction.isoCurrencyCode ?? 'USD'
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
