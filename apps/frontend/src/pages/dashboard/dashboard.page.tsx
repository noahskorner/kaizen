import { useEffect, useState } from 'react';
import {
  NetworthGraph,
  selectAccountGroups,
  TransactionClient
} from '@kaizen/finance-client';
import { useSelector } from 'react-redux';
import { AccountGroupCard } from './account-group-card';
import {
  AccountType,
  FindTransactionsRequest,
  Transaction
} from '@kaizen/finance';
import {
  formatCurrency,
  formatDate,
  ScrollArea,
  ScrollBar
} from '@kaizen/core-client';
import './dashboard.css';

export const DashboardPage = () => {
  const accountGroups = useSelector(selectAccountGroups);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>(
    []
  );

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
      <div className="flex h-full w-full flex-col gap-x-6 gap-y-6 lg:flex-row">
        <div className="order-2 flex flex-col gap-y-2 lg:order-1">
          <div className="flex flex-col gap-2">
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
        </div>
        <div className="order-1 flex h-full w-full items-stretch md:max-h-[50rem] lg:order-2">
          <NetworthGraph />
        </div>
      </div>
    </div>
  );
};
