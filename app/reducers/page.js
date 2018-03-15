
import {
  PAGES_LOADIND,
  PAGES_LOADED
} from '../actions/page'

const initState = {
  isPagesLoading: true,
  pages: []
};

const page = (state = initState, action) => {
  switch (action.type) {
    case PAGES_LOADIND:
      return {
        ...state,
        isPagesLoading: true
      };
    case PAGES_LOADED:
      return {
        ...state,
        isPagesLoading: false,
        pages: action.pages
      };
    default:
      return state;
  }
};

export default page;
