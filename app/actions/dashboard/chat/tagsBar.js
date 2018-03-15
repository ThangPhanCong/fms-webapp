import TagApi from '../../../api/TagApi';
import {setConversations} from '../conversations';
import {setConversation} from './messages';

export const isSettingTagConversation = (state) => dispatch => {
  dispatch({type: 'SETTING_TAG', isSettingTag: state});
};

export const updateTagsConversation = (tags, conversation_id) => (dispatch, getState) => {
  let {conversations} = getState().dashboard.conversations;
  conversations.forEach((convers) => {
    if (convers.id === conversation_id) convers.tags = tags;
  });
  dispatch(setConversations([...conversations]));
  let {conversation} = getState().dashboard.chat;
  conversation.tags = tags;
  dispatch(setConversation({...conversation}));
};

export const handleTagClick = (alias, tag_id) => (dispatch, getState) => {
  let {isSettingTag} = getState().dashboard.chat;
  let {conversation} = getState().dashboard.chat;
  if (isSettingTag === true) return;
  let selectedTag = conversation.tags.filter((tag) => {
    return tag._id === tag_id
  });
  dispatch(isSettingTagConversation(true));
  if (selectedTag.length === 0) {
    TagApi.createTagConversation(conversation.id, tag_id)
      .then((res) => {
        dispatch(updateTagsConversation(res.tags, conversation.id));
        dispatch(isSettingTagConversation(false));
      }, (err) => {
        dispatch(isSettingTagConversation(false));
        alert('Tạo tag thất bại');
        throw new Error(err);
      });
  } else {
    TagApi.deleteTagConversation(alias, conversation.id, tag_id)
      .then((res) => {
        dispatch(updateTagsConversation(res.tags, conversation.id));
        dispatch(isSettingTagConversation(false));
      }, (err) => {
        dispatch(isSettingTagConversation(false));
        alert('Xóa tag thất bại');
        throw new Error(err);
      });
  }
};