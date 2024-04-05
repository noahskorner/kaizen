import { AccountType } from '@kaizen/finance';
import { AccountGroup } from '../account-group';
import { InstitutionState } from './institution.store';

export type AccountGroupMap = { [K in AccountType]: AccountGroup };

export const selectAccountGroups = (
  store: InstitutionState
): AccountGroupMap => {
  return store.institution.institutions.reduce((acc, institution) => {
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
};

// const networth = institutionStore.institutions.reduce((prev, curr) => {
//   return (
//     prev +
//     curr.accounts.reduce((prev, curr) => {
//       if (
//         [
//           AccountType.Brokerage,
//           AccountType.Depository,
//           AccountType.Investment
//         ].includes(curr.type)
//       ) {
//         return prev + (curr.current ?? 0);
//       }

//       if ([AccountType.Credit].includes(curr.type)) {
//         return prev - (curr.current ?? 0);
//       }

//       return prev;
//     }, 0)
//   );
// }, 0);

// /* Caclulcate by AccountType
//   Investment:
//   Calculate the sum of all accounts with type Investment to find the principle.
//   Then, find out the (mean/median) interest rate across all accounts historically (r).
//   Find out the estimated value of the investment in v years (v).
//   Credit = 'credit',
//   Calculate the sum of all accounts with type Credit to find the principle.
//   Median interest rate across all accounts historically (r).

//   Depository = 'depository',
//   Loan = 'loan',
//   Brokerage = 'brokerage',
//   Other = 'other'
// */
// // const retirement = institutionStore.institutions.filter((institution) =>
// //   institution.accounts.some((account) =>
// //     [AccountType.Brokerage, AccountType.Investment].includes(account.type)
// //   )
// // );

// return {
//   ...institutionStore,
//   networth,
//   accountGroups
// };
