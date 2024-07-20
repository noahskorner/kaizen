import supertest from 'supertest';
import {
  buildAccount,
  buildAccountsBalanceGetResponse,
  buildItem,
  createAndLoginUser,
  createInstitution,
  expectError
} from '../../../../test';
import { buildTestBed } from '../../../../test/build-test-bed';
import { v4 as uuid } from 'uuid';
import { ApiSuccessResponse, ErrorCode } from '@kaizen/core';
import { Institution } from '@kaizen/finance';

describe('/account/:accountId', () => {
  describe('delete should', () => {
    it('returns 404 when account not found', async () => {
      // Arrange
      const accountId = uuid();
      const { testBed } = buildTestBed();
      const { authToken } = await createAndLoginUser(testBed);

      // Act
      const response = await supertest(testBed)
        .delete(`/account/${accountId}`)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(404);
      expectError(response, ErrorCode.DELETE_ACCOUNT_NOT_FOUND);
    });
    it('returns 404 when account does not belond to user', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { institution } = await createInstitution(testBed);
      const accountId = institution.accounts[0].id;
      const { authToken } = await createAndLoginUser(testBed);

      // Act
      const response = await supertest(testBed)
        .delete(`/account/${accountId}`)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(404);
      expectError(response, ErrorCode.DELETE_ACCOUNT_NOT_FOUND);
    });
    it('returns 200 when more than one account for this institution', async () => {
      // Arrange
      const item = buildItem();
      const accounts = [
        buildAccount({ item_id: item.item_id }),
        buildAccount({ item_id: item.item_id })
      ];
      const accountsBalanceGetResponse = buildAccountsBalanceGetResponse({
        accounts: accounts,
        item: item
      });
      const { testBed } = buildTestBed({
        accountsBalanceGetResponse: accountsBalanceGetResponse
      });
      const { institution, authToken } = await createInstitution(testBed);

      // Act
      const deleteAccountResponse = await supertest(testBed)
        .delete(`/account/${institution.accounts[0].id}`)
        .auth(authToken.accessToken, { type: 'bearer' });
      const deleteAccountBody: ApiSuccessResponse<true> =
        deleteAccountResponse.body;
      const findInstitutionResponse = await supertest(testBed)
        .get('/institution')
        .auth(authToken.accessToken, { type: 'bearer' });
      const findInstitutionBody: ApiSuccessResponse<Institution[]> =
        findInstitutionResponse.body;

      // Assert
      expect(deleteAccountResponse.statusCode).toBe(200);
      expect(deleteAccountBody.data).toBe(true);
      expect(findInstitutionBody.data.length).toBe(1);
      expect(findInstitutionBody.data[0].accounts.length).toBe(1);
      expect(findInstitutionBody.data[0].accounts[0].id).toBe(
        institution.accounts[1].id
      );
    });
    it('returns 200 when exactly one account in this institution', async () => {
      // Arrange
      const item = buildItem();
      const accountsBalanceGetResponse = buildAccountsBalanceGetResponse({
        accounts: [buildAccount({ item_id: item.item_id })],
        item: item
      });
      const { testBed } = buildTestBed({
        accountsBalanceGetResponse: accountsBalanceGetResponse
      });
      const { institution, authToken } = await createInstitution(testBed);

      // Act
      const deleteAccountResponse = await supertest(testBed)
        .delete(`/account/${institution.accounts[0].id}`)
        .auth(authToken.accessToken, { type: 'bearer' });
      const deleteAccountBody: ApiSuccessResponse<true> =
        deleteAccountResponse.body;
      const findInstitutionResponse = await supertest(testBed)
        .get('/institution')
        .auth(authToken.accessToken, { type: 'bearer' });
      const findInstitutionBody: ApiSuccessResponse<Institution[]> =
        findInstitutionResponse.body;

      // Assert
      expect(deleteAccountResponse.statusCode).toBe(200);
      expect(deleteAccountBody.data).toBe(true);
      expect(findInstitutionBody.data.length).toBe(0);
    });
  });
});
