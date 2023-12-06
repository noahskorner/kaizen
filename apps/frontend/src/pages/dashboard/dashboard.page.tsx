import { useAuthStore } from '@kaizen/auth-client';
import { routes } from '../routes';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { UserService } from '@kaizen/user-client';
import { PlaidLink } from './plaid-link';
import { Institution } from '@kaizen/institution';
import { InstitutionService } from '@kaizen/institution-client';

export const DashboardPage = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const monthAndYear = useRef(getCurrentMonthAndYear());

  useEffect(() => {
    if (authStore.authenticated) {
      UserService.createLinkToken().then((response) => {
        setLinkToken(response.data.token);
      });
      InstitutionService.find().then((response) => {
        setInstitutions(response.data);
      });
    }
  }, [authStore.authenticated]);

  const onLogoutClick = () => {
    authStore.logout();
    navigate(routes.home.path);
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="h-full p-2">
          <div className="fixed flex h-full w-20 flex-col items-center justify-between rounded-2xl bg-slate-900 p-2 shadow-2xl">
            <div>
              <button className="flex h-12 w-12 items-center justify-center rounded-2xl hover:bg-slate-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 ">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
            <div>
              <button className="flex h-12 w-12 items-center justify-center rounded-2xl hover:bg-slate-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </button>
              <button
                onClick={onLogoutClick}
                className="flex h-12 w-12 items-center justify-center rounded-2xl hover:bg-slate-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-7 w-7">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
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
            <pre>{JSON.stringify(institutions, null, 2)}</pre>
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
