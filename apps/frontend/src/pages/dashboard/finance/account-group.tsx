import { SimpleLineChart } from '@kaizen/core-client';
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

  const onGroupClick = () => {
    setShowAccounts(!showAccounts);
  };

  return (
    <div className="flex w-full flex-col">
      <button
        onClick={onGroupClick}
        className="flex items-stretch justify-between gap-x-4 p-4 text-left text-sm hover:bg-neutral-600">
        <div className="flex w-full max-w-48 gap-x-2">
          <h3 className="w-32 font-semibold capitalize">{accountType}</h3>
          <SimpleLineChart
            stroke={'#22c55e'}
            data={[
              { date: '2023-01-01', value: 100 },
              { date: '2023-01-02', value: 1500 },
              { date: '2023-01-03', value: 130 },
              { date: '2023-01-04', value: 1700 },
              { date: '2023-01-05', value: 160 },
              { date: '2023-01-06', value: 1800 },
              { date: '2023-01-07', value: 200 }
            ]}
          />
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
                  <span className="text-xs text-neutral-300">
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
