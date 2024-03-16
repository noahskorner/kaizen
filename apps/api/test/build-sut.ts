import {
  ItemPublicTokenExchangeResponse,
  AccountsGetResponse,
  TransactionsSyncResponse
} from 'plaid';
import {
  MockPlaidApiBuilder,
  buildAccountsBalanceGetResponse,
  buildItemPublicTokenExchangeResponse,
  buildTransactionsSyncResponse,
  mockLinkTokenCreateResponse
} from './plaid';
import { ServiceCollectionBuilder } from '../src/service-collection.builder';
import { AppBuilder } from '../src/app-builder';
import { Express } from 'express';
// eslint-disable-next-line no-restricted-imports
import { PrismaClient } from '@prisma/client';

export interface BuildSutCommand {
  itemPublicTokenExchangeResponse: ItemPublicTokenExchangeResponse;
  accountsBalanceGetResponse: AccountsGetResponse;
  transactionSyncResponse: TransactionsSyncResponse;
  sut: Express;
}

const cachedPrismaClient = new PrismaClient();

export const buildSut = (command?: Partial<BuildSutCommand>) => {
  const mockItemPublicTokenExchangeResponse =
    command?.itemPublicTokenExchangeResponse ??
    buildItemPublicTokenExchangeResponse();
  const mockAccountsBalanceGetResponse =
    command?.accountsBalanceGetResponse ?? buildAccountsBalanceGetResponse();
  const mockTransactionSyncResponse =
    command?.transactionSyncResponse ?? buildTransactionsSyncResponse();

  const mockPlaidApi = new MockPlaidApiBuilder()
    .withLinkTokenCreate(mockLinkTokenCreateResponse)
    .withItemPublicTokenExchange(mockItemPublicTokenExchangeResponse)
    .withAccountsBalanceGet(mockAccountsBalanceGetResponse)
    .withTransactionsSync(mockTransactionSyncResponse)
    .build();

  const mockServiceCollection = new ServiceCollectionBuilder()
    .withPrisma(cachedPrismaClient)
    .withPlaidApi(mockPlaidApi)
    .build();

  const sut = new AppBuilder()
    .withServiceCollection(mockServiceCollection)
    .build();
  mockServiceCollection;

  return {
    mockItemPublicTokenExchangeResponse,
    mockAccountsBalanceGetResponse,
    mockTransactionSyncResponse,
    sut
  };
};
