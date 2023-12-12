import { useAuthStore } from '@kaizen/auth-client';
import { useEffect, useState } from 'react';
import { UserService } from '@kaizen/user-client';
import {
  groupAccountsByType,
  useInstitutionStore
} from '@kaizen/institution-client';
import { PlaidLink } from './plaid-link';
import { formatCurrency } from './format-currency';
// import { getCurrentMonthAndYear } from '../get-current-month-and-year';

export const FinancePage = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const authStore = useAuthStore();
  const institutionStore = useInstitutionStore();
  // const monthAndYear = useRef(getCurrentMonthAndYear());
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
        <div>{linkToken && <PlaidLink linkToken={linkToken} />}</div>
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
      </div>
    </div>
  );
};
