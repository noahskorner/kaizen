import { SET_SCREEN_DIMENSIONS, ScreenAction } from './screen.actions';
import { ScreenStore } from './screen.store';

const initialState: ScreenStore = {
  height: 1920,
  width: 1080,
  xs: false,
  sm: false,
  md: false,
  lg: false,
  xl: true,
  '2xl': false
};

export const screenReducers = (
  state = initialState,
  action: ScreenAction
): ScreenStore => {
  switch (action.type) {
    case SET_SCREEN_DIMENSIONS:
      // eslint-disable-next-line no-case-declarations
      const { height, width } = action.payload;
      return {
        height: height,
        width: width,
        xs: width < 640,
        sm: width >= 640 && width < 768,
        md: width >= 768 && width < 1024,
        lg: width >= 1024 && width < 1280,
        xl: width >= 1280 && width < 1536,
        '2xl': width >= 1536
      } satisfies ScreenStore;
    default:
      return state;
  }
};
