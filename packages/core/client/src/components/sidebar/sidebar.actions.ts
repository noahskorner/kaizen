export const SHOW_SIDEBAR = 'SHOW_SIDEBAR';
export interface ShowSidebarAction {
  type: typeof SHOW_SIDEBAR;
}

export const showSidebarAction = (): ShowSidebarAction => {
  return {
    type: SHOW_SIDEBAR
  };
};

export const HIDE_SIDEBAR = 'HIDE_SIDEBAR';
export interface HideSidebarAction {
  type: typeof HIDE_SIDEBAR;
}

export const hideSidebarAction = (): HideSidebarAction => {
  return {
    type: HIDE_SIDEBAR
  };
};

export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export interface ToggleSidebarAction {
  type: typeof TOGGLE_SIDEBAR;
}

export const toggleSidebarAction = (): ToggleSidebarAction => {
  return {
    type: TOGGLE_SIDEBAR
  };
};

export type SidebarAction =
  | ShowSidebarAction
  | HideSidebarAction
  | ToggleSidebarAction;
