import { create } from 'zustand';
import { VirtualAccount } from '@kaizen/finance';

export interface VirtualAccountStore {
  virtualAccounts: VirtualAccount[];
  setVirtualAccounts: (virtualAccounts: VirtualAccount[]) => void;
  addVirtualAccount: (virtualAccount: VirtualAccount) => void;
}

const initialState: Omit<
  VirtualAccountStore,
  'setVirtualAccounts' | 'addVirtualAccount'
> = {
  virtualAccounts: []
};

export const useVirtualAccountStore = create<VirtualAccountStore>((set) => ({
  ...initialState,
  setVirtualAccounts: (virtualAccounts: VirtualAccount[]) => {
    return set(() => {
      return {
        virtualAccounts: virtualAccounts
      };
    });
  },
  addVirtualAccount: (virtualAccount: VirtualAccount) => {
    return set((state) => {
      return {
        virtualAccounts: [...state.virtualAccounts, virtualAccount]
      };
    });
  }
}));
