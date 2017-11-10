import DashboardAPI from '../../../api/DashboardApi';
import { setConversations } from '../../../actions/dashboard/conversations';
import { setSelectedConversation } from '../../../actions/dashboard/selectedConversation/chatArea';
import * as _ from 'lodash';

export const IS_HANDLING = 'IS_HANDLING';

export const setHandlingState = (state) => dispatch => {
  dispatch({ type: IS_HANDLING, isHandling: state });
}

export const updateTagsConversation = (tags, conversation_id) => (dispatch, getState) => {
  let newConversations = getState().dashboard.conversations.conversations;
  newConversations.forEach((convers) => {
    if (convers.id == conversation_id) {
      convers.tags = tags;
    }
  });
  dispatch(setConversations(_.clone(newConversations)));
  let selectedConversation = getState().dashboard.selectedConversation.chatArea.conversation;
  selectedConversation.tags = tags;
  dispatch(setSelectedConversation(_.clone(selectedConversation)));
}

export const handleTagClick = (alias, tag_id, tag_name) => (dispatch, getState) => {
  let { isHandling } = getState().dashboard.selectedConversation.tagsBar;
  let selectedConversation = getState().dashboard.selectedConversation.chatArea.conversation;
  if (isHandling == true) return;
  let selectedTag = selectedConversation.tags.filter((tag) => {
    return tag._id == tag_id
  });
  dispatch(setHandlingState(true));
  if (selectedTag.length == 0) {
    DashboardAPI.createTagConversation(alias, selectedConversation.id, tag_id)
      .then((res) => {
        dispatch(updateTagsConversation(res.tags, selectedConversation.id));
        dispatch(setHandlingState(false));
      }, (err) => {
        dispatch(setHandlingState(false));
        alert('Xóa tag thất bại');
        throw new Error(err);
      });
  } else {
    DashboardAPI.deleteTagConversation(alias, selectedConversation.id, tag_id)
      .then((res) => {
        dispatch(updateTagsConversation(res.tags, selectedConversation.id));
        dispatch(setHandlingState(false));
      }, (err) => {
        dispatch(setHandlingState(false));
        alert('Xóa tag thất bại');
        throw new Error(err);
      });
  }
}