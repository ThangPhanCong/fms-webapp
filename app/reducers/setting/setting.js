import {
  SETTING_LOADING,
  SETTING_LOADED,
  IS_EDITTING,
} from '../../actions/setting/setting';
import settingGeneral from "./setting-general";
import settingPage from "./setting-page";
import settingTag from "./setting-tag";
import * as redux from 'redux';
const initState = {
  isSettingLoading: true,
  isEditting: false,
};

const settingReducer = (state = initState, action) => {
  switch (action.type) {
    case SETTING_LOADING:
      return {
        ...state,
        isSettingLoading: true
      };
    case SETTING_LOADED:
      return {
        ...state,
        isSettingLoading: false
      };
    case IS_EDITTING:
      return {
        ...state,
        isEditting: action.state
      };
    default:
      return state;
  }
};
const reducers = redux.combineReducers({
  setting: settingReducer,
  settingGeneral,
  settingPage,
  settingTag
});

export default reducers;
