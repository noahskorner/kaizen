import { IFinancialProvider } from '../financial.provider';

const mockAccount = {
  id: 'MOCK_EXTERNAL_ACCOUNT_ID',
  type: 'depository',
  balance: {
    current: 100,
    available: 75
  }
};

export const FinancialProvider = jest.fn().mockImplementation(() => {
  const implemenation: IFinancialProvider = {
    createExternalLinkToken: jest
      .fn()
      .mockResolvedValue({ type: 'SUCCESS', data: 'MOCK_LINK_TOKEN' }),
    exchangeExternalPublicToken: jest
      .fn()
      .mockResolvedValue({ type: 'SUCCESS', data: 'MOCK_ACCESS_TOKEN' }),
    getExternalAccounts: jest.fn().mockResolvedValue({
      type: 'SUCCESS',
      data: [mockAccount]
    })
  };

  return implemenation;
});
