import DashboardApi from '../../api/DashboardApi';
import * as u from 'lodash';
import { setConversation, isLoadingMsgs } from './chat/messages';


export const isLoadingConversations = (state) => dispatch => {
  dispatch({ type: 'LOADING_CONVERSATIONS', state });
}
export const setConversations = (conversations, pagingConversations) => (dispatch, getState) => {
  let _pagingConversations = getState().dashboard.conversations.pagingConversations;
  if (!pagingConversations) pagingConversations = _pagingConversations;
  else if (pagingConversations == "null") pagingConversations = null;
  dispatch({ type: 'SET_CONVERSATIONS', conversations, pagingConversations });
}
export const completeGetConversations = (conversations, pagingConversations) => dispatch => {
  dispatch({ type: 'COMPLETE_GET_CONVERSATIONS', conversations, pagingConversations });
}
export const setAlias = (alias) => dispatch => {
  dispatch({ type: 'SET_ALIAS', alias});
}
export const resetConversations = () => dispatch => {
  dispatch({ type: 'RESET_INIT_STATE_CONVERSATIONS' });
}


export const generateQueryParams = (f) => {
  let { filters, searchText } = f;
  let query = {}, tags = [];
  for (let i = 1; i < filters.length; i++) {
    let f = filters[i];
    if (f.isTag) {
      if (f.isActive == true) tags.push(f.type);
    } else {
      if (f.type == 'unread' && f.isActive == true) query.status = 'unread';
      else if (f.type == 'inbox' && f.isActive == true) query.select = 'inbox';
      else if (f.type == 'comment' && f.isActive == true) query.select = 'comment';
    }
  }
  tags = (tags.length == 0) ? null : tags.join();
  if (tags) query.tags = tags;
  if (searchText && searchText != "") query.search = searchText;
  return query;
}

export const postSeenCv = (conversation) => dispatch => {
  if (conversation.type == 'inbox') {
    DashboardApi.postSeenInbox(conversation._id);
  } else if (conversation.type == 'comment') {
    DashboardApi.postSeenCmt(conversation._id);
  }
}

export const getConversations = (alias) => (dispatch, getState) => {
  let query = generateQueryParams(getState().dashboard.filters);
  dispatch(isLoadingConversations(true));
  DashboardApi.getConversations(alias, null, query).then((data) => {
    let conversations = data.data;
    conversations = conversations.sort((a, b) => {
      let t1 = new Date(a.updated_time);
      let t2 = new Date(b.updated_time);
      return t2 - t1;
    });
    let paging = (data.paging && data.paging.next) ? data.paging.next : null;
    dispatch(completeGetConversations(conversations, paging))
  }, function (err) {
    dispatch(isLoadingConversations(false));
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

export const loadMoreConversations = () => (dispatch, getState) => {
  let cs = getState().dashboard.conversations;
  if (cs.isLoadingConversations == true || !cs.pagingConversations) return;
  let query = generateQueryParams(getState().dashboard.filters);
  dispatch(isLoadingConversations(true));
  DashboardApi.getConversations(cs.alias, cs.pagingConversations, query).then((res) => {
    let paging = (res.paging) ? res.paging.next : "null";
    let newConversations = cs.conversations.concat(res.data);
    dispatch(setConversations(newConversations, paging));
  }, (err) => {
    dispatch(isLoadingConversations(false));
    throw new Error(err);
  });
}