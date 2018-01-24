import DashboardApi from '../../../api/DashboardApi';
import {setConversations} from '../conversations';
import {setConversation} from './messages';
import utils from '../../../helpers/utils';

export const blockPerson = (state) => (dispatch, getState) => {
    let {conversation} = getState().dashboard.chat;
    let customer_fb_id = utils.parseCustomer(conversation, "fb_id");
    DashboardApi.blockCustomer(conversation.page._id, customer_fb_id, state)
        .then(() => {
            dispatch(updateBlockCustomer(conversation, state));
        })
        .catch(err => {
            alert(err.message);
        })
};

export const updateBlockCustomer = (cv, is_blocked) => (dispatch, getState) => {
    cv = utils.parseCustomer(cv, "is_blocked", "update", is_blocked);
    let conversations = getState().dashboard.conversations.conversations.map(_cv => (cv._id === _cv._id) ? cv : _cv);
    dispatch(setConversations([...conversations]));
    let sc = getState().dashboard.chat.conversation;
    if (sc.fb_id === cv.fb_id) {
        dispatch(setConversation({...cv}));
    }
};