import supertest from 'supertest';
import { ApiSuccessResponse, ErrorCode } from '@kaizen/core';
import { createAndLoginUser } from '../../../../test/create-and-login-user';
import {
  buildAccount,
  buildAccountsBalanceGetResponse,
  buildItem,
  buildItemPublicTokenExchangeResponse,
  buildTransaction,
  buildTransactionsSyncResponse,
  createInstitution,
  expectError
} from '../../../../test';
import {
  buildTestBed,
  cachedPrismaClient
} from '../../../../test/build-test-bed';
import { v4 as uuid } from 'uuid';
import { Transaction, UpdateTransactionRequest } from '@kaizen/finance';
import { randomInt } from 'crypto';

describe('/transaction/:transactionId should', () => {
  describe('update should', () => {
    it('returns 404 when transaction not found', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createAndLoginUser(testBed);

      // Act
      const response = await supertest(testBed)
        .put(`/transaction/${uuid()}`)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Asserts
      expect(response.status).toBe(404);
      expectError(response, ErrorCode.UPDATE_TRANSACTION_NOT_FOUND);
    });
    it('returns 400 when name is invalid', async () => {
      // Arrange
      const mockItem = buildItem();
      const mockAccount = buildAccount({
        item_id: mockItem.item_id
      });
      const mockTransaction = buildTransaction({
        account_id: mockAccount.account_id
      });
      const { testBed } = buildTestBed({
        itemPublicTokenExchangeResponse: buildItemPublicTokenExchangeResponse({
          item_id: mockItem.item_id
        }),
        accountsBalanceGetResponse: buildAccountsBalanceGetResponse({
          accounts: [mockAccount]
        }),
        transactionSyncResponse: buildTransactionsSyncResponse({
          added: [mockTransaction]
        })
      });
      const { authToken } = await createInstitution(testBed);
      const transaction =
        await cachedPrismaClient.transactionRecord.findUniqueOrThrow({
          where: {
            externalId: mockTransaction.transaction_id
          }
        });

      // Act
      const responses = await Promise.all([
        supertest(testBed)
          .put(`/transaction/${transaction.id}`)
          .send({
            id: transaction.id,
            name: ''
          } satisfies UpdateTransactionRequest)
          .auth(authToken.accessToken, { type: 'bearer' }),
        supertest(testBed)
          .put(`/transaction/${transaction.id}`)
          .send({
            id: transaction.id,
            // 101 characters
            name: '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901'
          } satisfies UpdateTransactionRequest)
          .auth(authToken.accessToken, { type: 'bearer' })
      ]);

      // Asserts
      expect(responses.length).toBe(2);
      for (const response of responses) {
        expect(response.status).toBe(400);
        expectError(response, ErrorCode.UPDATE_TRANSACTION_INVALID_NAME);
      }
    });
    it('returns 400 when merchant name is invalid', async () => {
      // Arrange
      const mockItem = buildItem();
      const mockAccount = buildAccount({
        item_id: mockItem.item_id
      });
      const mockTransaction = buildTransaction({
        account_id: mockAccount.account_id
      });
      const { testBed } = buildTestBed({
        itemPublicTokenExchangeResponse: buildItemPublicTokenExchangeResponse({
          item_id: mockItem.item_id
        }),
        accountsBalanceGetResponse: buildAccountsBalanceGetResponse({
          accounts: [mockAccount]
        }),
        transactionSyncResponse: buildTransactionsSyncResponse({
          added: [mockTransaction]
        })
      });
      const { authToken } = await createInstitution(testBed);
      const transaction =
        await cachedPrismaClient.transactionRecord.findUniqueOrThrow({
          where: {
            externalId: mockTransaction.transaction_id
          }
        });

      // Act
      const responses = await Promise.all([
        supertest(testBed)
          .put(`/transaction/${transaction.id}`)
          .send({
            id: transaction.id,
            merchantName: ''
          } satisfies UpdateTransactionRequest)
          .auth(authToken.accessToken, { type: 'bearer' }),
        supertest(testBed)
          .put(`/transaction/${transaction.id}`)
          .send({
            id: transaction.id,
            // 101 characters
            merchantName:
              '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901'
          } satisfies UpdateTransactionRequest)
          .auth(authToken.accessToken, { type: 'bearer' })
      ]);

      // Asserts
      expect(responses.length).toBe(2);
      for (const response of responses) {
        expect(response.status).toBe(400);
        expectError(
          response,
          ErrorCode.UPDATE_TRANSACTION_INVALID_MERCHANT_NAME
        );
      }
    });
    it('returns 400 when description is invalid', async () => {
      // Arrange
      const mockItem = buildItem();
      const mockAccount = buildAccount({
        item_id: mockItem.item_id
      });
      const mockTransaction = buildTransaction({
        account_id: mockAccount.account_id
      });
      const { testBed } = buildTestBed({
        itemPublicTokenExchangeResponse: buildItemPublicTokenExchangeResponse({
          item_id: mockItem.item_id
        }),
        accountsBalanceGetResponse: buildAccountsBalanceGetResponse({
          accounts: [mockAccount]
        }),
        transactionSyncResponse: buildTransactionsSyncResponse({
          added: [mockTransaction]
        })
      });
      const { authToken } = await createInstitution(testBed);
      const transaction =
        await cachedPrismaClient.transactionRecord.findUniqueOrThrow({
          where: {
            externalId: mockTransaction.transaction_id
          }
        });

      // Act
      const responses = await Promise.all([
        supertest(testBed)
          .put(`/transaction/${transaction.id}`)
          .send({
            id: transaction.id,
            description: ''
          } satisfies UpdateTransactionRequest)
          .auth(authToken.accessToken, { type: 'bearer' }),
        supertest(testBed)
          .put(`/transaction/${transaction.id}`)
          .send({
            id: transaction.id,
            // 256 characters
            description: `1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
              1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
              12345678901234567890123456789012345678901234567890123456`
          } satisfies UpdateTransactionRequest)
          .auth(authToken.accessToken, { type: 'bearer' })
      ]);

      // Asserts
      expect(responses.length).toBe(2);
      for (const response of responses) {
        expect(response.status).toBe(400);
        expectError(response, ErrorCode.UPDATE_TRANSACTION_INVALID_DESCRIPTION);
      }
    });
    it('returns 400 when amount is invalid', async () => {
      // Arrange
      const mockItem = buildItem();
      const mockAccount = buildAccount({
        item_id: mockItem.item_id
      });
      const mockTransaction = buildTransaction({
        account_id: mockAccount.account_id
      });
      const { testBed } = buildTestBed({
        itemPublicTokenExchangeResponse: buildItemPublicTokenExchangeResponse({
          item_id: mockItem.item_id
        }),
        accountsBalanceGetResponse: buildAccountsBalanceGetResponse({
          accounts: [mockAccount]
        }),
        transactionSyncResponse: buildTransactionsSyncResponse({
          added: [mockTransaction]
        })
      });
      const { authToken } = await createInstitution(testBed);
      const transaction =
        await cachedPrismaClient.transactionRecord.findUniqueOrThrow({
          where: {
            externalId: mockTransaction.transaction_id
          }
        });

      // Act
      const response = await supertest(testBed)
        .put(`/transaction/${transaction.id}`)
        .send({
          id: transaction.id,
          amount: '70.00'
        } as unknown as UpdateTransactionRequest)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Asserts
      expect(response.status).toBe(400);
      expectError(response, ErrorCode.UPDATE_TRANSACTION_INVALID_AMOUNT);
    });
    it('returns 200 and updated transaction', async () => {
      // Arrange
      const mockItem = buildItem();
      const mockAccount = buildAccount({
        item_id: mockItem.item_id
      });
      const mockTransaction = buildTransaction({
        account_id: mockAccount.account_id
      });
      const { testBed } = buildTestBed({
        itemPublicTokenExchangeResponse: buildItemPublicTokenExchangeResponse({
          item_id: mockItem.item_id
        }),
        accountsBalanceGetResponse: buildAccountsBalanceGetResponse({
          accounts: [mockAccount]
        }),
        transactionSyncResponse: buildTransactionsSyncResponse({
          added: [mockTransaction]
        })
      });
      const { authToken } = await createInstitution(testBed);
      const transaction =
        await cachedPrismaClient.transactionRecord.findUniqueOrThrow({
          where: {
            externalId: mockTransaction.transaction_id
          }
        });
      const request: UpdateTransactionRequest = {
        id: transaction.id,
        name: uuid(),
        amount: randomInt(1, 100),
        merchantName: uuid(),
        description: uuid()
      };

      // Act
      const response = await supertest(testBed)
        .put(`/transaction/${transaction.id}`)
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });
      const body = response.body as ApiSuccessResponse<Transaction>;

      // Asserts
      expect(response.status).toBe(200);
      expect(body.type).toBe('SUCCESS');
      if (body.type === 'SUCCESS') {
        expect(body.data.id).toBe(transaction.id);
        expect(body.data.originalName).toBe(mockTransaction.name);
        expect(body.data.name).toBe(request.name);
        expect(body.data.originalMerchantName).toBe(
          mockTransaction.merchant_name
        );
        expect(body.data.merchantName).toBe(request.merchantName);
        expect(body.data.originalDescription).toBe(
          mockTransaction.original_description
        );
        expect(body.data.description).toBe(request.description);
        expect(body.data.originalAmount).toBe(mockTransaction.amount);
        expect(body.data.amount).toBe(request.amount);
      }
    });
  });
});
