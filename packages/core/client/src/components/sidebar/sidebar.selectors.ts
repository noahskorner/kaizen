import { SidebarState } from './sidebar.store';

export const selectShowSidebar = (state: SidebarState) =>
  state.sidebar.showSidebar;
