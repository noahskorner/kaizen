import { useSelector } from 'react-redux';
import './transactions-table.css';
import { selectTransactions } from './transaction.selectors';
import { formatCurrency } from '../format-currency';

export const TransactionsTable = () => {
  const transactions = useSelector(selectTransactions);

  return (
    <div className="flex w-full flex-col gap-2">
      <h3 className="text-2xl font-bold">Recent transactions</h3>
      <div className="flex w-full flex-col gap-1">
        {transactions.map((transaction) => {
          return (
            <div
              key={transaction.id}
              className="flex w-full items-center justify-center gap-x-2 rounded-lg border px-4 py-3 shadow-sm">
              {transaction.logoUrl ? (
                <img
                  className="h-8 w-8 flex-shrink-0 rounded-full"
                  src={transaction.logoUrl}
                />
              ) : (
                <div className="h-8 w-8 flex-shrink-0 rounded-full bg-neutral-100"></div>
              )}
              <div className="flex w-full items-center justify-between">
                <div className="flex w-full flex-col gap-2">
                  <h6 className="text-sm font-semibold">{transaction.name}</h6>
                  {transaction.category && (
                    <div className="inline-flex gap-2">
                      <span className="rounded-lg bg-gray-200 px-2 py-1 text-xs font-medium lowercase text-gray-700">
                        {transaction.category.primary}
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-sm">
                  {formatCurrency(transaction.amount, 'USD')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
