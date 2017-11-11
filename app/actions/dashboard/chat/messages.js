import DashboardApi from '../../../api/DashboardApi';
import * as u from 'lodash';


export const setConversation = (conversation) => dispatch => {
  dispatch({ type: 'SET_CONVERSATION', conversation: conversation });
}
export const loadingMsgs = (state) => dispatch => {
  dispatch({ type: 'LOADING_MSGS', state });
}
export const loadMoreMsgs = (state) => dispatch => {
  dispatch({ type: 'LOAD_MORE_MSGS', state });
}
export const setPostInfo = (postInfo) => dispatch => {
  dispatch({ type: 'SET_POST_INFO', postInfo: postInfo });
}

export const loadPostInfo = () => (dispatch, getState) => {
  let { chat } = getState().dashboard;
  let conversation = chat.conversation;
  if (!chat.postInfo && conversation.type == "comment") {
    dispatch(loadMoreMsgs(true));
    DashboardApi.getPostInfo(conversation.parent_fb_id).then((res) => {
      dispatch(setPostInfo(res));
    }, (err) => {
      console.log(err);
      dispatch(setPostInfo("not found"));
    });
  }
}

export const loadMoreMessages = () => (dispatch, getState) => {
  let { chat } = getState().dashboard;
  let conv = chat.conversation;
  if (chat.loadingMsgs || chat.loadMoreMsgs) return;
  if (conv.type == "comment" && conv.paging) {
    dispatch(loadMoreMsgs(true));
    DashboardApi.getReplyComment(conv.fb_id, conv.paging).then((res) => {
      let paging = (res.paging) ? res.paging.next : null
      dispatch(loadMoreMsgs(false));
      dispatch(displayMoreMessages(res.data, paging));
    }, (err) => {
      console.log(err);
      dispatch(loadMoreMsgs(false));
    });
  } else if (conv.paging) {
    dispatch(loadMoreMsgs(true));
    DashboardApi.getMessageInbox(conv._id, conv.paging).then((res) => {
      let paging = (res.paging) ? res.paging.next : null;
      dispatch(loadMoreMsgs(false));
      dispatch(displayMoreMessages(res.data, paging));
    }, (err) => {
      console.log(err);
      dispatch(loadMoreMsgs(false));
    });
  } else if (conv.type == "comment" && conv.parent_fb_id) {
    dispatch(loadPostInfo());
  } else if (conv.type == "inbox") {
    let pageInfo = { message: " " };
    dispatch(setPostInfo(pageInfo));
  }
}

export const displayMoreMessages = (more, paging) => (dispatch, getState) => {
  let { conversation } = getState().dashboard.chat;
  let oldChildren = conversation.children;
  let children = more.sort((a, b) => {
    let t1, t2;
    if (conversation.type == "comment") {
      t1 = new Date(a.created_time);
      t2 = new Date(b.created_time);
    } else {
      t1 = new Date(a.updated_time);
      t2 = new Date(b.updated_time);
    }
    return t2 - t1;
  });
  //this.reloadAttachment(children);
  children = children.concat(oldChildren);
  conversation.children = children;
  conversation.paging = paging;
  dispatch(setConversation(u.clone(conversation)));
}