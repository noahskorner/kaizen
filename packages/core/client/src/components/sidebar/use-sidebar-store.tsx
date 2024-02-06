import { create } from 'zustand';

export interface SidebarStore {
  show: boolean;
}

const initialState: Omit<
  SidebarStore,
  'addSidebar' | 'removeSidebar' | 'addFailureSidebar'
> = {
  show: false
};

export const useSidebarStore = create<SidebarStore>((set) => ({
  ...initialState,
  toggleSidebar: () => set((state) => ({ show: !state.show }))
}));
