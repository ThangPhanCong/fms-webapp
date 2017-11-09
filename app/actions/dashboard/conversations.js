import DashboardApi from '../../api/DashboardApi';
import projectApi from '../../api/ProjectApi';
import * as socket from '../../socket';
import * as scActions from './selectedConversation/chatArea';
import _ from 'lodash';

export const START_LOAD_MORE_CONVERS = 'START_LOAD_MORE_CONVERS';
export const COMPLETE_LOAD_MORE_CONVERS = 'COMPLETE_LOAD_MORE_CONVERS';
export const START_LOADING_CONVERS = 'START_LOADING_CONVERS';
export const COMPLETE_LOADING_CONVERS = 'COMPLETE_LOADING_CONVERS';
export const SET_CONVERSATIONS = 'SET_CONVERSATIONS';
export const COMPLETE_GET_CONVERSATIONS = 'COMPLETE_GET_CONVERSATIONS';
export const SET_FILTERED_CONVERSATIONS = 'SET_FILTERED_CONVERSATIONS';


/////////////////////////////////////////////////////////////////////
export const startLoadMoreConvers = () => dispatch => {
  dispatch({ type: START_LOAD_MORE_CONVERS });
}
export const completeLoadMoreConvers = () => dispatch => {
  dispatch({ type: COMPLETE_LOAD_MORE_CONVERS });
}
export const startLoadingConvers = () => dispatch => {
  dispatch({ type: START_LOADING_CONVERS });
}
export const completeLoadingConvers = () => dispatch => {
  dispatch({ type: COMPLETE_LOADING_CONVERS });
}
export const setConversations = (conversations, paging) => dispatch => {
  dispatch({ type: SET_CONVERSATIONS, conversations: conversations, paging: paging });
}
export const completeGetConversations = (conversations, paging) => dispatch => {
  dispatch({ type: COMPLETE_GET_CONVERSATIONS, conversations: conversations, paging: paging });
}
export const setFilteredConversations = (filteredConversations) => dispatch => {
  dispatch({ type: SET_FILTERED_CONVERSATIONS, filteredConversations: filteredConversations });
}
////////////////////////////////////////////////////////////////////////

let postSeenCv = (conversation) => {
  if (conversation.type == 'inbox') {
    DashboardApi.postSeenInbox(conversation._id);
  } else if (conversation.type == 'comment') {
    DashboardApi.postSeenCmt(conversation._id);
  }
}

export const getProject = (alias) => dispatch => {
  let _updateMsgInConversation = (msg) => {
    dispatch(updateMsgInConversation(msg));
  }
  let subscribePageChanges = (pages) => {
    pages.forEach(page => {
      socket.subscribePageChanges({ page_fb_id: page.fb_id, onUpdateChanges: _updateMsgInConversation });
    });
  }
  projectApi.getProject(alias)
    .then(project => {
      let pages = project.pages;
      if (pages && Array.isArray(pages) && pages.length > 0) {
        dispatch(getConversations(alias));
        subscribePageChanges(pages);
      }
    })
    .catch(err => alert(err));
}

export const getConversations = (alias) => dispatch => {
  DashboardApi.getConversations(alias).then((data) => {
    let _convers = data.data;
    _convers = _convers.sort((a, b) => {
      let t1 = new Date(a.updated_time);
      let t2 = new Date(b.updated_time);

      return t2 - t1;
    });
    let paging = (data.paging && data.paging.next) ? data.paging.next : null;
    dispatch(completeGetConversations(_convers, paging))
  }, function (err) {
    console.log(err);
  })
}

