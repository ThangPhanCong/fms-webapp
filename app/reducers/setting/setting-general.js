import {
  PROJECT_LOADED,
  PROJECT_LOADING,
  CHANGE_NAME_PROJECT,
  CHANGE_DESCRIPTON_PROJECT,
  IS_SHOW_CONFIRM_MODAL
} from '../../actions/setting/setting-general';

const initState = {
  project: "",
  isProjectLoading: true,
  isShowModal: false
}

const settingGeneral = (state = initState, action) => {
  switch (action.type) {
    case IS_SHOW_CONFIRM_MODAL:
      return {
        ...state,
        isShowModal: !state.isShowModal
      }
    case PROJECT_LOADING:
      return {
        ...state,
        isProjectLoading: true
      }
    case PROJECT_LOADED:
      return {
        ...state,
        isProjectLoading: false,
        project: action.project
      }
    case CHANGE_NAME_PROJECT:
      return {
        ...state,
        project: action.project
      }
    case CHANGE_DESCRIPTON_PROJECT:
      return {
        ...state,
        project: action.project
      }
    default:
      return state;
  }
}

export default settingGeneral;
