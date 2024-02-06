import { create } from 'zustand';
import { Account, AccountType, Institution } from '@kaizen/finance';

export interface InstitutionStore {
  institutions: Institution[];
  setInstitutions: (institutions: Institution[]) => void;
  addInstitution: (institution: Institution) => void;
}

const initialState: Omit<
  InstitutionStore,
  'setInstitutions' | 'addInstitution'
> = {
  institutions: []
};

const _useInstitutionStore = create<InstitutionStore>((set) => ({
  ...initialState,
  setInstitutions: (institutions: Institution[]) => {
    return set(() => {
      return {
        institutions: institutions
      };
    });
  },
  addInstitution: (institution: Institution) => {
    return set((store) => {
      return {
        ...store,
        institutions: [...store.institutions, institution]
      };
    });
  }
}));

export const useInstitutionStore = () => {
  const institutionStore = _useInstitutionStore();

  const networth = institutionStore.institutions.reduce((prev, curr) => {
    return (
      prev +
      curr.accounts.reduce((prev, curr) => {
        if (
          [
            AccountType.Brokerage,
            AccountType.Depository,
            AccountType.Investment
          ].includes(curr.type)
        ) {
          return prev + curr.current;
        }

        if ([AccountType.Credit].includes(curr.type)) {
          return prev - curr.current;
        }

        return prev;
      }, 0)
    );
  }, 0);

  const accountGroups = institutionStore.institutions.reduce(
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

  return {
    ...institutionStore,
    networth,
    accountGroups
  };
};
