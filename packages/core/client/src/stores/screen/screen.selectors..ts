import { ScreenState } from './screen.store';

export const selectWidth = (state: ScreenState) => state.screen.width;

export const selectHeight = (state: ScreenState) => state.screen.height;
