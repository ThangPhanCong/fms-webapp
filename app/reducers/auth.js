import {
  VERIFY_ACCESS_TOKEN_LOADING,
  VERIFY_ACCESS_TOKEN_LOADED,
  LOG_OUT
} from '../actions/auth';

const initState = {
  isLoading: true,
  isAuthenticated: false,
  user: null
};

const authReducer = (state = initState, action) => {
  switch(action.type) {
    case VERIFY_ACCESS_TOKEN_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case VERIFY_ACCESS_TOKEN_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: action.isAuthenticated,
        user: action.user
      };
    case LOG_OUT:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

export default authReducer;
