import { useSelector } from 'react-redux';
import './transactions-table.css';
import { selectTransactions } from './transaction.selectors';
import { formatCurrency } from '../format-currency';
import { CategorySelector } from '../category/category.selector';

export const TransactionsTable = () => {
  const transactions = useSelector(selectTransactions);

  return (
    <div className="flex w-full flex-col gap-1">
      {transactions.map((transaction) => {
        return (
          <div
            key={transaction.id}
            className="flex w-full items-center justify-center gap-x-2 border-b border-neutral-600 px-4 py-3">
            {transaction.category == null && (
              <span className="size-2 rounded-full bg-blue-600"></span>
            )}
            {transaction.logoUrl ? (
              <img
                className="h-8 w-8 flex-shrink-0 rounded-full"
                src={transaction.logoUrl}
              />
            ) : (
              <div className="h-8 w-8 flex-shrink-0 rounded-full bg-neutral-600"></div>
            )}
            <div className="flex w-full items-center justify-between">
              <div className="flex w-full flex-row items-center gap-x-3">
                <h6 className="text-sm font-semibold">{transaction.name}</h6>
                <CategorySelector
                  transactionId={transaction.id}
                  name={
                    transaction.category
                      ? transaction.category.name
                      : transaction.originalCategory
                        ? transaction.originalCategory
                        : ''
                  }
                />
              </div>
              <span className="text-sm">
                {formatCurrency(transaction.amount, 'USD')}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