export const handleConversationClick = (selectedConv, type) => (dispatch, getState) => {
  //if (this._child2) this._child2.clientChanged();
  dispatch(scActions.startLoadingMsgs());
  let _conversations = getState().dashboard.conversations.conversations;
  let _selectedConversation = _conversations
    .filter((currConversation) => { return currConversation._id == selectedConv._id })
    .pop();
  if (!_selectedConversation.is_seen) {
    _selectedConversation.is_seen = true;
    postSeenCv(_selectedConversation);
  }
  _selectedConversation = _.clone(_selectedConversation);
  dispatch(scActions.setSelectedConversation(_selectedConversation));
  if (!_selectedConversation.children) {
    let updateChildren = (_selectedConv, data) => {
      _selectedConv.children = data.data;
      _selectedConv.paging = (data.paging) ? data.paging.next : null;
      //this.reloadAttachment(data.data);
      dispatch(scActions.setSelectedConversation(_.clone(_selectedConv)));
      dispatch(scActions.completeLoadingMsgs());
    }

    if (type == "inbox") {
      DashboardApi.getMessageInbox(selectedConv._id)
        .then(data => updateChildren(_selectedConversation,  data))
    } else if (type == "comment") {
      DashboardApi.getReplyComment(selectedConv.fb_id)
        .then(data => updateChildren(_selectedConversation, data))
    }
  } else {
    dispatch(scActions.setSelectedConversation(_.clone(_selectedConversation)));
    dispatch(scActions.completeLoadingMsgs());
  }
}

export const loadMoreConversations = (alias) => (dispatch, getState) => {
  let isShowAll = () => {
    let filters = getState().dashboard.filters.filters.filter((filter) => {
      return filter.isActive;
    });
    return filters.length == 1 && filters[0].type == 'all';
  }
  let cs = getState().dashboard.conversations;
  if (cs.isLoadMoreConvers == true || !cs.paging) return;
  if (!isShowAll()) return;
  dispatch(startLoadMoreConvers());
  DashboardApi.getConversations(alias, cs.paging).then((res) => {
    let paging = (res.paging) ? res.paging.next : null;
    let newConversations = cs.conversations;
    res.data.forEach((conversation) => {
      newConversations.push(conversation);
    });
    dispatch(setConversations(newConversations, paging));
    //this.filterConversations();
  }, (err) => {
    dispatch(completeLoadMore());
    throw new Error(err);
  });
}

export const updateMsgInConversation = (msg) => (dispatch, getState) => {
  if (!msg || !msg.parent || !msg.parent.type) return;
  let _conversations = _.clone(getState().dashboard.conversations.conversations);
  let parentConversations = _conversations.filter((c) => { 
    //if (!c) return false;
    return c._id == msg.parent._id;
  });
  let parent = null;
  if (parentConversations.length == 0) {
    // if conversation is not found in current conversations -> create as new conversation and push to first
    parent = msg.parent;
    _conversations.unshift(parent);
  } else {
    parent = parentConversations.pop();
    // check if this msg is exists in msg list
    function isMsgExist(msg, listMsg) {
      if (!listMsg || !Array.isArray(listMsg) || listMsg.length == 0) {
        return false;
      }
      let filterArr = listMsg.filter((currMsg) => { return currMsg.fb_id == msg.fb_id });
      return (filterArr.length == 0) ? false : filterArr.pop();
    }
    let tempMsg = isMsgExist(msg, parent.children);
    if (tempMsg) {
      // just update msg in list && post seen
      let updatedMsgList = parent.children.map((item) => {
        if (item.fb_id == tempMsg.fb_id) {
          return msg;
        } else {
          return item;
        }
      });
      parent.children = updatedMsgList;
      // update parent conversation in current conversations
      _conversations = _conversations.map(parentCv => {
        if (parentCv._id == parent._id) {
          return parent;
        } else {
          return parentCv;
        }
      })
      postSeenCv(parent);
    } else {
      //this msg is not exists -> add to msg list and update parent
      let _selectedConversation = getState().dashboard.selectedConversation.chatArea.conversation;
      if (_selectedConversation && (_selectedConversation._id == parent._id)) {
        parent.is_seen = true;
        postSeenCv(parent);
      } else {
        parent.is_seen = false;
      }
      if (Array.isArray(parent.children)) {
        parent.children.push(msg);
      }
      parent.snippet = msg.message;
      let filterConversations = _conversations.filter((c) => { return c._id != parent._id });
      filterConversations.unshift(parent);
      _conversations = filterConversations;
    }
  }
  dispatch(setConversations(_conversations));
  //self.filterConversations();
  //if (self._child2) self._child2.scrollToBottom();
}