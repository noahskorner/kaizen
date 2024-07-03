import { useEffect, useState } from 'react';
import { UserClient } from '@kaizen/user-client';
import {
  AccountHistoryGraph,
  InstitutionDispatch,
  // TransactionsTable,
  formatCurrency,
  selectAccountGroups,
  syncInstitutions
} from '@kaizen/finance-client';
import { PlaidLink } from './plaid-link';
import { Button } from '@kaizen/core-client';
import { useDispatch, useSelector } from 'react-redux';
// import { AccountGroupCard } from './account-group';
// import { AccountType } from '@kaizen/finance';

export const FinancePage = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const accountGroups = useSelector(selectAccountGroups);
  // const transactionsByCategory = useSelector(selectTransactionsByCategory);
  const dispatch = useDispatch<InstitutionDispatch>();

  useEffect(() => {
    const createLinkToken = async () => {
      const response = await UserClient.createLinkToken();
      if (response.type === 'SUCCESS') {
        setLinkToken(response.data.token);
      }
    };

    createLinkToken();
  }, []);

  const onSyncClick = async () => {
    dispatch(syncInstitutions());
  };

  return (
    <div className="flex w-full flex-col gap-x-6 gap-y-6 p-4 lg:grid lg:grid-cols-12">
      <div className="w-full lg:col-span-7 lg:h-[60rem] xl:col-span-8 2xl:col-span-9">
        <AccountHistoryGraph />
      </div>
      <div className="h-[50rem] w-full rounded-lg border border-neutral-600 lg:col-span-5 xl:col-span-4 2xl:col-span-3">
        <div className="border-b border-neutral-600 p-4 ">
          <h2 className="font-bold">Accounts</h2>
        </div>
        {Object.entries(accountGroups).map(([accountType, accountGroup]) => {
          return (
            <div
              key={accountType}
              className="flex items-center justify-between p-4 text-sm">
              <h3 className="font-medium uppercase">{accountType}</h3>
              <span className="font-normal">
                {formatCurrency(accountGroup.available, 'USD')}
              </span>
            </div>
          );
        })}
      </div>
      <div className="h-[60rem] w-full bg-green-500 lg:col-span-7 xl:col-span-8 2xl:col-span-9">
        <div className="flex gap-x-1">
          <Button onClick={onSyncClick}>Sync</Button>
          {linkToken && <PlaidLink linkToken={linkToken} />}
        </div>
        Transactions Table
      </div>
      {/* <div className="flex w-full">
        <AccountHistoryGraph />
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full items-center justify-between">
          <h3 className="text-2xl font-bold">Accounts</h3>
        </div>
        {Object.entries(accountGroups).map(
          ([accountType, accountGroup], index) => {
            return (
              <AccountGroupCard
                key={accountType}
                showAccounts={index === 0}
                accountType={accountType as AccountType}
                accountGroup={accountGroup}
              />
            );
          }
        )}
      </div>
      <div className="flex w-full flex-col gap-y-4">
        <div className="flex w-full justify-start">
          <div className="flex w-full flex-col items-start gap-8">
            <TransactionsTable />
          </div>
        </div>
      </div> */}
    </div>
  );
};
