import {
  buildAccount,
  buildAccountsBalanceGetResponse,
  buildTestBed,
  createInstitution
} from '../../../../../test';
import {
  Account,
  AccountSnapshot,
  SnapshotAccountsCommand
} from '@kaizen/finance';
import { v4 as uuid } from 'uuid';

const expectAccountSnapshotToMatchAccount = (
  accountSnapshot: AccountSnapshot,
  account: Account
) => {
  expect(accountSnapshot.id).toBeDefined();
  expect(accountSnapshot.createdAt).toBeDefined();
  expect(accountSnapshot.accountId).toBe(account.id);
  expect(accountSnapshot.externalId).toBe(account.externalId);
  expect(accountSnapshot.available).toBe(account.available);
  expect(accountSnapshot.current).toBe(account.current);
  expect(accountSnapshot.limit).toBe(account.limit);
  expect(accountSnapshot.isoCurrencyCode).toBe(account.isoCurrencyCode);
  expect(accountSnapshot.unofficialCurrencyCode).toBe(
    account.unofficialCurrencyCode
  );
  expect(accountSnapshot.mask).toBe(account.mask);
  expect(accountSnapshot.name).toBe(account.name);
  expect(accountSnapshot.officialName).toBe(account.officialName);
  expect(accountSnapshot.type).toBe(account.type);
  expect(accountSnapshot.subtype).toBe(account.subtype);
  expect(accountSnapshot.verificationStatus).toBe(account.verificationStatus);
};

describe('SnapshotAccountsService', () => {
  describe('snapshot should', () => {
    it('return empty array when no accounts are found', async () => {
      // Arrange
      const { serviceCollection } = buildTestBed();

      // Act
      const response = await serviceCollection.snapshotAccountsService.snapshot(
        {
          userId: uuid()
        } satisfies SnapshotAccountsCommand
      );

      // Assert
      expect(response.type).toBe('SUCCESS');
      if (response.type === 'SUCCESS') {
        expect(response.data.length).toBe(0);
      }
    });
    it('returns latest snapshot of accounts', async () => {
      // Arrange
      const { serviceCollection, testBed } = buildTestBed({
        accountsBalanceGetResponse: buildAccountsBalanceGetResponse({
          accounts: [buildAccount(), buildAccount()]
        })
      });
      const { user, institution } = await createInstitution(testBed);

      // Act
      const response = await serviceCollection.snapshotAccountsService.snapshot(
        {
          userId: user.id
        } satisfies SnapshotAccountsCommand
      );

      // Assert
      expect(response.type).toBe('SUCCESS');
      if (response.type === 'SUCCESS') {
        expect(response.data.length).toBe(institution.accounts.length);
        const expectedSnapshotId = response.data[0].snapshotId;
        response.data.forEach((accountSnapshot) => {
          expect(accountSnapshot.snapshotId).toBe(expectedSnapshotId);
          const externalAccount = institution.accounts.find(
            (account) => account.id === accountSnapshot.accountId
          );
          expect(externalAccount).toBeDefined();
          if (externalAccount != null) {
            expectAccountSnapshotToMatchAccount(
              accountSnapshot,
              externalAccount
            );
          }
        });
      }
    });
  });
});
