import { useEffect, useRef, useState } from 'react';
import { UserClient } from '@kaizen/user-client';
import {
  InstitutionClient,
  TransactionsTable,
  VirtualAccountClient,
  formatCurrency,
  groupAccountsByType,
  useInstitutionStore,
  useVirtualAccountStore
} from '@kaizen/finance-client';
import { PlaidLink } from './plaid-link';
import { getCurrentMonthAndYear } from './get-current-month-and-year';
import { CreateVirtualAccountModal } from './create-virtual-account-modal';
import { VirtualAccountFrequency } from '@kaizen/finance';

export const FinancePage = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const { institutions, setInstitutions } = useInstitutionStore();
  const { virtualAccounts, setVirtualAccounts } = useVirtualAccountStore();
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

  useEffect(() => {
    const loadVirtualAccounts = async () => {
      const response = await VirtualAccountClient.find();
      if (response.type === 'SUCCESS') {
        setVirtualAccounts(response.data);
      }
    };

    loadVirtualAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-y-2">
        <h3 className="my-4 w-full border-b border-b-neutral-100 text-lg font-bold">
          {monthAndYear.current.month} | {monthAndYear.current.year}
        </h3>
        <h3 className="my-4 w-full border-b border-b-neutral-100 text-lg font-bold">
          Overview
        </h3>
        {linkToken && <PlaidLink linkToken={linkToken} />}

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
            </div>
          );
        })}
        <h3 className="my-4 w-full border-b border-b-neutral-100 text-lg font-bold">
          Virtual Accounts
        </h3>
        <CreateVirtualAccountModal />
        {virtualAccounts.map((virtualAccount) => {
          return (
            <div key={virtualAccount.id}>
              <div className="font-lg flex w-full items-center justify-between rounded-lg bg-neutral-50 p-4 font-semibold capitalize hover:bg-neutral-100">
                <h6>{virtualAccount.name}</h6>
                <span className="font-normal text-neutral-500">
                  {formatCurrency(
                    getBalance(
                      virtualAccount.balance,
                      virtualAccount.amount,
                      virtualAccount.frequency,
                      virtualAccount.createdAt
                    ),
                    virtualAccount.currency
                  )}
                </span>
              </div>
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

const getBalance = (
  balance: number,
  amount: number,
  frequency: VirtualAccountFrequency,
  createdAt: string
): number => {
  console.log('called');
  const currentDate = new Date();
  const createdDate = new Date(createdAt);

  const timeDiff = Math.abs(currentDate.getTime() - createdDate.getTime());
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const monthsDiff =
    (currentDate.getFullYear() - createdDate.getFullYear()) * 12 +
    (currentDate.getMonth() - createdDate.getMonth());

  let numPayments = 0;
  switch (frequency) {
    case VirtualAccountFrequency.Weekly:
      numPayments = Math.floor(daysDiff / 7);
      break;
    case VirtualAccountFrequency.Biweekly:
      numPayments = Math.floor(daysDiff / 14);
      break;
    case VirtualAccountFrequency.Monthly:
      numPayments = monthsDiff;
      break;
    default:
      throw new Error('Invalid frequency');
  }

  return balance + numPayments * amount;
};
