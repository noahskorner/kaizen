import { useEffect } from 'react';
import { TransactionService } from '.';
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
            className="flex w-full items-center justify-between bg-neutral-50 hover:bg-neutral-100">
            <div className="text-sm font-medium capitalize">
              {transaction.name}
            </div>
            <div className="text-sm text-neutral-700">{transaction.amount}</div>
          </div>
        );
      })}
    </div>
  );
};
