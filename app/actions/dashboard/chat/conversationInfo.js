import blockApi from '../../../api/BlockApi';
import * as u from 'lodash';
import { setConversations } from '../conversations';
import { setConversation } from './messages';

export const blockPerson = () => (dispatch, getState) => {
  let { conversation } = getState().dashboard.chat;
  blockApi.blockCustomer(conversation.page_fb_id, conversation.customer.id)
    .then(data => {
      dispatch(updateBlockCustomer(conversation, true));
    })
    .catch(err => {
      alert(err.message);
    })
}

export const activePerson = () => (dispatch, getState) => {
  let { conversation } = getState().dashboard.chat;
  blockApi.activeCustomer(conversation.page_fb_id, conversation.customer.id)
    .then(data => {
      dispatch(updateBlockCustomer(conversation, false));
    })
    .catch(err => {
      alert(err.message);
    })
}

export const updateBlockCustomer = (cv, is_blocked) => (dispatch, getState) => {
  cv.customer.is_blocked = is_blocked;
  let conversations = getState().dashboard.conversations.conversations.map(_cv => (cv.fb_id == _cv.fb_id) ? cv : _cv);
  dispatch(setConversations(u.clone(conversations)));
  let sc = getState().dashboard.chat.conversation;
  if (sc.fb_id == cv.fb_id) {
    dispatch(setConversation(u.clone(cv)));
  }
}