import './transactions-table.css';
import { useEffect } from 'react';
import { TransactionClient } from './transaction.client';
import { formatCurrency } from './format-currency';
import { FindTransactionsRequest, Transaction } from '@kaizen/finance';
import { useTransactionStore } from './use-transaction-store';

const loadTransactionsRecursive = async (
  page: number,
  total: number,
  transactions: Transaction[]
): Promise<Transaction[]> => {
  const request: FindTransactionsRequest = {
    page: page,
    pageSize: 25,
    startDate: new Date(7, 30, 1998).toISOString(),
    endDate: new Date().toISOString()
  };
  const response = await TransactionClient.find(request);
  if (response.type !== 'SUCCESS') {
    return transactions;
  }

  const newPage = page + 1;
  const newTotal = total + response.data.hits.length;
  const newTransactions = transactions.concat(response.data.hits);

  if (newTotal >= response.data.total) {
    return newTransactions;
  }

  return loadTransactionsRecursive(newPage, newTotal, newTransactions);
};

export const TransactionsTable = () => {
  const { transactions, setTransactions } = useTransactionStore();

  useEffect(() => {
    loadTransactionsRecursive(1, 0, []).then((transactions) => {
      console.log(
        transactions.filter(
          (x) => x.id === '2c596213-979e-4bc9-B7e4-2d9b0701a154'
        )
      );
      setTransactions(transactions);
    });
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
              <h6>{transaction.id}</h6>
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
