import { PlaidLink, selectAccountGroups } from '@kaizen/finance-client';
import { UserClient } from '@kaizen/user-client';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label
} from '@kaizen/core-client';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const AccountsPage = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const accountGroups = useSelector(selectAccountGroups);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);

  const onDeleteAccountClick = async () => {
    setDeleteAccountOpen(false);
  };

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
        {Object.entries(accountGroups).map(([accountType, accountGroup]) => {
          return accountGroup.accounts.map((account) => {
            return (
              <Dialog
                key={account.id}
                open={deleteAccountOpen}
                onOpenChange={setDeleteAccountOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive" key={account.id}>
                    {account.name}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl">
                  <DialogHeader>
                    <DialogTitle>
                      Are you sure you want to remove this account?
                    </DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will remove the
                      account, it&apos;s transactions, and any historical data.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose>
                      <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button
                      variant="destructive"
                      onClick={onDeleteAccountClick}>
                      Remove
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            );
          });
        })}
      </div>
    </div>
  );
};
