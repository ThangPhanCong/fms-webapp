import * as redux from 'redux';

const initState = {
  isProjectLoading: true,
  projects: [],
  modalIsShown: false,
  showListPages: false,
  isSendingRequest: false,
  project: null,
  pages: null,
  selectedPages: null,
  loadingStatus: ''
}

const project = (state = initState, action) => {
  switch (action.type) {
    case 'PROJECTS_LOADIND':
      return {
        ...state,
        isProjectLoading: true
      }
    case 'PROJECTS_LOADED':
      return {
        ...state,
        isProjectLoading: false,
        projects: action.projects
      }
    case 'OPEN_MODAL':
      return {
        ...state,
        modalIsShown: true
      }
    case 'SENDING_REQUEST':
      return {
        ...state,
        isSendingRequest: action.state
      }
    case 'CREATE_PROJECT_SUCCESS':
      return {
        ...state,
        isSendingRequest: false,
        showListPages: true,
        project: action.newProject
      }
    case 'SET_LIST_PAGES':
      return {
        ...state,
        pages: action.pages
      }
    case 'SET_SELECTED_PAGES':
      return {
        ...state,
        selectedPages: action.selectedPages
      }
    case 'SET_LOADING_STATUS':
      return {
        ...state,
        loadingStatus: action.loadingStatus
      }
    case 'RESET_MODAL_STATE':
      return {
        ...state,
        modalIsShown: false,
        showListPages: false,
        isSendingRequest: false,
        project: null,
        pages: null,
        selectedPages: null,
        loadingStatus: ''
      }
    default:
      return state;
  }
}

export default project;
