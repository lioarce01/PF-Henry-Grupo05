import { switchTheme } from './index'

export const switchThemeAction = () => (dispatch) => {
  dispatch(switchTheme());
};