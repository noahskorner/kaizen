import { useEffect, useState } from 'react';
import { UserClient } from '@kaizen/user-client';
import {
  InstitutionDispatch,
  TransactionsTable,
  formatCurrency,
  selectAccountGroups,
  syncInstitutions
} from '@kaizen/finance-client';
import { PlaidLink } from './plaid-link';
import { Button } from '@kaizen/core-client';
import { useDispatch, useSelector } from 'react-redux';

export const FinancePage = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const accountGroups = useSelector(selectAccountGroups);
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
    <div>
      <div className="flex flex-col gap-y-2">
        <Button onClick={onSyncClick}>Sync</Button>
        {linkToken && <PlaidLink linkToken={linkToken} />}

        {Object.entries(accountGroups).map(([accountType, accountGroup]) => {
          return (
            <div
              key={accountType}
              className="font-lg flex w-full items-center justify-between rounded-lg bg-neutral-50 p-4 font-semibold capitalize hover:bg-neutral-100">
              <h6>{accountType}</h6>
              <span className="font-normal text-neutral-500">
                {formatCurrency(accountGroup.current, 'USD')}
              </span>
            </div>
          );
        })}
        <div className="flex w-full flex-col">
          <h3 className="my-4 w-full border-b border-b-neutral-100 text-lg font-bold">
            Transactions
          </h3>
          <TransactionsTable />
        </div>
      </div>
    </div>
  );
};
