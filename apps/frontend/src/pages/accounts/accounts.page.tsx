import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  EllipsesVerticalIcon,
  formatCurrency
} from '@kaizen/core-client';
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
      <div className="flex w-full flex-col gap-4">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
          Accounts
        </h1>
        {linkToken && <PlaidLink linkToken={linkToken} />}
        <div className="flex flex-col gap-2">
          {Object.entries(accountGroups).map(([, accountGroup]) => {
            return accountGroup.accounts.map((account) => {
              return (
                <div
                  key={account.id}
                  className="relative flex w-full items-center justify-between rounded-lg border border-zinc-800 px-4 py-6">
                  <div>
                    <h6 className="scroll-m-20 text-sm font-semibold tracking-tight">
                      {account.name}
                    </h6>
                    <span className="text-sm text-muted-foreground">
                      ({account.mask})
                    </span>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <span className="scroll-m-20 text-sm font-semibold tracking-tight">
                      {formatCurrency(account.available ?? 0, 'USD')}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <EllipsesVerticalIcon />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                          <DeleteAccountButton
                            key={account.id}
                            accountId={account.id}
                            name={account.name ?? ''}
                          />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
};
