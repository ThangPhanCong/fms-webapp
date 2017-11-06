import { PROJECTS_LOADIND, PROJECTS_LOADED } from '../../actions/project/project';

const initState = {
  isProjectLoading: true,
  projects: []
}

const _project = (state = initState, action) => {
  switch (action.type) {
    case PROJECTS_LOADIND:
      return {
        ...state,
        isProjectLoading: true
      }
    case PROJECTS_LOADED:
      return {
        ...state,
        isProjectLoading: false,
        projects: action.projects
      }
    default:
      return state;
  }
}

export default _project;
