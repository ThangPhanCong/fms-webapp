import { SET_FILTERS, SET_TAGS, SET_SEARCH_TEXT } from '../../actions/dashboard/filters';

let _filters = [
  {
    type: 'all',
    isActive: true,
    filterFunc: function (item) {
      return true;
    }
  },
  {
    type: 'unread',
    isActive: false,
    filterFunc: function (item) {
      return item.is_seen == false;
    }
  },
  {
    type: 'comment',
    isActive: false,
    filterFunc: function (item) {
      return item.type == 'comment';
    }
  },
  {
    type: 'inbox',
    isActive: false,
    filterFunc: function (item) {
      return item.type == 'inbox';
    }
  }
];

const initState = {
  filters: _filters,
  tags: [],
  searchText: null
}

const filters = (state = initState, action) => {
  switch (action.type) {
    case SET_FILTERS:
      return {
        ...state,
        filters: action.filters
      }
    case SET_TAGS:
      return {
        ...state,
        tags: action.tags
      }
    case SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.searchText
      }
    default:
      return state;
  }
}

export default filters;
