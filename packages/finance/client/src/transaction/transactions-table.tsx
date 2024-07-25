import { useSelector } from 'react-redux';
import { selectTransactions } from './transaction.selectors';
import { formatCurrency, formatDate } from '@kaizen/core-client';
import { CategorySelector } from '../category/category.selector';
import { useState } from 'react';

export const TransactionsTable = () => {
  const transactions = useSelector(selectTransactions);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);

  const onTransactionSelected = (transactionId: string) => {
    setSelectedTransactionId(transactionId);
  };

  const onTransactionDeselected = () => {
    setSelectedTransactionId(null);
  };

  return (
    <div className="flex w-full flex-col gap-2">
      {transactions.map((transaction) => {
        return (
          <div
            key={transaction.id}
            className="flex w-full items-center justify-center gap-x-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3">
            {transaction.category == null && (
              <span className="size-2 rounded-full bg-blue-600"></span>
            )}
            {transaction.logoUrl ? (
              <img
                loading="lazy"
                className="h-8 w-8 flex-shrink-0 rounded-full"
                src={transaction.logoUrl}
              />
            ) : (
              <div className="h-8 w-8 flex-shrink-0 rounded-full bg-zinc-800"></div>
            )}
            <div className="flex w-full items-center justify-between">
              <div className="flex w-full flex-col items-start gap-3 lg:flex-row lg:items-center">
                <div>
                  <h6 className="scroll-m-20 text-sm font-semibold tracking-tight">
                    {transaction.name}
                  </h6>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(transaction.date)}
                  </span>
                </div>
                <CategorySelector
                  transactionId={transaction.id}
                  selected={selectedTransactionId === transaction.id}
                  name={
                    transaction.category
                      ? transaction.category.name
                      : transaction.originalCategory
                        ? transaction.originalCategory
                        : ''
                  }
                  onTransactionSelected={onTransactionSelected}
                  onTransactionDeselected={onTransactionDeselected}
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
