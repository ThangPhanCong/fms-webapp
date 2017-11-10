import {
  PROJECT_LOADED,

} from '../../actions/setting/setting-general';

const initState = {
  project: ""
}

const settingGeneral = (state = initState, action) => {
  switch (action.type) {

    case PROJECT_LOADED:
      return {
        ...state,
        project: action.project
      }

    default:
      return state;
  }
}

export default settingGeneral;
