import * as redux from 'redux';
import {
  PROJECTS_LOADIND,
  PROJECTS_LOADED,
  ADD_NEW_PROJECT
} from '../actions/project/project'

const initState = {
  isProjectLoading: true,
  projects: [],
  pages: null
}

const project = (state = initState, action) => {
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
    case ADD_NEW_PROJECT:
      return {
        ...state,
        projects: [
          ...state.projects,
          action.project
        ]
      }
    default:
      return state;
  }
}

export default project;
