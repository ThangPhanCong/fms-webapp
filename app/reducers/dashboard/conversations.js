const initState = {
    isLoadingConversations: true,
    conversations: [],
    pagingConversations: null,
    countUnreadComments: 0,
    countUnreadInboxes: 0
};

const conversations = (state = initState, action) => {
    switch (action.type) {
        case 'LOADING_CONVERSATIONS':
            return {
                ...state,
                isLoadingConversations: action.state
            };
        case 'SET_UNREAD_COMMENTS':
            return {
                ...state,
                countUnreadComments: action.state < 0 ? 0 : action.state
            };
        case 'SET_UNREAD_INBOXES':
            return {
                ...state,
                countUnreadInboxes: action.state < 0 ? 0 : action.state
            };
        case 'SET_CONVERSATIONS':
            return {
                ...state,
                conversations: action.conversations,
                pagingConversations: action.pagingConversations,
                isLoadingConversations: false
            };
        case 'COMPLETE_GET_CONVERSATIONS':
            return {
                ...state,
                pagingConversations: action.pagingConversations,
                conversations: action.conversations,
                isLoadingConversations: false
            };
        case 'RESET_INIT_STATE_CONVERSATIONS':
            return {
                isLoadingConversations: true,
                conversations: [],
                pagingConversations: null,
                countUnreadComments: 0,
                countUnreadInboxes: 0
            };
        default:
            return state;
    }
};

export default conversations;
