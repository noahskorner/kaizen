import { useEffect, useState } from 'react';
import { UserClient } from '@kaizen/user-client';
import {
  NetworthGraph,
  InstitutionDispatch,
  // TransactionsTable,
  selectAccountGroups,
  syncInstitutions
} from '@kaizen/finance-client';
import { PlaidLink } from './plaid-link';
import { Button } from '@kaizen/core-client';
import { useDispatch, useSelector } from 'react-redux';
import { AccountGroupCard } from './account-group';
import { AccountType } from '@kaizen/finance';
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
    <div className="flex w-full flex-col gap-y-6 p-4">
      <div className="flex w-full flex-col gap-x-6 gap-y-6 lg:flex-row">
        <div className="order-2 w-full lg:order-1 lg:max-w-sm">
          <div className="w-full rounded-lg border border-neutral-500 ">
            <div className="border-b border-neutral-500 p-4 ">
              <h2 className="font-bold">Accounts</h2>
            </div>
            {Object.entries(accountGroups).map(
              ([accountType, accountGroup]) => {
                return (
                  <AccountGroupCard
                    key={accountType}
                    accountType={accountType as AccountType}
                    accountGroup={accountGroup}
                    showAccounts={true}
                  />
                );
              }
            )}
          </div>
        </div>
        <div className="order-1 flex w-full items-stretch lg:order-2 lg:min-h-[50rem]">
          <NetworthGraph />
        </div>
      </div>
      <div className="h-[60rem] w-full bg-green-500 lg:col-span-7 xl:col-span-8 2xl:col-span-9">
        <div className="flex gap-x-1">
          <Button onClick={onSyncClick}>Sync</Button>
          {linkToken && <PlaidLink linkToken={linkToken} />}
        </div>
        Transactions Table
      </div>
    </div>
  );
};
