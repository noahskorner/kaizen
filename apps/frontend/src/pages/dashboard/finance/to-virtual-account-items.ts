import { VirtualAccount, VirtualAccountFrequency } from '@kaizen/finance';

export interface VirtualAccountItem {
  id: string;
  name: string;
  balance: number;
  amount: number;
  currency: string;
  frequency: VirtualAccountFrequency;
}

export const toVirtualAccountItems = (
  virtualAccounts: VirtualAccount[],
  total: number
): VirtualAccountItem[] => {
  const items = virtualAccounts.map((virtualAccount) => {
    const item: VirtualAccountItem = {
      id: virtualAccount.id,
      name: virtualAccount.name,
      balance: calculateBalance(virtualAccount),
      currency: virtualAccount.currency,
      amount: virtualAccount.amount,
      frequency: virtualAccount.frequency
    };

    return item;
  });

  items.push({
    id: '0',
    name: 'Savings',
    balance: total - items.reduce((acc, item) => acc + item.balance, 0),
    amount: 0,
    currency: virtualAccounts[0]?.currency ?? 'USD',
    frequency: VirtualAccountFrequency.Monthly
  });

  return items;
};

const calculateBalance = (virtualAccount: VirtualAccount): number => {
  const currentDate = new Date();
  const createdDate = new Date(virtualAccount.createdAt);

  const timeDiff = Math.abs(currentDate.getTime() - createdDate.getTime());
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const monthsDiff =
    (currentDate.getFullYear() - createdDate.getFullYear()) * 12 +
    (currentDate.getMonth() - createdDate.getMonth());

  let numPayments = 0;
  switch (virtualAccount.frequency) {
    case VirtualAccountFrequency.Weekly:
      numPayments = Math.floor(daysDiff / 7);
      break;
    case VirtualAccountFrequency.Biweekly:
      numPayments = Math.floor(daysDiff / 14);
      break;
    case VirtualAccountFrequency.Monthly:
      numPayments = monthsDiff;
      break;
    default:
      throw new Error('Invalid frequency');
  }

  return virtualAccount.balance + numPayments * virtualAccount.amount;
};
