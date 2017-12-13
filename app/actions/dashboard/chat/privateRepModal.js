import DashboardAPI from '../../../api/DashboardApi';
import * as u from 'lodash';
import {setConversation} from './messages';

export const openPrivateRepModal = (message) => dispatch => {
  dispatch({type: 'OPEN_PRIVATE_REP_MODAL', message});
};
export const closePrivateRepModal = () => dispatch => {
  dispatch({type: 'CLOSE_PRIVATE_REP_MODAL'});
};
export const isSendingPrivateRepMsg = (state) => dispatch => {
  dispatch({type: 'SENDING_PRIVATE_REP_MSG', state});
};

export const sendPrivateRepMsg = (msgId, content) => (dispatch, getState) => {
  if (content && content !== "") {
    dispatch(isSendingPrivateRepMsg(true));
    DashboardAPI.postPrivateReplyMessage(msgId, content).then(() => {
      dispatch(closePrivateRepModal());
      let {conversation} = getState().dashboard.chat;
      conversation.children.forEach(msg => {
        if (msg._id === msgId) return msg.can_reply_privately = false;
      });
      dispatch(setConversation(u.clone(conversation)));
      dispatch(isSendingPrivateRepMsg(false));
    }, (err) => {
      dispatch(isSendingPrivateRepMsg(false));
      alert("Không thể gửi tin nhắn");
      throw new Error(err);
    })
  }
};