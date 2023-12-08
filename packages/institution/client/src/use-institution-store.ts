import { create } from 'zustand';
import { Institution } from '@kaizen/institution';
import { InstitutionService } from '.';

export interface InstitutionStore {
  loading: boolean;
  institutions: Institution[];
  loadInstitutions: () => void;
  addInsitution: (institution: Institution) => void;
}

const initialState = {
  loading: true,
  institutions: []
};

export const useInstitutionStore = create<InstitutionStore>((set) => ({
  ...initialState,
  loadInstitutions: async () => {
    const response = await InstitutionService.find();

    return set(() => {
      if (response.status === 200) {
        return {
          loading: false,
          institutions: response.data
        };
      } else return initialState;
    });
  },
  addInsitution: (institution: Institution) => {
    return set((store) => {
      return {
        ...store,
        institutions: [...store.institutions, institution]
      };
    });
  }
}));
