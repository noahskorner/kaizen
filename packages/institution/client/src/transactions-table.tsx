import './transactions-table.css';
import { useEffect } from 'react';
import { TransactionService } from './transaction.service';
import { formatCurrency } from './format-currency';
import { FindTransactionsRequest } from '@kaizen/institution';
import { useTransactionStore } from './use-transaction-store';

export const TransactionsTable = () => {
  const { transactions, setTransactions } = useTransactionStore();

  useEffect(() => {
    const loadTransactions = async () => {
      const request: FindTransactionsRequest = {
        page: 1
      };
      const response = await TransactionService.find(request);
      if (response.type === 'SUCCESS') {
        setTransactions(response.data.hits);
      }
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
            <div className="text-sm font-medium capitalize">
              {transaction.name}
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
    </div>
  );
};
