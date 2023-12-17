import { Institution, Account } from '@kaizen/institution';

export interface AccountGroup {
  available: number;
  current: number;
  accounts: Account[];
}

export const groupAccountsByType = (
  institutions: Institution[]
): Record<string, AccountGroup> => {
  return institutions.reduce(
    (acc, institution) => {
      institution.accounts.forEach((account) => {
        if (!acc[account.type]) {
          acc[account.type] = {
            available: 0,
            current: 0,
            accounts: []
          };
        }
        acc[account.type].available += account.available;
        acc[account.type].current += account.current;
        acc[account.type].accounts.push(account);
      });
      return acc;
    },
    {} as Record<
      string,
      { available: number; current: number; accounts: Account[] }
    >
  );
};
