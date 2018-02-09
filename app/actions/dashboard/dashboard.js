import * as socket from '../../socket';
import projectApi from '../../api/ProjectApi';
import {setConversation, isShownNewMsgNoti} from './chat/messages';
import {
    setConversations, getConversations, postSeenCv, checkUnreadComments, checkUnreadInboxes,
    setUnreadMsg
} from './conversations';

export const getProject = (project_id) => (dispatch) => {
    const _updateMsgInConversation = (msg) => {
        dispatch(updateMsgInConversation(msg));
    };
    projectApi.getPages()
        .then(pages => {
            if (pages && Array.isArray(pages) && pages.length > 0) {
                dispatch(getConversations());
                socket.subscribeProjectChanges({project_id: project_id, onUpdateChanges: _updateMsgInConversation});
            } else {
                dispatch(setConversations([]));
            }
        })
        .catch(err => alert(err));
    dispatch(checkUnreadComments());
    dispatch(checkUnreadInboxes());
};

export const unSubscribeProjectChanges = (project_id) => () => {
    socket.unSubscribeProjectChanges({project_id: project_id});
    socket.disconnect();
};

const isInFilteredConversations = (msg, _filters) => {
    let b = true, conv = msg.parent;
    let {filters, searchText} = _filters;
    if (filters[2].isActive && conv.type !== 'comment') b = false;
    if (filters[3].isActive && conv.type !== 'inbox') b = false;
    let activedTagFilter = filters.filter(f => {
        return (f.isTag === true && f.isActive === true);
    });
    let hasSameTag = conv.tags.filter(f => {
        return activedTagFilter.filter(_f => {
            return _f._id === f._id;
        }).length > 0;
    }).length > 0;
    if (!hasSameTag && activedTagFilter.length !== 0) b = false;
    if (!msg.from.name.includes(searchText)) b = false;
    return b;
};

export const updateMsgInConversation = (msg) => (dispatch, getState) => {
    if (!msg || !msg.parent || !msg.parent.type) return;
    let {filters} = getState().dashboard;
    let shouldAddToConversations = true;
    if (!isInFilteredConversations(msg, filters)) shouldAddToConversations = false;
    let {conversations} = getState().dashboard.conversations;
    conversations = [...conversations];
    let _parent = conversations.filter((c) => {
        return c._id === msg.parent._id;
    });
    let selectedConv = getState().dashboard.chat.conversation;
    if (selectedConv && msg.parent._id === selectedConv._id) {
        if (_parent.length === 0) _parent.push(selectedConv);
        else if (!_parent[0].children) _parent[0].children = selectedConv.children;
    }
    let parent = null;
    if (_parent.length === 0) {
        // if conversation is not found in current conversations -> create as new conversation and push to first
        parent = msg.parent;
        if (shouldAddToConversations === true) conversations.unshift(parent);
        dispatch(setUnreadMsg(parent.type, true));
    } else {
        parent = _parent.pop();

        // check if this msg is exists in msg list
        function isMsgExist(msg, listMsg) {
            if (!listMsg || !Array.isArray(listMsg) || listMsg.length === 0) return false;
            let filterArr = listMsg.filter((currMsg) => {
                return currMsg.fb_id === msg.fb_id
            });
            return (filterArr.length === 0) ? false : filterArr.pop();
        }

        let tempMsg = isMsgExist(msg, parent.children);
        if (tempMsg) {
            // just update msg in list && post seen
            parent.children = parent.children.map((item) => {
                if (item.fb_id === tempMsg.fb_id) return msg;
                else return item;
            });
            // update parent conversation in current conversations
            conversations = conversations.map(conv => {
                if (conv._id === parent._id) return parent;
                else return conv;
            });
            dispatch(postSeenCv(parent));
        } else {
            //this msg is not exists -> add to msg list and update parent
            if (selectedConv && (selectedConv._id === parent._id)) {
                parent.is_seen = true;
                dispatch(postSeenCv(parent));
            } else {
                parent.is_seen = false;
                dispatch(setUnreadMsg(parent.type, true));
            }
            if (Array.isArray(parent.children)) {
                parent.children.push(msg);
            }
            parent.snippet = msg.parent.snippet;
            let newConvers = conversations.filter((c) => {
                return c._id !== parent._id
            });
            if (shouldAddToConversations === true) newConvers.unshift(parent);
            conversations = newConvers;
            if (selectedConv && selectedConv._id === parent._id) {
                dispatch(setConversation({...parent}));
                let sl = getState().dashboard.chat.scrollList;
                if (sl.scrollTop + sl.clientHeight + 32 > sl.scrollHeight) sl.scrollTop = sl.scrollHeight;
                else dispatch(isShownNewMsgNoti(true));
            }
        }
    }
    dispatch(setConversations([...conversations]));
};
