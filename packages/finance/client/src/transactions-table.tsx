import './transactions-table.css';
import { useEffect } from 'react';
import { TransactionClient } from './transaction.client';
import { formatCurrency } from './format-currency';
import { FindTransactionsRequest } from '@kaizen/finance';
import { useTransactionStore } from './use-transaction-store';

export const TransactionsTable = () => {
  const { transactions, setTransactions } = useTransactionStore();

  useEffect(() => {
    const loadTransactions = async () => {
      const transactions = [];
      let hasMore = true;
      let page = 1;

      while (hasMore) {
        const request: FindTransactionsRequest = {
          page: page,
          startDate: new Date(7, 30, 1998).toISOString(),
          endDate: new Date().toISOString()
        };
        const response = await TransactionClient.find(request);
        if (response.type === 'SUCCESS') {
          transactions.push(...response.data.hits);
          hasMore = transactions.length < response.data.total;
          page++;
        } else {
          console.error(response);
          break;
        }
      }

      setTransactions(transactions);
    };

    loadTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
