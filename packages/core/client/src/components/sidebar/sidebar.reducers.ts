import {
  HIDE_SIDEBAR,
  SHOW_SIDEBAR,
  SidebarAction,
  TOGGLE_SIDEBAR
} from './sidebar.actions';
import { SidebarStore } from './sidebar.store';

const initialState: SidebarStore = {
  showSidebar: true
};

export const sidebarReducers = (
  state = initialState,
  action: SidebarAction
): SidebarStore => {
  switch (action.type) {
    case SHOW_SIDEBAR:
      return {
        showSidebar: true
      };
    case HIDE_SIDEBAR:
      return {
        showSidebar: false
      };
    case TOGGLE_SIDEBAR:
      return {
        showSidebar: !state.showSidebar
      };
    default:
      return state;
  }
};
