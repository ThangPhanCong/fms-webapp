const initState = {
    alias: null,
    isLoadingConversations: true,
    conversations: [],
    pagingConversations: null,
    isUnreadComments: false,
    isUnreadInboxes: false
};

const conversations = (state = initState, action) => {
    switch (action.type) {
        case 'LOADING_CONVERSATIONS':
            return {
                ...state,
                isLoadingConversations: action.state
            };
        case 'IS_UNREAD_COMMENTS':
            return {
                ...state,
                isUnreadComments: action.state,
            };
        case 'IS_UNREAD_INBOXES':
            return {
                ...state,
                isUnreadInboxes: action.state
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
        case 'SET_ALIAS':
            return {
                ...state,
                alias: action.alias
            };
        case 'RESET_INIT_STATE_CONVERSATIONS':
            return {
                ...state,
                isLoadingConversations: true,
                conversations: [],
                pagingConversations: null
            };
        default:
            return state;
    }
};

export default conversations;
