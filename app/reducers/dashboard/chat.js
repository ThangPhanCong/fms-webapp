const initState = {
  conversation: null,
  isLoadingMsgs: false,
  isLoadMoreMsgs: false,
  postInfo: null,
  isSettingTag: false,
  scrollList: null,
  isShownPrivateRepModal: false,
  isSendingPrivateMsg: false,
  parentMsgModal: null,
  isShownNewMsgNoti: false
};

const chat = (state = initState, action) => {
  switch (action.type) {
    case 'SET_CONVERSATION':
      return {
        ...state,
        conversation: action.conversation
      };
    case 'LOADING_MSGS':
      return {
        ...state,
        isLoadingMsgs: action.state
      };
    case 'LOAD_MORE_MSGS':
      return {
        ...state,
        isLoadMoreMsgs: action.state
      };
    case 'SET_POST_INFO':
      return {
        ...state,
        postInfo: action.postInfo,
        isLoadMoreMsgs: false
      };
    case 'SET_SCROLL_LIST':
      return {
        ...state,
        scrollList: action.scrollList
      };
    case 'SETTING_TAG':
      return {
        ...state,
        isSettingTag: action.state
      };
    case 'OPEN_PRIVATE_REP_MODAL':
      return {
        ...state,
        isShownPrivateRepModal: true,
        parentMsgModal: action.message
      };
    case 'CLOSE_PRIVATE_REP_MODAL':
      return {
        ...state,
        isShownPrivateRepModal: false
      };
    case 'SENDING_PRIVATE_REP_MSG':
      return {
        ...state,
        isSendingPrivateMsg: action.state
      };
    case 'IS_SHOWN_NEW_MSG_NOTI':
      return {
        ...state,
        isShownNewMsgNoti: action.state
      };
    case 'RESET_INIT_STATE_CHAT':
      return {
        conversation: null,
        isLoadingMsgs: false,
        isLoadMoreMsgs: false,
        postInfo: null,
        isSettingTag: false,
        isShownPrivateRepModal: false,
        isSendingPrivateMsg: false,
        parentMsgModal: null
      };
    default:
      return state;
  }
};

export default chat;
