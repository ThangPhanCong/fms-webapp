import {
  POSTS_LOADING,
  POSTS_LOADED,
  MORE_POSTS_LOADING,
  MORE_POSTS_LOADED
} from '../actions/post';

const initState = {
  isPostsLoading: true,
  posts: [],
  paging: {
    next: null
  },
  isMorePostsLoading: false
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case POSTS_LOADING:
      return {
        ...state,
        isPostsLoading: true
      };
    case POSTS_LOADED:
      return {
        ...state,
        isPostsLoading: false,
        posts: action.posts,
        paging: action.paging
      };
    case MORE_POSTS_LOADING:
      return {
        ...state,
        isMorePostsLoading: true
      };
    case MORE_POSTS_LOADED:
      return {
        ...state,
        isMorePostsLoading: false,
        posts: state.posts.concat(action.posts),
        paging: action.paging
      };
    case 'SET_POSTS':
      return {
        ...state,
        posts: action.posts
      }
    default:
      return state;
  }
};

export default postReducer;
