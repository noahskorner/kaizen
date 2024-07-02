export const SET_SCREEN_DIMENSIONS = 'SET_SCREEN_DIMENSIONS';
export interface SetScreenDimensionsAction {
  type: typeof SET_SCREEN_DIMENSIONS;
  payload: {
    width: number;
    height: number;
  };
}
export const setScreenDimensionsAction = (payload: {
  height: number;
  width: number;
}): SetScreenDimensionsAction => {
  return {
    type: SET_SCREEN_DIMENSIONS,
    payload
  };
};

export type ScreenAction = SetScreenDimensionsAction;
