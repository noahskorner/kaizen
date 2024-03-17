import { ErrorCode } from '@kaizen/core';
import { defaultTestBed } from '../../../test/default-test-bed';
import { UpdateWalletCommand } from '@kaizen/wallet';
import { v4 as uuid } from 'uuid';
import { createWallet } from '../../../test/create-wallet';

describe('UpdateWalletService', () => {
  describe('update should', () => {
    it(`return ${ErrorCode.UPDATE_WALLET_MUST_PROVIDE_UNIQUE_TRANSACTION_ID} when transactionId is empty`, async () => {
      // Arrange
      const sut = defaultTestBed.serviceCollection.updateWalletService;

      // Act
      const response = await sut.update({} as UpdateWalletCommand);

      // Assert
      expect(response.type).toBe('FAILURE');
      if (response.type === 'FAILURE') {
        expect(response.errors.map((x) => x.code)).toContain(
          ErrorCode.UPDATE_WALLET_MUST_PROVIDE_UNIQUE_TRANSACTION_ID
        );
      }
    });
    it(`return ${ErrorCode.UPDATE_WALLET_MUST_PROVIDE_AMOUNT} when amount is empty`, async () => {
      // Arrange
      const sut = defaultTestBed.serviceCollection.updateWalletService;

      // Act
      const response = await sut.update({
        transactionId: uuid()
      } as UpdateWalletCommand);

      // Assert
      expect(response.type).toBe('FAILURE');
      if (response.type === 'FAILURE') {
        expect(response.errors.map((x) => x.code)).toContain(
          ErrorCode.UPDATE_WALLET_MUST_PROVIDE_AMOUNT
        );
      }
    });
    it(`return ${ErrorCode.UPDATE_WALLET_NOT_FOUND} when wallet does not exist`, async () => {
      // Arrange
      const sut = defaultTestBed.serviceCollection.updateWalletService;

      // Act
      const response = await sut.update({
        userId: uuid(),
        transactionId: uuid(),
        amount: 100
      } satisfies UpdateWalletCommand);

      // Assert
      expect(response.type).toBe('FAILURE');
      if (response.type === 'FAILURE') {
        expect(response.errors.map((x) => x.code)).toContain(
          ErrorCode.UPDATE_WALLET_NOT_FOUND
        );
      }
    });
    it(`return ${ErrorCode.UPDATE_WALLET_TRANSACTION_ALREADY_EXISTS} when transaction already exists`, async () => {
      // Arrange
      const sut = defaultTestBed.serviceCollection.updateWalletService;
      const { user } = await createWallet(defaultTestBed);
      const command: UpdateWalletCommand = {
        userId: user.id,
        transactionId: uuid(),
        amount: 100
      };

      // Act
      await sut.update(command);
      const response = await sut.update(command);

      // Assert
      expect(response.type).toBe('FAILURE');
      if (response.type === 'FAILURE') {
        expect(response.errors.map((x) => x.code)).toContain(
          ErrorCode.UPDATE_WALLET_TRANSACTION_ALREADY_EXISTS
        );
      }
    });
    it(`return ${ErrorCode.UPDATE_WALLET_NOT_ENOUGH_FUNDS} when wallet does not have enough funds`, async () => {
      // Arrange
      const sut = defaultTestBed.serviceCollection.updateWalletService;
      const { user } = await createWallet(defaultTestBed);
      const command: UpdateWalletCommand = {
        userId: user.id,
        transactionId: uuid(),
        amount: -1
      };

      // Act
      const response = await sut.update(command);

      // Assert
      expect(response.type).toBe('FAILURE');
      if (response.type === 'FAILURE') {
        expect(response.errors.map((x) => x.code)).toContain(
          ErrorCode.UPDATE_WALLET_NOT_ENOUGH_FUNDS
        );
      }
    });
    it(`return ${ErrorCode.UPDATE_WALLET_NOT_ENOUGH_FUNDS} when wallet does not have enough funds after multiple transactions`, async () => {
      // Arrange
      const sut = defaultTestBed.serviceCollection.updateWalletService;
      const { user, wallet } = await createWallet(defaultTestBed);
      // Give the wallet a starting balance of 1
      const command: UpdateWalletCommand = {
        userId: user.id,
        transactionId: uuid(),
        amount: 1
      };
      await sut.update(command);

      // Act
      const response = await Promise.all([
        sut.update({
          userId: user.id,
          transactionId: uuid(),
          amount: -1
        } satisfies UpdateWalletCommand),
        sut.update({
          userId: user.id,
          transactionId: uuid(),
          amount: -1
        } satisfies UpdateWalletCommand)
      ]);

      // Assert
      const successResponse = response.find((x) => x.type === 'SUCCESS');
      expect(successResponse).toBeDefined();
      if (successResponse != null && successResponse.type === 'SUCCESS') {
        expect(successResponse.data.userId).toBe(user.id);
        expect(successResponse.data.id).toBe(wallet.id);
        expect(successResponse.data.balance).toBe(0);
      }
      const failureResponse = response.find((x) => x.type === 'FAILURE');
      expect(failureResponse).toBeDefined();
      if (failureResponse != null && failureResponse.type === 'FAILURE') {
        expect(failureResponse.errors.map((x) => x.code)).toContain(
          ErrorCode.UPDATE_WALLET_NOT_ENOUGH_FUNDS
        );
      }
    });
    it(`return the updated wallet`, async () => {
      // Arrange
      const sut = defaultTestBed.serviceCollection.updateWalletService;
      const { user, wallet } = await createWallet(defaultTestBed);
      const command: UpdateWalletCommand = {
        userId: user.id,
        transactionId: uuid(),
        amount: 1
      };

      // Act
      const response = await sut.update(command);

      // Assert
      expect(response.type).toBe('SUCCESS');
      if (response.type === 'SUCCESS') {
        expect(response.data.id).toBe(wallet.id);
        expect(response.data.userId).toBe(user.id);
        expect(response.data.balance).toBe(wallet.balance + command.amount);
      }
    });
  });
});
