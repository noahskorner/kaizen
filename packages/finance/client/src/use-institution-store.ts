import { create } from 'zustand';
import { Institution } from '@kaizen/finance';

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

export const useInstitutionStore = create<InstitutionStore>((set) => ({
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
