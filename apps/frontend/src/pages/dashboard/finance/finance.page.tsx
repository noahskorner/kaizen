import { useEffect, useState } from 'react';
import { UserClient } from '@kaizen/user-client';
import {
  NetworthGraph,
  selectAccountGroups,
  TransactionClient,
  formatCurrency
} from '@kaizen/finance-client';
import { useSelector } from 'react-redux';
import { AccountGroupCard } from './account-group-card';
import {
  AccountType,
  FindTransactionsRequest,
  Transaction
} from '@kaizen/finance';

export const FinancePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setLinkToken] = useState<string | null>(null);
  const accountGroups = useSelector(selectAccountGroups);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>(
    []
  );

  useEffect(() => {
    const createLinkToken = async () => {
      const response = await UserClient.createLinkToken();
      if (response.type === 'SUCCESS') {
        setLinkToken(response.data.token);
      }
    };

    createLinkToken();
  }, []);

  useEffect(() => {
    const loadRecentTransactions = async () => {
      const response = await TransactionClient.find({
        page: 1,
        pageSize: 10
      } satisfies FindTransactionsRequest);
      if (response.type === 'SUCCESS') {
        setRecentTransactions(response.data.hits);
      }
    };

    loadRecentTransactions();
  }, []);

  return (
    <div className="flex h-full w-full flex-col gap-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="flex h-full w-full flex-col items-stretch gap-x-6 gap-y-6 lg:flex-row">
        <div className="order-2 flex h-full w-full flex-col gap-y-6 lg:order-1 lg:max-w-sm">
          <div className="w-full rounded-lg border border-neutral-600 ">
            <div className="border-b border-neutral-600 p-4">
              <h2 className="font-bold">Accounts</h2>
            </div>
            {Object.entries(accountGroups).map(
              ([accountType, accountGroup]) => {
                return (
                  <AccountGroupCard
                    key={accountType}
                    accountType={accountType as AccountType}
                    accountGroup={accountGroup}
                    showAccounts={false}
                  />
                );
              }
            )}
          </div>
          <div className="w-full rounded-lg border border-neutral-600 ">
            <div className="border-b border-neutral-600 p-4 ">
              <h2 className="font-bold">Recent Transactions</h2>
            </div>
            {recentTransactions.map((transaction) => {
              return (
                <div
                  className="flex w-full items-center justify-between p-4"
                  key={transaction.id}>
                  <div className="flex flex-col gap-y-1">
                    <span className="text-sm">{transaction.name}&nbsp;</span>
                    <span className="text-xs text-neutral-300">
                      {new Date(transaction.date).toLocaleDateString('en-US')}
                    </span>
                  </div>
                  <span className="text-sm">
                    {formatCurrency(transaction.amount ?? 0, 'USD')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="order-1 flex h-full w-full items-stretch lg:order-2 lg:max-h-[50rem]">
          <NetworthGraph />
        </div>
      </div>
    </div>
  );
};
