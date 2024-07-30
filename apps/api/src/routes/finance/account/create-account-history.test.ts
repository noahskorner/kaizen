import {
  buildAccount,
  buildAccountsBalanceGetResponse,
  buildTestBed,
  createInstitution
} from '../../../../test';
import {
  Account,
  AccountHistory,
  CreateAccountHistoryCommand
} from '@kaizen/finance';
import { v4 as uuid } from 'uuid';

const expectAccountHistoryToMatchAccount = (
  accountHistory: AccountHistory,
  account: Account
) => {
  expect(accountHistory.id).toBeDefined();
  expect(accountHistory.createdAt).toBeDefined();
  expect(accountHistory.accountId).toBe(account.id);
  expect(accountHistory.externalId).toBe(account.externalId);
  expect(accountHistory.available).toBe(account.available);
  expect(accountHistory.current).toBe(account.current);
  expect(accountHistory.limit).toBe(account.limit);
  expect(accountHistory.isoCurrencyCode).toBe(account.isoCurrencyCode);
  expect(accountHistory.unofficialCurrencyCode).toBe(
    account.unofficialCurrencyCode
  );
  expect(accountHistory.mask).toBe(account.mask);
  expect(accountHistory.name).toBe(account.name);
  expect(accountHistory.officialName).toBe(account.officialName);
  expect(accountHistory.type).toBe(account.type);
  expect(accountHistory.subtype).toBe(account.subtype);
  expect(accountHistory.verificationStatus).toBe(account.verificationStatus);
};

describe('CreateAccountHistoryService', () => {
  describe('create should', () => {
    it('return empty array when no accounts are found', async () => {
      // Arrange
      const { serviceCollection } = buildTestBed();

      // Act
      const response =
        await serviceCollection.createAccountHistoryService.create({
          userId: uuid()
        } satisfies CreateAccountHistoryCommand);

      // Assert
      expect(response.type).toBe('SUCCESS');
      if (response.type === 'SUCCESS') {
        expect(response.data.length).toBe(0);
      }
    });
    it('returns latest history of accounts', async () => {
      // Arrange
      const { serviceCollection, testBed } = buildTestBed({
        accountsBalanceGetResponse: buildAccountsBalanceGetResponse({
          accounts: [buildAccount(), buildAccount()]
        })
      });
      const { user, institution } = await createInstitution(testBed);

      // Act
      const response =
        await serviceCollection.createAccountHistoryService.create({
          userId: user.id
        } satisfies CreateAccountHistoryCommand);

      // Assert
      expect(response.type).toBe('SUCCESS');
      if (response.type === 'SUCCESS') {
        expect(response.data.length).toBe(institution.accounts.length);
        const expectedSnapshotId = response.data[0].snapshotId;
        response.data.forEach((accountHistory) => {
          expect(accountHistory.snapshotId).toBe(expectedSnapshotId);
          const externalAccount = institution.accounts.find(
            (account) => account.id === accountHistory.accountId
          );
          expect(externalAccount).toBeDefined();
          if (externalAccount != null) {
            expectAccountHistoryToMatchAccount(accountHistory, externalAccount);
          }
        });
      }
    });
  });
});
