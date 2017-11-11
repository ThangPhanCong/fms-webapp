const initState = {
  loadMoreConversations: false,
  loadingConversations: true,
  conversations: [],
  pagingConversations: null,
  filteredConversations: []
}

const conversations = (state = initState, action) => {
  switch (action.type) {
    case 'LOAD_MORE_CONVERSATIONS':
      return {
        ...state,
        loadMoreConversations: action.state
      }
    case 'LOADING_CONVERSATIONS':
      return {
        ...state,
        loadingConversations: action.state
      }
    case 'SET_CONVERSATIONS':
      return {
        ...state,
        conversations: action.conversations,
        pagingConversations: (action.pagingConversations) ? action.pagingConversations : null,
        loadMoreConversations: false
      }
    case 'COMPLETE_GET_CONVERSATIONS':
      return {
        ...state,
        pagingConversations: action.pagingConversations,
        conversations: action.conversations,
        loadingConversations: false,
        filteredConversations: action.conversations
      }
    case 'SET_FILTERED_CONVERSATIONS':
      return {
        ...state,
        filteredConversations: action.filteredConversations
      }
    default:
      return state;
  }
}

export default conversations;
