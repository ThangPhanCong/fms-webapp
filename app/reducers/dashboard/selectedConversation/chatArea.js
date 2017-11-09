import {
  SET_SELECTED_CONVERSATION, START_LOADING_MSGS, COMPLETE_LOADING_MSGS,
  START_LOAD_MORE_MSGS, COMPLETE_LOAD_MORE_MSGS, SET_POST_INFO
} from '../../../actions/dashboard/selectedConversation/chatArea';
import * as redux from 'redux';
import tagsBar from './tagsBar';

const initState = {
  conversation: null,
  isLoadingMsgs: false,
  isLoadMoreMsgs: false,
  postInfo: null
}

const chatArea = (state = initState, action) => {
  switch (action.type) {
    case SET_SELECTED_CONVERSATION:
      return {
        ...state,
        conversation: action.conversation
      }
    case START_LOADING_MSGS:
      return {
        ...state,
        isLoadingMsgs: true
      }
    case COMPLETE_LOADING_MSGS:
      return {
        ...state,
        isLoadingMsgs: false
      }
    case START_LOAD_MORE_MSGS:
      return {
        ...state,
        isLoadMoreMsgs: true
      }
    case COMPLETE_LOAD_MORE_MSGS:
      return {
        ...state,
        isLoadMoreMsgs: false
      }
    case SET_POST_INFO:
      return {
        ...state,
        postInfo: action.postInfo,
        isLoadMoreMsgs: false
      }
    default:
      return state;
  }
}

const selectedConversation = redux.combineReducers({
  chatArea,
  tagsBar
});

export default selectedConversation;
