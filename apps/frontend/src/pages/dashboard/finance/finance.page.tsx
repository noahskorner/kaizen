import { useAuthStore } from '@kaizen/auth-client';
import { useEffect, useRef, useState } from 'react';
import { UserService } from '@kaizen/user-client';
import {
  groupAccountsByType,
  useInstitutionStore
} from '@kaizen/institution-client';
import { PlaidLink } from './plaid-link';
import { formatCurrency } from './format-currency';
import { Button } from '@kaizen/ui';
import { getCurrentMonthAndYear } from './get-current-month-and-year';

export const FinancePage = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const authStore = useAuthStore();
  const institutionStore = useInstitutionStore();
  const monthAndYear = useRef(getCurrentMonthAndYear());
  const accountGroups = groupAccountsByType(institutionStore.institutions);

  useEffect(() => {
    if (authStore.authenticated) {
      UserService.createLinkToken().then((response) => {
        setLinkToken(response.data.token);
      });
      institutionStore.loadInstitutions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStore.authenticated]);

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
            <div
              key={accountType}
              className="font-lg flex w-full items-center justify-between rounded-lg bg-neutral-50 p-4 font-semibold capitalize hover:bg-neutral-100">
              <h6>{accountType}</h6>
              <span className="font-normal text-neutral-500">
                {formatCurrency(accountGroup.current)}
              </span>
            </div>
          );
        })}
        <div className="flex w-full flex-col">
          <h3 className="my-4 w-full border-b border-b-neutral-100 text-lg font-bold">
            Recent Transactions
          </h3>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => {
            return (
              <div key={index}>
                <div className="flex w-full items-center justify-between bg-neutral-50 hover:bg-neutral-100">
                  <div className="text-sm font-medium capitalize">
                    transaction 1
                  </div>
                  <div className="text-sm text-neutral-700">$100.00</div>
                </div>
                <div className="bg-neutral-0 flex w-full items-center justify-between hover:bg-neutral-100">
                  <div className="text-sm font-medium capitalize">
                    transaction 2
                  </div>
                  <div className="text-sm text-neutral-700">$100.00</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
