let _filters = [
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
];

const initState = {
  filters: _filters,
  tags: [],
  searchText: ""
}

const filters = (state = initState, action) => {
  switch (action.type) {
    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.filters
      }
    case 'SET_TAGS':
      return {
        ...state,
        tags: action.tags
      }
    case 'SET_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.searchText
      }
    case 'RESET_INIT_STATE_FILTERS':
      return initState;
    default:
      return state;
  }
}

export default filters;
