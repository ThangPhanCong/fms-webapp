import * as store from '../../helpers/storage';

export const SETTING_LOADING = 'SETTING_LOADING';
export const SETTING_LOADED = 'SETTING_LOADED';
export const IS_EDITTING = 'IS_EDITTING';

export const settingLoading = () => dispatch => {
  dispatch({ type: SETTING_LOADING});
}

export const settingLoaded = () => dispatch => {
  dispatch({ type: SETTING_LOADED});
}

export const isEditting = () => dispatch => {
  dispatch({type: IS_EDITTING})
}
