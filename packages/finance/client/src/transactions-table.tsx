import './transactions-table.css';
import { useEffect, useState } from 'react';
import { TransactionClient } from './transaction.client';
import { formatCurrency } from './format-currency';
import { FindTransactionsRequest } from '@kaizen/finance';
import { useTransactionStore } from './use-transaction-store';

export const TransactionsTable = () => {
  const { transactions, setTransactions } = useTransactionStore();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadTransactions = async () => {
      const request: FindTransactionsRequest = {
        page: page
      };
      const response = await TransactionClient.find(request);
      if (response.type === 'SUCCESS') {
        setTransactions([...transactions, ...response.data.hits]);
      }
    };

    loadTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const onLoadMoreClick = () => {
    setPage((prev) => prev + 1);
  };

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
                transaction.currency ?? 'USD'
              )}
            </div>
          </div>
        );
      })}
      <div className="flex w-full items-center justify-center border-y py-2">
        <button
          onClick={onLoadMoreClick}
          className="text-sm text-blue-600 hover:underline">
          Load more
        </button>
      </div>
    </div>
  );
};
