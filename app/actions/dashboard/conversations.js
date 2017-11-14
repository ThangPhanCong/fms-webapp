import DashboardApi from '../../api/DashboardApi';
import * as u from 'lodash';
import { setConversation, isLoadingMsgs } from './chat/messages';
import { filterConversations } from './filters';


export const isLoadMoreConversations = (state) => dispatch => {
  dispatch({ type: 'LOAD_MORE_CONVERSATIONS', state });
}
export const isLoadingConversations = (state) => dispatch => {
  dispatch({ type: 'LOADING_CONVERSATIONS', state });
}
export const setConversations = (conversations, pagingConversations) => dispatch => {
  dispatch({ type: 'SET_CONVERSATIONS', conversations, pagingConversations });
}
export const completeGetConversations = (conversations, pagingConversations) => dispatch => {
  dispatch({ type: 'COMPLETE_GET_CONVERSATIONS', conversations, pagingConversations });
}
export const setFilteredConversations = (filteredConversations) => dispatch => {
  dispatch({ type: 'SET_FILTERED_CONVERSATIONS', filteredConversations });
}


export const postSeenCv = (conversation) => dispatch => {
  if (conversation.type == 'inbox') {
    DashboardApi.postSeenInbox(conversation._id);
  } else if (conversation.type == 'comment') {
    DashboardApi.postSeenCmt(conversation._id);
  }
}

export const getConversations = (alias) => dispatch => {
  DashboardApi.getConversations(alias).then((data) => {
    let conversations = data.data;
    conversations = conversations.sort((a, b) => {
      let t1 = new Date(a.updated_time);
      let t2 = new Date(b.updated_time);
      return t2 - t1;
    });
    let paging = (data.paging && data.paging.next) ? data.paging.next : null;
    dispatch(completeGetConversations(conversations, paging))
  }, function (err) {
    console.log(err);
  })
}

export const handleConversationClick = (selectedConv, type) => (dispatch, getState) => {
  //if (this._child2) this._child2.clientChanged();
  dispatch(isLoadingMsgs(true));
  let { conversations } = getState().dashboard.conversations;
  if (!selectedConv.is_seen) {
    selectedConv.is_seen = true;
    dispatch(postSeenCv(selectedConv));
  }
  dispatch(setConversation(u.clone(selectedConv)));
  if (!selectedConv.children) {
    let updateChildren = (sc, data) => {
      sc.children = data.data;
      sc.paging = (data.paging) ? data.paging.next : null;
      conversations.forEach(c => {
        if (c._id == sc._id) {
          c.children = data.data;
          c.paging = sc.paging;
        }
      });
      //this.reloadAttachment(data.data);
      dispatch(setConversation(u.clone(sc)));
      dispatch(isLoadingMsgs(false));
    }
    if (type == "inbox") {
      DashboardApi.getMessageInbox(selectedConv._id)
        .then(data => updateChildren(selectedConv,  data))
    } else if (type == "comment") {
      DashboardApi.getReplyComment(selectedConv.fb_id)
        .then(data => updateChildren(selectedConv, data))
    }
  } else {
    dispatch(isLoadingMsgs(false));
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
  if (cs.isLoadMoreConversations == true || !cs.pagingConversations || !isShowAll()) return;
  dispatch(isLoadMoreConversations(true));
  DashboardApi.getConversations(alias, cs.pagingConversations).then((res) => {
    let paging = (res.paging) ? res.paging.next : null;
    let newConversations = cs.conversations.concat(res.data);
    dispatch(setConversations(newConversations, paging));
    dispatch(filterConversations());
  }, (err) => {
    dispatch(isLoadMoreConversations(false));
    throw new Error(err);
  });
}