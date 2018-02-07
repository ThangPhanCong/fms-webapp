const initState = {
    filters: [
        {
            type: 'all',
            isActive: true
        },
        {
            type: 'unread',
            isActive: false,
            isTag: true
        },
        {
            type: 'comment',
            isActive: false
        },
        {
            type: 'inbox',
            isActive: false
        }
    ],
    tags: [],
    searchText: ""
};

const filters = (state = initState, action) => {
    switch (action.type) {
        case 'SET_FILTERS':
            return {
                ...state,
                filters: action.filters
            };
        case 'SET_TAGS':
            return {
                ...state,
                tags: action.tags
            };
        case 'SET_SEARCH_TEXT':
            return {
                ...state,
                searchText: action.searchText
            };
        case 'RESET_INIT_STATE_FILTERS':
            return {
                filters: [
                    {
                        type: 'all',
                        isActive: true
                    },
                    {
                        type: 'unread',
                        isActive: false
                    },
                    {
                        type: 'comment',
                        isActive: false
                    },
                    {
                        type: 'inbox',
                        isActive: false
                    }
                ],
                tags: [],
                searchText: ""
            };
        default:
            return state;
    }
};

export default filters;
