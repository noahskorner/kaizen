import { formatCurrency } from '@kaizen/core-client';
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
    <div className="flex w-full flex-col">
      <button
        onClick={onGroupClick}
        className="flex items-stretch justify-between gap-x-4 p-4 text-left text-sm hover:bg-zinc-900">
        <div className="flex w-full max-w-48 gap-x-2">
          <h3 className="w-32 font-semibold capitalize">
            {getAccountGroupLabel(accountType)}
          </h3>
        </div>
        <span className="font-normal">
          {formatCurrency(accountGroup.available, 'USD')}
        </span>
      </button>
      {showAccounts && (
        <div className="flex w-full flex-col px-2">
          {accountGroup.accounts.map((account) => {
            return (
              <div
                className="flex w-full items-center justify-between p-4"
                key={account.id}>
                <div className="flex flex-col gap-y-1">
                  <span className="text-sm">{account.name}&nbsp;</span>
                  <span className="text-xs text-zinc-300">
                    (*{account.mask})
                  </span>
                </div>
                <span className="text-sm">
                  {formatCurrency(account.current ?? 0, 'USD')}
                </span>
              </div>
            );
          })}
        </div>
      )}
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
