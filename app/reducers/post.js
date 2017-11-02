import {
  POSTS_LOADING,
  POSTS_LOAD_MORE
} from '../actions/post';

const initState = {
  isPostsLoading: true,
  posts: [],
  next: null
}

const postReducer = (state = initState, action) => {
  switch(action.type) {
    case POSTS_LOADING:
      return {
        ...state,
        isPostsLoading: !state.isPostsLoading
      }
    case POSTS_LOAD_MORE:
      return {
        ...state,
        posts: state.posts.concat(action.posts),
        next: action.next
      }
    default:
      return state;
  }
}

export default postReducer;
