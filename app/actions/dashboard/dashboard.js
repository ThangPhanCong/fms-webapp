import * as socket from '../../socket';
import projectApi from '../../api/ProjectApi';
import * as u from 'lodash';

import { setConversation } from './chat/messages';
import { setConversations, getConversations, postSeenCv } from './conversations';

export const getProject = (alias) => dispatch => {
  const _updateMsgInConversation = (msg) => {
    console.log('_updateMsgInConversation', msg);
    dispatch(updateMsgInConversation(msg));
  }
  projectApi.getProject(alias)
    .then(project => {
      let pages = project.pages;
      if (pages && Array.isArray(pages) && pages.length > 0) {
        dispatch(getConversations(alias));
        socket.subscribeProjectChanges({ project_alias: alias, onUpdateChanges: _updateMsgInConversation });
      }
    })
    .catch(err => alert(err));
}

export const unSubscribeProjectChanges = (project_alias) => dispatch => {
  socket.unSubscribeProjectChanges({project_alias});
  socket.disconnect();
}

const isInFilteredConversations = (conv, filters) => {
  let b = true;
  if (filters[2].isActive && conv.type != 'comment') b = false;
  if (filters[3].isActive && conv.type != 'inbox') b = false;
  let activedTagFilter = filters.filter(f => {
    return (f.isTag == true && f.isActive == true) ? true : false;
  });
  let hasSameTag = conv.tags.filter(f => {
    return activedTagFilter.filter(_f => {
      return _f._id == f._id;
    }).length > 0;
  }).length > 0;
  if (!hasSameTag && activedTagFilter.length != 0) b = false;
  return b;
}

export const updateMsgInConversation = (msg) => (dispatch, getState) => {
  if (!msg || !msg.parent || !msg.parent.type) return;
  let { filters } = getState().dashboard.filters;
  // if (!isInFilteredConversations(msg.parent, filters)) return;
  let { conversations } = getState().dashboard.conversations;
  conversations = u.clone(conversations);
  let _parent = conversations.filter((c) => {
    return c._id == msg.parent._id;
  });
  let parent = null;
  if (_parent.length == 0) {
    // if conversation is not found in current conversations -> create as new conversation and push to first
    parent = msg.parent;
    conversations.unshift(parent);
  } else {
    parent = _parent.pop();
    // check if this msg is exists in msg list
    function isMsgExist(msg, listMsg) {
      if (!listMsg || !Array.isArray(listMsg) || listMsg.length == 0) return false;
      let filterArr = listMsg.filter((currMsg) => { return currMsg.fb_id == msg.fb_id });
      return (filterArr.length == 0) ? false : filterArr.pop();
    }
    let tempMsg = isMsgExist(msg, parent.children);
    if (tempMsg) {
      // just update msg in list && post seen
      let updatedMsgList = parent.children.map((item) => {
        if (item.fb_id == tempMsg.fb_id) return msg;
        else return item;
      });
      parent.children = updatedMsgList;
      // update parent conversation in current conversations
      conversations = conversations.map(conv => {
        if (conv._id == parent._id) return parent;
        else return conv;
      });
      dispatch(postSeenCv(parent));
    } else {
      //this msg is not exists -> add to msg list and update parent
      let selectedConv = getState().dashboard.chat.conversation;
      if (selectedConv && (selectedConv._id == parent._id)) {
        parent.is_seen = true;
        dispatch(postSeenCv(parent));
      } else {
        parent.is_seen = false;
      }
      if (Array.isArray(parent.children)) {
        parent.children.push(msg);
      }
      parent.snippet = msg.message;
      let newConvers = conversations.filter((c) => { return c._id != parent._id });
      newConvers.unshift(parent);
      conversations = newConvers;
      if (selectedConv && selectedConv._id == parent._id) dispatch(setConversation(u.clone(parent)));
    }
  }
  dispatch(setConversations((conversations)));
  //if (self._child2) self._child2.scrollToBottom();
}
