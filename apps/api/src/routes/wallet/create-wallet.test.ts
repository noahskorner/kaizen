import { buildTestBed, createUser } from '../../../test';
import { CreateWalletCommand } from '@kaizen/wallet';
import { ErrorCode } from '@kaizen/core';

describe('CreateWalletService', () => {
  describe('create should', () => {
    it(`return ${ErrorCode.CREATE_WALLET_MUST_PROVIDE_USER_ID} when userId is not provided`, async () => {
      // Arrange
      const { serviceCollection } = buildTestBed();

      // Act
      const response = await serviceCollection.createWalletService.create(
        {} as CreateWalletCommand
      );

      // Assert
      expect(response.type).toBe('FAILURE');
      if (response.type === 'FAILURE') {
        expect(response.errors.map((x) => x.code)).toContain(
          ErrorCode.CREATE_WALLET_MUST_PROVIDE_USER_ID
        );
      }
    });
    it(`return created wallet`, async () => {
      // Arrange
      const { testBed, serviceCollection } = buildTestBed();
      const user = await createUser(testBed);
      const command: CreateWalletCommand = {
        userId: user.id
      };

      // Act
      const response =
        await serviceCollection.createWalletService.create(command);

      // Assert
      expect(response.type).toBe('SUCCESS');
      if (response.type === 'SUCCESS') {
        expect(response.data.id).toBeDefined();
        expect(response.data.userId).toBe(user.id);
        expect(response.data.balance).toBe(0);
      }
    });
    it(`return ${ErrorCode.CREATE_WALLET_ALREADY_EXISTS_FOR_USER} when creating two wallets for the same user`, async () => {
      // Arrange
      const { testBed, serviceCollection } = buildTestBed();
      const user = await createUser(testBed);
      const command: CreateWalletCommand = {
        userId: user.id
      };

      // Act
      await serviceCollection.createWalletService.create(command);
      const response =
        await serviceCollection.createWalletService.create(command);

      // Assert
      expect(response.type).toBe('FAILURE');
      if (response.type === 'FAILURE') {
        expect(response.errors.map((x) => x.code)).toContain(
          ErrorCode.CREATE_WALLET_ALREADY_EXISTS_FOR_USER
        );
      }
    });
  });
});
