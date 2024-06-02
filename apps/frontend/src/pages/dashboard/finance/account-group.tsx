import { AccountType } from '@kaizen/finance';
import { AccountGroup, formatCurrency } from '@kaizen/finance-client';
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

  const onCardClick = () => {
    setShowAccounts(!showAccounts);
  };

  return (
    <div className="w-full gap-x-2 rounded-lg border shadow-sm hover:bg-gray-50">
      <button
        onClick={onCardClick}
        className="flex w-full items-center justify-between px-4 py-6">
        <h6 className="font-semibold capitalize">{accountType}</h6>
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm">
            {formatCurrency(accountGroup.current, 'USD')}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </button>
      {showAccounts && (
        <div className="flex w-full flex-col gap-4 px-4 pb-6">
          {accountGroup.accounts.map((account) => {
            return (
              <div
                className="flex w-full items-center justify-between border-b pb-1"
                key={account.id}>
                <span className="text-sm">
                  {account.name}&nbsp;
                  <span className="text-xs text-gray-500">
                    (*{account.mask})
                  </span>
                </span>
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
