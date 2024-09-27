import { CardDescription, CardHeader, CardTitle } from '@kaizen/core-client';
import {
  AccountCard,
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
    <div className="flex h-full w-full flex-col-reverse gap-6 overflow-auto lg:flex-row">
      <div className="flex w-full flex-col gap-4">
        <CardHeader>
          <CardTitle>Accounts</CardTitle>
          <CardDescription>An overview of your accounts</CardDescription>
        </CardHeader>
        <div className="grid grid-cols-1 gap-2 px-4 pb-4 lg:grid-cols-2 2xl:grid-cols-4">
          {linkToken && <PlaidLink linkToken={linkToken} />}
          {Object.entries(accountGroups).map(([, accountGroup]) => {
            return accountGroup.accounts.map((account) => {
              return <AccountCard key={account.id} account={account} />;
            });
          })}
        </div>
      </div>
    </div>
  );
};
