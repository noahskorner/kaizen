import { ThunkDispatch } from '@reduxjs/toolkit';
import { SidebarAction } from './sidebar.actions';

export interface SidebarStore {
  showSidebar: boolean;
}

export type SidebarState = {
  sidebar: SidebarStore;
};

export type SidebarDispatch = ThunkDispatch<
  SidebarState,
  unknown,
  SidebarAction
>;
