import { ErrorCode } from '@kaizen/core';
import { UpdateWalletCommand } from '@kaizen/wallet';
import { v4 as uuid } from 'uuid';
import { createWallet } from '../../../test/create-wallet';
import { buildTestBed } from '../../../test/build-test-bed';

describe('UpdateWalletService', () => {
  describe('update should', () => {
    it(`return ${ErrorCode.UPDATE_WALLET_MUST_PROVIDE_UNIQUE_TRANSACTION_ID} when transactionId is empty`, async () => {
      // Arrange
      const { serviceCollection } = buildTestBed();

      // Act
      const response = await serviceCollection.updateWalletService.update(
        {} as UpdateWalletCommand
      );

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
      const { serviceCollection } = buildTestBed();

      // Act
      const response = await serviceCollection.updateWalletService.update({
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
      const { serviceCollection } = buildTestBed();

      // Act
      const response = await serviceCollection.updateWalletService.update({
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
      const { testBed, serviceCollection } = buildTestBed();

      const { user } = await createWallet(serviceCollection, testBed);
      const command: UpdateWalletCommand = {
        userId: user.id,
        transactionId: uuid(),
        amount: 100
      };

      // Act
      await serviceCollection.updateWalletService.update(command);
      const response =
        await serviceCollection.updateWalletService.update(command);

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
      const { serviceCollection, testBed } = buildTestBed();
      const { user } = await createWallet(serviceCollection, testBed);
      const command: UpdateWalletCommand = {
        userId: user.id,
        transactionId: uuid(),
        amount: -1
      };

      // Act
      const response =
        await serviceCollection.updateWalletService.update(command);

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
      const { serviceCollection, testBed } = buildTestBed();
      const { user, wallet } = await createWallet(serviceCollection, testBed);
      // Give the wallet a starting balance of 1
      const command: UpdateWalletCommand = {
        userId: user.id,
        transactionId: uuid(),
        amount: 1
      };
      await serviceCollection.updateWalletService.update(command);

      // Act
      const response = await Promise.all([
        serviceCollection.updateWalletService.update({
          userId: user.id,
          transactionId: uuid(),
          amount: -1
        } satisfies UpdateWalletCommand),
        serviceCollection.updateWalletService.update({
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
      const { serviceCollection, testBed } = buildTestBed();
      const { user, wallet } = await createWallet(serviceCollection, testBed);
      const command: UpdateWalletCommand = {
        userId: user.id,
        transactionId: uuid(),
        amount: 1
      };

      // Act
      const response =
        await serviceCollection.updateWalletService.update(command);

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
