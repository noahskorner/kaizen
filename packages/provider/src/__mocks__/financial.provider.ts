export const FinancialProvider = jest.fn().mockImplementation(() => {
  return {
    createLinkToken: jest
      .fn()
      .mockResolvedValue({ type: 'SUCCESS', data: 'MOCK_LINK_TOKEN' }),
    exchangePublicToken: jest
      .fn()
      .mockResolvedValue({ type: 'SUCCESS', data: 'MOCK_ACCESS_TOKEN' })
  };
});
