import { useEffect, useRef, useState } from 'react';
import { UserClient } from '@kaizen/user-client';
import {
  InstitutionClient,
  TransactionsTable,
  formatCurrency,
  groupAccountsByType,
  useInstitutionStore
} from '@kaizen/finance-client';
import { PlaidLink } from './plaid-link';
import { Button } from '@kaizen/core-client';
import { getCurrentMonthAndYear } from './get-current-month-and-year';
import { AccountType } from '@kaizen/finance';
import { CreateVirtualAccountModal } from './create-virtual-account-modal';

export const FinancePage = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const { institutions, setInstitutions } = useInstitutionStore();
  const monthAndYear = useRef(getCurrentMonthAndYear());
  const accountGroups = groupAccountsByType(institutions);

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
    const loadInstitutions = async () => {
      const response = await InstitutionClient.find();
      if (response.type === 'SUCCESS') {
        setInstitutions(response.data);
      }
    };

    loadInstitutions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-y-2">
        <h3 className="my-4 w-full border-b border-b-neutral-100 text-lg font-bold">
          {monthAndYear.current.month} / {monthAndYear.current.year}
        </h3>
        <div className="flex flex-col gap-y-2">
          {linkToken && <PlaidLink linkToken={linkToken} />}
          <Button>Refresh</Button>
        </div>
        <h3 className="my-4 w-full border-b border-b-neutral-100 text-lg font-bold">
          Overview
        </h3>
        {Object.keys(accountGroups).map((accountType) => {
          const accountGroup = accountGroups[accountType];
          return (
            <div key={accountType}>
              <div
                key={accountType}
                className="font-lg flex w-full items-center justify-between rounded-lg bg-neutral-50 p-4 font-semibold capitalize hover:bg-neutral-100">
                <h6>{accountType}</h6>
                <span className="font-normal text-neutral-500">
                  {formatCurrency(accountGroup.current, 'USD')}
                </span>
              </div>
              {accountType === AccountType.Depository && (
                <CreateVirtualAccountModal />
              )}
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
