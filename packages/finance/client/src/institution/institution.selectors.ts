import { createSelector } from 'reselect';
import { AccountType } from '@kaizen/finance';
import { AccountGroup } from './account-group';
import { InstitutionState } from './institution.store';

export type AccountGroupMap = { [K in AccountType]: AccountGroup };

const insitutionSelector = (state: InstitutionState) =>
  state.institution.institutions;

export const selectAccountGroups = createSelector(
  insitutionSelector,
  (institutions) => {
    return institutions.reduce((acc, institution) => {
      institution.accounts.forEach((account) => {
        if (!acc[account.type]) {
          acc[account.type] = {
            available: 0,
            current: 0,
            accounts: []
          };
        }
        acc[account.type].available += account.available ?? 0;
        acc[account.type].current += account.current ?? 0;
        acc[account.type].accounts.push(account);
      });
      return acc;
    }, {} as AccountGroupMap);
  }
);
