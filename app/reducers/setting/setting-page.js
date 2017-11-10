import {
  IS_EDITTING,
  SET_SELECTED_PAGES,
  IS_SHOW_MODAL,
  SET_SELECTED_PAGES_MODAL,
  START_SENDING_REQUEST,
  COMPLETE_SENDING_REQUEST,
  SET_LOADING_STATUS,
  PAGES_LOADED,
  ALL_PAGES_LOADED,
  PAGES_MODAL_LOADED
} from '../../actions/setting/setting-page';


const initState = {
  isEditting: false,
  isShowModal: false,
  selectedPages: [],
  selectedPagesModal: [],
  isSendingRequest: false,
  loadingStatus: "",
  pages: [],
  pagesModal: []
}

const settingReducer = (state = initState, action) => {
  switch (action.type) {
    case IS_EDITTING:
      return {
        ...state,
        isEditting: true
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
    case SET_LOADING_STATUS:
      return {
        ...state,
        loadingStatus: action.loadingStatus
      }
    case SET_SELECTED_PAGES:
      return {
        ...state,
        selectedPages: action.selectedPages
      }
    case IS_SHOW_MODAL:
      return {
        ...state,
        isShowModal: !state.isShowModal
      }

    case SET_SELECTED_PAGES_MODAL:
      return {
        ...state,
        selectedPagesModal: action.selectedPagesModal
      }
      case PAGES_LOADED:
        return {
          ...state,
          pages: action.pages
        }
      case PAGES_MODAL_LOADED:
        return {
          ...state,
          pagesModal: action.pagesModal
        }
    default:
      return state;
  }
}

export default settingReducer;
