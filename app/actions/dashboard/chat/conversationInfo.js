import DashboardApi from '../../../api/DashboardApi';
import * as u from 'lodash';
import { setConversations } from '../conversations';
import { setConversation } from './messages';

export const blockPerson = (state) => (dispatch, getState) => {
  let { conversation } = getState().dashboard.chat;
  let customer = (conversation.customer) ? conversation.customer : conversation.from;
  DashboardApi.blockCustomer(conversation.page_fb_id, customer.fb_id, state)
    .then(data => {
      dispatch(updateBlockCustomer(conversation, true));
    })
    .catch(err => {
      alert(err.message);
    })
}

export const updateBlockCustomer = (cv, is_blocked) => (dispatch, getState) => {
  cv.customer.is_blocked = is_blocked;
  let conversations = getState().dashboard.conversations.conversations.map(_cv => (cv._id == _cv._id) ? cv : _cv);
  dispatch(setConversations(u.clone(conversations)));
  let sc = getState().dashboard.chat.conversation;
  if (sc.fb_id == cv.fb_id) {
    dispatch(setConversation(u.clone(cv)));
  }
}