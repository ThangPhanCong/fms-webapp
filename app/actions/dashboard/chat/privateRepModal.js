import DashboardAPI from '../../../api/DashboardApi';

export const togglePrivateRepModal = (state) => dispatch => {
  dispatch({ type: 'TOGGLE_PRIVATE_REP_MODAL', state});
}
export const sendingPrivateRepMsg = (state) => dispatch => {
  dispatch({ type: 'SENDING_PRIVATE_REP_MSG', state});
}

export const sendPrivateRepMsg = (msgId, message, handleSendMessage) => dispatch => {
  if (message && message != "") {
    dispatch(sendingPrivateRepMsg(true));
    DashboardAPI.postPrivateReplyMessage(msgId, message).then((res) => {
      dispatch(togglePrivateRepModal(false));
      handleSendMessage();
      tdispatch(sendingPrivateRepMsg(false));
    }, (err) => {
      tdispatch(sendingPrivateRepMsg(false));
      alert("Không thể gửi tin nhắn");
      throw new Error(err);
    })
  }
}