import { IS_HANDLING } from '../../../actions/dashboard/selectedConversation/tagsBar';

const initState = {
  isHandling: false
}

const tagsBar = (state = initState, action) => {
  switch (action.type) {
    case IS_HANDLING:
      return {
        ...state,
        isHandling: action.isHandling
      }
    default:
      return state;
  }
}

export default tagsBar;
