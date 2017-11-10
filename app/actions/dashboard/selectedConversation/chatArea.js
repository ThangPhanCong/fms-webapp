import DashboardApi from '../../../api/DashboardApi';
import fileApi from '../../../api/FileApi';
import { updateMsgInConversation, setConversations } from '../conversations';

export const SET_SELECTED_CONVERSATION = 'SET_SELECTED_CONVERSATION';
export const START_LOADING_MSGS = 'START_LOADING_MSGS';
export const COMPLETE_LOADING_MSGS = 'COMPLETE_LOADING_MSG';
export const START_LOAD_MORE_MSGS = 'START_LOAD_MORE_MSGS';
export const COMPLETE_LOAD_MORE_MSGS = 'COMPLETE_LOAD_MORE_MSGS';
export const SET_POST_INFO = 'SET_POST_INFO';

///////////////////////////////////////////////////////////////////////
export const setSelectedConversation = (conversation) => dispatch => {
  dispatch({ type: SET_SELECTED_CONVERSATION, conversation: conversation });
}
export const startLoadingMsgs = () => dispatch => {
  dispatch({ type: START_LOADING_MSGS });
}
export const completeLoadingMsgs = () => dispatch => {
  dispatch({ type: COMPLETE_LOADING_MSGS });
}
export const startLoadMoreMsgs = () => dispatch => {
  dispatch({ type: START_LOAD_MORE_MSGS });
}
export const completeLoadMoreMsgs = () => dispatch => {
  dispatch({ type: COMPLETE_LOAD_MORE_MSGS });
}
export const setPostInfo = (postInfo) => dispatch => {
  dispatch({ type: SET_POST_INFO, postInfo: postInfo });
}


//////////////////////Message Form/////////////////////////////////////
export const postRepMsg = (conversation, message) => (dispatch, getState) => {
  function createTempMsg(fb_id, msg, conversation) {
    let itemMsg = {
      fb_id,
      message: msg,
      from: {
        id: conversation.page_fb_id
      },
      updated_time: Date.now(),
      created_time: Date.now(),
      parent: conversation
    }
    return itemMsg;
  }
  if (conversation.type == 'inbox') {
    DashboardApi.postRepInboxMsg(conversation._id, message)
      .then(data => {
        let msgInbox = createTempMsg(data.id, message, conversation);
        dispatch(updateMsgInConversation(msgInbox));
      })
      .catch(err => alert(err.message));
  } else if (conversation.type == 'comment') {
    DashboardApi.postRepCmtMsg(conversation._id, message)
      .then(data => {
        let msgInbox = createTempMsg(data.id, message, conversation);
        dispatch(updateMsgInConversation(msgInbox));
      })
      .catch(err => alert(err.message));
  }
}

export const sendMessage = (msg) => (dispatch, getState) => {
  let _selectedConversation = getState().dashboard.selectedConversation.chatArea.conversation;
  dispatch(postRepMsg(_selectedConversation, msg));
}

export const handleFormSubmit = (e, msg) => dispatch => {
  e.preventDefault();
  if (msg.value != '') dispatch(sendMessage(msg.value));
  msg.value = '';
}

export const handleFileChange = (e) => (dispatch, getState) => {
  let files = e.target.files || e.dataTransfer.files;
  if (!files) return;
  let file = files[0]
  let s3Url;
  fileApi.getS3SigningRequest(file.name, file.type)
    .then(data => {
      let signedRequest = data.signedRequest;
      s3Url = data.url;
      return fileApi.uploadFileToS3(file, signedRequest);
    })
    .then(() => {
      let selectedConversation = getState().dashboard.selectedConversation.chatArea.conversation;
      return DashboardApi.postRepCmtMsg(selectedConversation._id, null, s3Url);
    })
    .catch(err => console.log(err.message))
}

