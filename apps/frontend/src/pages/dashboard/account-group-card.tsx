import { Button, ChevronDown, formatCurrency } from '@kaizen/core-client';
import { AccountType } from '@kaizen/finance';
import { AccountGroup } from '@kaizen/finance-client';
import { useState } from 'react';

export interface AccountGroupProps {
  accountType: AccountType;
  accountGroup: AccountGroup;
  showAccounts: boolean;
}

export const AccountGroupCard = ({
  accountType,
  accountGroup,
  showAccounts: initialShowAccounts
}: AccountGroupProps) => {
  const [showAccounts, setShowAccounts] = useState(initialShowAccounts);

  const onGroupClick = () => {
    setShowAccounts(!showAccounts);
  };

  return (
    <div
      className={`credit-card flex w-full flex-col justify-between gap-y-6 rounded-lg border border-zinc-800 bg-zinc-900 p-4 shadow-2xl hover:z-10 lg:w-[24rem]`}>
      <span className="mt-12 w-full font-mono text-lg font-medium uppercase tracking-wide text-zinc-300">
        {getAccountGroupLabel(accountType)}
      </span>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-xs text-muted-foreground">Total</span>
          <span className="font-medium">
            {formatCurrency(accountGroup.available, 'USD')}
          </span>
        </div>
        <div className="flex flex-col items-end justify-end gap-2">
          <span className="text-xs text-muted-foreground">Accounts</span>
          <Button onClick={onGroupClick} variant={'ghost'} size={'icon'}>
            <ChevronDown />
          </Button>
        </div>
      </div>
      {showAccounts &&
        accountGroup.accounts.map((account) => {
          return (
            <div key={account.id} className="flex items-center justify-between">
              <span className="w-full font-mono text-lg uppercase tracking-wide text-zinc-300">
                {account.name}
              </span>
              <span className="font-medium">
                {formatCurrency(account.current ?? 0, 'USD')}
              </span>
            </div>
          );
        })}
    </div>
  );
};

const getAccountGroupLabel = (type: AccountType): string => {
  switch (type) {
    case AccountType.Brokerage:
      return 'brokerage';
    case AccountType.Investment:
      return 'investments';
    case AccountType.Credit:
      return 'credit';
    case AccountType.Depository:
      return 'cash';
    case AccountType.Loan:
      return 'loans';
    case AccountType.Other:
    default:
      return 'other';
  }
};
