import { useEffect, useState } from 'react';
import { UserClient } from '@kaizen/user-client';
import {
  InstitutionDispatch,
  TransactionsTable,
  selectAccountGroups,
  syncInstitutions
} from '@kaizen/finance-client';
import { PlaidLink } from './plaid-link';
import { Button } from '@kaizen/core-client';
import { useDispatch, useSelector } from 'react-redux';
import { AccountGroupCard } from './account-group';
import { AccountType } from '@kaizen/finance';

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
    <div className="flex flex-col gap-8 p-4">
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full items-center justify-between">
          <h3 className="text-2xl font-bold">Accounts</h3>
          <div className="flex gap-x-1">
            <Button onClick={onSyncClick}>Sync</Button>
            {linkToken && <PlaidLink linkToken={linkToken} />}
          </div>
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
      <div className="flex flex-col gap-y-4">
        <div className="flex w-full justify-start">
          <div className="flex w-full flex-col items-start gap-8">
            <TransactionsTable />
          </div>
        </div>
      </div>
    </div>
  );
};
