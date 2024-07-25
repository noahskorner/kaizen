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
import { ServiceEventBusBuilder } from '@kaizen/core-server';
import { LocalExchangeRateProvider } from '@kaizen/finance-server';

export interface BuildSutCommand {
  itemPublicTokenExchangeResponse: ItemPublicTokenExchangeResponse;
  accountsBalanceGetResponse: AccountsGetResponse;
  transactionSyncResponse: TransactionsSyncResponse;
  sut: Express;
}

export const cachedPrismaClient = new PrismaClient();

export const buildTestBed = (command?: Partial<BuildSutCommand>) => {
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

  const serviceEventBus = new ServiceEventBusBuilder().build();

  const localExchangeRateProvider = new LocalExchangeRateProvider();

  const serviceCollection = new ServiceCollectionBuilder()
    .withPrisma(cachedPrismaClient)
    .withPlaidApi(mockPlaidApi)
    .withEventBus(serviceEventBus)
    .withExchangeRateProvider(localExchangeRateProvider)
    .build();

  const testBed = new AppBuilder()
    .withServiceCollection(serviceCollection)
    .build();

  return {
    mockItemPublicTokenExchangeResponse,
    mockAccountsBalanceGetResponse,
    mockTransactionSyncResponse,
    serviceEventBus,
    serviceCollection,
    testBed
  };
};
