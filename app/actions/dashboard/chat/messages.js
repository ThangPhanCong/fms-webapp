import DashboardApi from '../../../api/DashboardApi';
import * as u from 'lodash';


export const setConversation = (conversation) => dispatch => {
  dispatch({ type: 'SET_CONVERSATION', conversation: conversation });
}
export const isLoadingMsgs = (state) => dispatch => {
  dispatch({ type: 'LOADING_MSGS', state });
}
export const isLoadMoreMsgs = (state) => dispatch => {
  dispatch({ type: 'LOAD_MORE_MSGS', state });
}
export const setPostInfo = (postInfo) => dispatch => {
  dispatch({ type: 'SET_POST_INFO', postInfo: postInfo });
}
export const resetChat = () => dispatch => {
  dispatch({ type: 'RESET_INIT_STATE_CHAT' });
}

export const loadPostInfo = () => (dispatch, getState) => {
  let { chat } = getState().dashboard;
  let conversation = chat.conversation;
  if (!chat.postInfo && conversation.type == "comment") {
    dispatch(isLoadMoreMsgs(true));
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
  if (chat.isLoadingMsgs || chat.isLoadMoreMsgs) return;
  if (conv.type == "comment" && conv.paging) {
    dispatch(isLoadMoreMsgs(true));
    DashboardApi.getReplyComment(conv.fb_id, conv.paging).then((res) => {
      let paging = (res.paging) ? res.paging.next : null
      dispatch(isLoadMoreMsgs(false));
      dispatch(displayMoreMessages(res.data, paging));
    }, (err) => {
      console.log(err);
      dispatch(isLoadMoreMsgs(false));
    });
  } else if (conv.paging) {
    dispatch(isLoadMoreMsgs(true));
    DashboardApi.getMessageInbox(conv._id, conv.paging).then((res) => {
      let paging = (res.paging) ? res.paging.next : null;
      dispatch(isLoadMoreMsgs(false));
      dispatch(displayMoreMessages(res.data, paging));
    }, (err) => {
      console.log(err);
      dispatch(isLoadMoreMsgs(false));
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

	// reloadAttachment(msgs) {
	// 	msgs.forEach((msg) => {
	// 		if (msg.shares) {
	// 			DashboardApi.getMessageShare(msg.fb_id, msg.page_fb_id).then((res) => {
	// 				msg.shares = res.data.shares;
	// 			}, (err) => {
	// 				throw new Error(err);
	// 			});
	// 		} else if (msg.attachment && (msg.attachment.type == 'sticker' || msg.attachment.type == 'photo' ||
	// 			msg.attachment.type == 'video_inline' || msg.attachment.type == 'share')) {
	// 			DashboardApi.getCommentAttachment(msg.fb_id, msg.page_fb_id).then((res) => {
	// 				msg.attachment = res.data.attachment;
	// 			}, (err) => {
	// 				throw new Error(err);
	// 			});
	// 		} else if (msg.attachments) {
	// 			DashboardApi.getMessageAttachment(msg.fb_id, msg.page_fb_id).then((res) => {
	// 				msg.attachments = res.data.attachments;
	// 			}, (err) => {
	// 				throw new Error(err);
	// 			});
	// 		}
	// 	});
	// }