//////////////////Chat area //////////////////////////////////////////////////////
export const loadPostInfo = () => (dispatch, getState) => {
  let sc = getState().dashboard.selectedConversation.chatArea;
  let selectedConversation = sc.conversation;
  if (!sc.postInfo && selectedConversation.type == "comment") {
    dispatch(startLoadMoreMsgs());
    DashboardApi.getPostInfo(selectedConversation.parent_fb_id).then((res) => {
      dispatch(setPostInfo(res));
    }, (err) => {
      console.log(err);
      dispatch(setPostInfo("not found"));
    });
  }
}

export const loadMoreMessages = () => (dispatch, getState) => {
  let sc = getState().dashboard.selectedConversation.chatArea;
  let current = sc.conversation;
  if (sc.isLoadingMsgs || sc.isLoadMoreMsgs) return;
  if (current.type == "comment" && current.paging) {
    dispatch(startLoadMoreMsgs());
    DashboardApi.getReplyComment(current.fb_id, current.paging).then((res) => {
      let paging = (res.paging) ? res.paging.next : null
      dispatch(completeLoadMoreMsgs());
      this.props.displayMoreMessages(res.data, paging);
    }, (err) => {
      console.log(err);
      dispatch(completeLoadMoreMsgs());
    });
  } else if (current.paging) {
    dispatch(startLoadMoreMsgs());
    DashboardApi.getMessageInbox(current._id, current.paging).then((res) => {
      let paging = (res.paging) ? res.paging.next : null;
      dispatch(completeLoadMoreMsgs());
      dispatch(displayMoreMessages(res.data, paging));
    }, (err) => {
      console.log(err);
      dispatch(completeLoadMoreMsgs());
    });
  } else if (current.type == "comment" && current.parent_fb_id) {
    dispatch(loadPostInfo());
  } else if (current.type == "inbox") {
    let pageInfo = { message: " " };
    dispatch(setPostInfo(pageInfo));
  }
}

export const displayMoreMessages = (more, paging) => (dispatch, getState) => {
  let newConversation = getState().dashboard.selectedConversation.chatArea.conversation;
  let oldChildren = newConversation.children;
  let children = more.sort((a, b) => {
    let t1, t2;
    if (newConversation.type == "comment") {
      t1 = new Date(a.created_time);
      t2 = new Date(b.created_time);
    } else {
      t1 = new Date(a.updated_time);
      t2 = new Date(b.updated_time);
    }
    return t2 - t1;
  });
  //this.reloadAttachment(children);
  if (oldChildren) {
    oldChildren.forEach((child) => {
      children.push(child);
    });
  }
  newConversation.children = children;
  newConversation.paging = paging;
  dispatch(setSelectedConversation(newConversation));
}

////////////////Information conversation ////////////////////////////////////////
export const blockPerson = () => (dispatch, getState) => {
  let selectedConv = getState().dashboard.selectedConversation.chatArea.conversation;
  blockApi.blockCustomer(selectedConv.page_fb_id, selectedConv.customer.id)
    .then(data => {
      dispatch(updateBlockCustomer(selectedConv, true));
    })
    .catch(err => {
      alert(err.message);
    })
}

export const activePerson = () => (dispatch, getState) => {
  let selectedConv = getState().dashboard.selectedConversation.chatArea.conversation;
  blockApi.activeCustomer(selectedConv.page_fb_id, selectedConv.customer.id)
    .then(data => {
      dispatch(updateBlockCustomer(selectedConv, false));
    })
    .catch(err => {
      alert(err.message);
    })
}

export const updateBlockCustomer = (cv, is_blocked) => (dispatch, getState) => {
  cv.customer.is_blocked = is_blocked;
  let _conversations = getState().dashboard.conversations.conversations.map(_cv => (cv.fb_id == _cv.fb_id) ? cv : _cv);
  dispatch(setConversations(_conversations));
  let sc = getState().dashboard.selectedConversation.chatArea.conversation;
  if (sc.fb_id == cv.fb_id) {
    dispatch(setSelectedConversation(cv));
  }
}