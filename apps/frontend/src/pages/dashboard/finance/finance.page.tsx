import { useEffect, useState } from 'react';
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
import { CreateVirtualAccountModal } from './create-virtual-account-modal';
import { toVirtualAccountItems } from './to-virtual-account-items';
import { AccountType } from '@kaizen/finance';

export const FinancePage = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const { institutions, setInstitutions } = useInstitutionStore();
  const { virtualAccounts, setVirtualAccounts } = useVirtualAccountStore();
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
        {toVirtualAccountItems(
          virtualAccounts,
          accountGroups[AccountType.Depository]?.current ?? 0
        ).map((virtualAccount) => {
          return (
            <div key={virtualAccount.id}>
              <div
                className={`${
                  virtualAccount.name === 'Savings'
                    ? ' bg-neutral-100 font-medium text-neutral-600'
                    : 'bg-neutral-50 hover:bg-neutral-100 '
                } font-lg flex w-full items-center justify-between rounded-lg p-4 font-semibold capitalize`}>
                <h6>{virtualAccount.name}</h6>
                <span className="font-normal text-neutral-500">
                  {formatCurrency(
                    virtualAccount.balance,
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
