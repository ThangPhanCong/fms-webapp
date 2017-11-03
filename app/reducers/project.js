import { PROJECTS_LOADIND, PROJECTS_LOADED, OPEN_MODAL, CLOSE_MODAL, 
START_SENDING_REQUEST, COMPLETE_SENDING_REQUEST, SET_PAGES, SET_SELECTED_PAGES, 
SET_LOADING_STATUS, CREATE_PROJECT_SUCCESS, RESET_MODAL_STATE} from '../actions/project';


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

const projectReducer = (state = initState, action) => {
  switch(action.type) {
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
    case OPEN_MODAL:
      return {
        ...state,
        modalIsShown: true
      }
    case CLOSE_MODAL:
      return {
        ...state,
        modalIsShown: false
      }
    case START_SENDING_REQUEST:
      return {
        ...state,
        isSendingRequest: true
      }
    case COMPLETE_SENDING_REQUEST:
      return {
        ...state,
        isSendingRequest: false
      }
    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        isSendingRequest: false,
        showListPages: true,
        project: action.newProject
      }
    case SET_PAGES:
      return {
        ...state,
        pages: action.pages
      }
    case SET_SELECTED_PAGES:
      return {
        ...state,
        selectedPages: action.selectedPages
      }
    case SET_LOADING_STATUS:
      return {
        ...state,
        loadingStatus: action.loadingStatus
      }
    case RESET_MODAL_STATE:
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

export default projectReducer;
