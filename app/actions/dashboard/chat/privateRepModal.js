import DashboardAPI from '../../../api/DashboardApi';

export const togglePrivateRepModal = (state) => dispatch => {
  dispatch({ type: 'TOGGLE_PRIVATE_REP_MODAL', state});
}
export const isSendingPrivateRepMsg = (state) => dispatch => {
  dispatch({ type: 'SENDING_PRIVATE_REP_MSG', state});
}

export const sendPrivateRepMsg = (msgId, message, handleSendMessage) => dispatch => {
  if (message && message != "") {
    dispatch(isSendingPrivateRepMsg(true));
    DashboardAPI.postPrivateReplyMessage(msgId, message).then((res) => {
      dispatch(togglePrivateRepModal(false));
      handleSendMessage();
      dispatch(isSendingPrivateRepMsg(false));
    }, (err) => {
      dispatch(isSendingPrivateRepMsg(false));
      alert("Không thể gửi tin nhắn");
      throw new Error(err);
    })
  }
}