import { useEffect, useState } from 'react';
import { UserClient } from '@kaizen/user-client';
import {
  InstitutionClient,
  TransactionsTable,
  formatCurrency,
  useInstitutionStore
} from '@kaizen/finance-client';
import { PlaidLink } from './plaid-link';
import { Button, useToastStore } from '@kaizen/core-client';
import { useDispatch } from 'react-redux';
import {
  WalletAction,
  WalletClient,
  loadWallet,
  loadWalletFailure,
  loadWalletSuccess
} from '@kaizen/wallet-client';
import { useAuthStore } from '@kaizen/auth-client';
import { GetWalletByUserIdRequest } from '@kaizen/wallet';
import { Dispatch } from '@reduxjs/toolkit';

export const FinancePage = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const { setInstitutions, accountGroups, networth } = useInstitutionStore();
  const { addFailureToast } = useToastStore();
  const { id } = useAuthStore();
  const dispatch: Dispatch<WalletAction> = useDispatch();

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

  // TODO: Move effects once zustand is removed
  useEffect(() => {
    const loadWalletWhenUserLogsInEffect = async () => {
      if (id.length > 0) {
        dispatch(loadWallet());
        const request: GetWalletByUserIdRequest = { userId: id };
        const response = await WalletClient.getByUserId(request);
        if (response.type === 'SUCCESS') {
          dispatch(loadWalletSuccess(response.data));
        } else {
          dispatch(loadWalletFailure());
        }
      }
    };

    loadWalletWhenUserLogsInEffect();
  }, [dispatch, id]);

  const onSyncClick = async () => {
    const response = await InstitutionClient.sync();
    if (response.type === 'FAILURE') {
      addFailureToast(response.errors);
      return;
    }

    setInstitutions(response.data.succeeded);
  };

  return (
    <div>
      <div className="flex flex-col gap-y-2">
        <h3 className="my-4 w-full border-b border-b-neutral-100 text-lg font-bold">
          {formatCurrency(networth, 'USD')}
        </h3>
        <Button onClick={onSyncClick}>Sync</Button>
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
