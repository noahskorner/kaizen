import {
  DeleteAccountButton,
  PlaidLink,
  selectAccountGroups
} from '@kaizen/finance-client';
import { UserClient } from '@kaizen/user-client';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const AccountsPage = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const accountGroups = useSelector(selectAccountGroups);

  useEffect(() => {
    const createLinkToken = async () => {
      const response = await UserClient.createLinkToken();
      if (response.type === 'SUCCESS') {
        setLinkToken(response.data.token);
      }
    };

    createLinkToken();
  }, []);

  return (
    <div className="flex w-full flex-col-reverse gap-6 lg:flex-row">
      <div className="flex w-full max-w-5xl flex-col gap-4">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
          Accounts
        </h1>
        {linkToken && <PlaidLink linkToken={linkToken} />}
        {Object.entries(accountGroups).map(([, accountGroup]) => {
          return accountGroup.accounts.map((account) => {
            return (
              <DeleteAccountButton
                key={account.id}
                accountId={account.id}
                name={account.name ?? ''}
              />
            );
          });
        })}
      </div>
    </div>
  );
};
