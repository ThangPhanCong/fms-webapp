import DashboardApi from '../../../api/DashboardApi';
import fileApi from '../../../api/FileApi';

import { updateMsgInConversation } from '../dashboard';

export const postRepMsg = (conversation, message) => (dispatch, getState) => {
  function createTempMsg(fb_id, msg, conversation) {
    let itemMsg = {
      fb_id,
      message: msg,
      from: {
        fb_id: conversation.page_fb_id,
        name: conversation.customer.name
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
  let { conversation } = getState().dashboard.chat;
  dispatch(postRepMsg(conversation, msg));
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
      let { conversation } = getState().dashboard.chat;
      return DashboardApi.postRepCmtMsg(conversation._id, null, s3Url);
    })
    .catch(err => console.log(err.message))
}
