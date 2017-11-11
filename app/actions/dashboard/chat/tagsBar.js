import DashboardAPI from '../../../api/DashboardApi';
import { setConversations } from '../conversations';
import { setConversation } from './messages';
import * as u from 'lodash';


export const settingTagConversation = (state) => dispatch => {
  dispatch({ type: 'SETTING_TAG', settingTag: state });
}

export const updateTagsConversation = (tags, conversation_id) => (dispatch, getState) => {
  let { conversations } = getState().dashboard.conversations;
  conversations.forEach((convers) => {
    if (convers.id == conversation_id) convers.tags = tags;
  });
  dispatch(setConversations(u.clone(conversations)));
  let { conversation } = getState().dashboard.chat;
  conversation.tags = tags;
  dispatch(setConversation(u.clone(conversation)));
}

export const handleTagClick = (alias, tag_id, tag_name) => (dispatch, getState) => {
  let { settingTag } = getState().dashboard.chat;
  let { conversation } = getState().dashboard.chat;
  if (settingTag == true) return;
  let selectedTag = conversation.tags.filter((tag) => {
    return tag._id == tag_id
  });
  dispatch(settingTagConversation(true));
  if (selectedTag.length == 0) {
    DashboardAPI.createTagConversation(alias, conversation.id, tag_id)
      .then((res) => {
        dispatch(updateTagsConversation(res.tags, conversation.id));
        dispatch(settingTagConversation(false));
      }, (err) => {
        dispatch(settingTagConversation(false));
        alert('Xóa tag thất bại');
        throw new Error(err);
      });
  } else {
    DashboardAPI.deleteTagConversation(alias, conversation.id, tag_id)
      .then((res) => {
        dispatch(updateTagsConversation(res.tags, conversation.id));
        dispatch(settingTagConversation(false));
      }, (err) => {
        dispatch(settingTagConversation(false));
        alert('Xóa tag thất bại');
        throw new Error(err);
      });
  }
}