import { useEffect, useState } from 'react';
import { UserClient } from '@kaizen/user-client';
import {
  InstitutionDispatch,
  TransactionsTable,
  formatCurrency,
  selectAccountGroups,
  selectTotalSpent,
  selectTransactionsByCategory,
  syncInstitutions
} from '@kaizen/finance-client';
import { PlaidLink } from './plaid-link';
import { Button, DonutChart } from '@kaizen/core-client';
import { useDispatch, useSelector } from 'react-redux';

export const FinancePage = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const accountGroups = useSelector(selectAccountGroups);
  const transactionsByCategory = useSelector(selectTransactionsByCategory);
  const totalSpent = useSelector(selectTotalSpent);
  const dispatch = useDispatch<InstitutionDispatch>();

  useEffect(() => {
    const createLinkToken = async () => {
      const response = await UserClient.createLinkToken();
      if (response.type === 'SUCCESS') {
        setLinkToken(response.data.token);
      }
    };

    createLinkToken();
  }, []);

  const onSyncClick = async () => {
    dispatch(syncInstitutions());
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-y-2">
        <div className="flex w-full justify-start">
          <div className="flex w-full flex-col items-start gap-8">
            <div className="flex w-full gap-4">
              <div className="w-full max-w-xs">
                <div className="relative -m-16">
                  <DonutChart
                    data={transactionsByCategory.map((x) => {
                      return { label: x.category, value: x.amount };
                    })}
                  />
                  <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center">
                    <span className="text-sm">
                      Spent this&nbsp;
                      <select className="font-bold">
                        <option value="week" selected>
                          Week
                        </option>
                        <option value="month">Month</option>
                        <option value="year">Year</option>
                      </select>
                    </span>
                    <h3 className="text-3xl font-extrabold">
                      {formatCurrency(totalSpent, 'USD')}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="h-16 w-64 rounded-xl bg-gray-200">Category</div>
            </div>
            <TransactionsTable />
          </div>
        </div>
        <div className="flex gap-x-1">
          <Button onClick={onSyncClick}>Sync</Button>
          {linkToken && <PlaidLink linkToken={linkToken} />}
        </div>

        {Object.entries(accountGroups).map(([accountType, accountGroup]) => {
          return (
            <div
              key={accountType}
              className="flex w-full items-center justify-between gap-x-2 rounded-lg border px-4 py-3 shadow-sm">
              <h6>{accountType}</h6>
              <span className="font-normal text-neutral-500">
                {formatCurrency(accountGroup.current, 'USD')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
