import * as redux from 'redux';

const initState = {
  conversation: null,
  loadingMsgs: false,
  loadMoreMsgs: false,
  postInfo: null,
  settingTag: false,
  privateRepModalShown: false,
  isSendingPrivateMsg: false
}

const chat = (state = initState, action) => {
  switch (action.type) {
    case 'SET_CONVERSATION':
      return {
        ...state,
        conversation: action.conversation
      }
    case 'LOADING_MSGS':
      return {
        ...state,
        loadingMsgs: action.state
      }
    case 'LOAD_MORE_MSGS':
      return {
        ...state,
        loadMoreMsgs: action.state
      }
    case 'SET_POST_INFO':
      return {
        ...state,
        postInfo: action.postInfo,
        loadMoreMsgs: false
      }
    case 'SETTING_TAG':
      return {
        ...state,
        settingTag: action.state
      }
    case 'TOGGLE_PRIVATE_REP_MODAL':
      return {
        ...state,
        privateRepModalShown: action.state
      }
    case 'SENDING_PRIVATE_REP_MSG':
      return {
        ...state,
        isSendingPrivateMsg: action.state
      }
    default:
      return state;
  }
}

export default chat;
