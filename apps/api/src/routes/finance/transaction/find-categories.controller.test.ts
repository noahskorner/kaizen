import supertest from 'supertest';
import { buildTestBed } from '../../../../test/build-test-bed';
import { createAndLoginUser } from '../../../../test/create-and-login-user';
import {
  buildAccount,
  buildAccountsBalanceGetResponse,
  buildItem,
  buildItemPublicTokenExchangeResponse,
  buildTransaction,
  buildTransactionsSyncResponse,
  createInstitution
} from '../../../../test';
import { v4 as uuid } from 'uuid';

describe('/transaction/category', () => {
  describe('find should', () => {
    it('return empty when no categories exist', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createAndLoginUser(testBed);

      // Act
      const response = await supertest(testBed)
        .get('/transaction/category')
        .auth(authToken.accessToken, { type: 'bearer' });

      // Asserts
      expect(response.status).toBe(200);
      expect(response.body.type).toBe('SUCCESS');
      expect(response.body.data).toEqual([]);
    });
    it('return categories and their counts', async () => {
      // Arrange
      const item = buildItem();
      const account = buildAccount({
        item_id: item.item_id
      });
      const [category1, category2] = [uuid(), uuid()];
      const transactions = [
        buildTransaction({
          account_id: account.account_id,
          personal_finance_category: {
            primary: category1,
            detailed: uuid()
          }
        }),
        buildTransaction({
          account_id: account.account_id,
          personal_finance_category: {
            primary: category2,
            detailed: uuid()
          }
        }),
        buildTransaction({
          account_id: account.account_id,
          personal_finance_category: {
            primary: category2,
            detailed: uuid()
          }
        })
      ];
      const { testBed } = buildTestBed({
        itemPublicTokenExchangeResponse: buildItemPublicTokenExchangeResponse({
          item_id: item.item_id
        }),
        accountsBalanceGetResponse: buildAccountsBalanceGetResponse({
          accounts: [account]
        }),
        transactionSyncResponse: buildTransactionsSyncResponse({
          added: transactions
        })
      });
      const { authToken } = await createInstitution(testBed);

      // Act
      const response = await supertest(testBed)
        .get('/transaction/category')
        .auth(authToken.accessToken, { type: 'bearer' });

      // Asserts
      expect(response.body.type).toBe('SUCCESS');
      expect(response.body.data).toEqual({
        [category1]: 1,
        [category2]: 2
      });
    });
  });
});
