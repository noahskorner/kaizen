import { ThunkDispatch } from '@reduxjs/toolkit';
import { ScreenAction } from './screen.actions';

export interface ScreenStore {
  width: number;
  height: number;
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  '2xl': boolean;
}

export type ScreenState = {
  screen: ScreenStore;
};

export type ScreenDispatch = ThunkDispatch<ScreenState, unknown, ScreenAction>;
