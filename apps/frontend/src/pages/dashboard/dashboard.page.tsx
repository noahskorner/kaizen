import { useAuthStore } from '@kaizen/auth-client';
import { useEffect, useRef, useState } from 'react';
import { UserService } from '@kaizen/user-client';
import { PlaidLink } from './plaid-link';
import { Sidebar } from './sidebar';
import { useInstitutionStore } from '@kaizen/institution-client';

export const DashboardPage = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const authStore = useAuthStore();
  const institutionStore = useInstitutionStore();
  const monthAndYear = useRef(getCurrentMonthAndYear());

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
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="h-full w-full py-6 pl-24 pr-6">
          <div className="flex items-center justify-between">
            <h1 className="font-secondary text-5xl tracking-tighter">
              64,001.89
              <span className="font-secondary pl-2 text-sm font-normal uppercase tracking-normal text-gray-500">
                | {monthAndYear.current.month} {monthAndYear.current.year}
              </span>
            </h1>
            {linkToken && <PlaidLink linkToken={linkToken} />}
          </div>
          <hr className="mt-4 h-[1px] border-gray-900" />
          <div className="flex w-full p-4">
            <pre>{JSON.stringify(institutionStore.institutions, null, 2)}</pre>
          </div>
        </div>
      </div>
    </>
  );
};

interface CurrentMonthAndYear {
  month: string;
  year: number;
}

const getCurrentMonthAndYear = (): CurrentMonthAndYear => {
  const currentDate = new Date();
  const currentMonth = new Intl.DateTimeFormat('en-US', {
    month: 'long'
  }).format(currentDate);
  const currentYear = parseInt(currentDate.getFullYear().toString().slice(-2));

  return { month: currentMonth, year: currentYear };
};
