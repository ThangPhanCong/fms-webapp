import {
  START_LOAD_MORE_CONVERS, COMPLETE_LOAD_MORE_CONVERS, START_LOADING_CONVERS, COMPLETE_LOADING_CONVERS,
  SET_CONVERSATIONS, SET_FILTERED_CONVERSATIONS, COMPLETE_GET_CONVERSATIONS
} from '../../actions/dashboard/conversations';

const initState = {
  isLoadMoreConvers: false,
  isLoadingConvers: true,
  conversations: [],
  paging: null,
  filteredConversations: []
}

const conversations = (state = initState, action) => {
  switch (action.type) {
    case START_LOAD_MORE_CONVERS:
      return {
        ...state,
        isLoadMoreConvers: true
      }
    case COMPLETE_LOAD_MORE_CONVERS:
      return {
        ...state,
        isLoadMoreConvers: false
      }
    case START_LOADING_CONVERS:
      return {
        ...state,
        isLoadingConvers: true
      }
    case COMPLETE_LOADING_CONVERS:
      return {
        ...state,
        isLoadingConvers: false
      }
    case SET_CONVERSATIONS:
      return {
        ...state,
        conversations: action.conversations,
        paging: (action.paging) ? action.paging : null,
        isLoadMoreConvers: false
      }
    case COMPLETE_GET_CONVERSATIONS:
      return {
        ...state,
        paging: action.paging,
        conversations: action.conversations,
        isLoadingConvers: false,
        filteredConversations: action.conversations
      }
    case SET_FILTERED_CONVERSATIONS:
      return {
        ...state,
        filteredConversations: action.filteredConversations
      }
    default:
      return state;
  }
}

export default conversations;
