import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import FmsMessageItem from '../FmsMessageItem/FmsMessageItem';
import FmsMessageForm from '../FmsMessageForm/FmsMessageForm';
import FmsInfoChat from '../FmsInfoChat/FmsInfoChat';

import FmsSpin from '../../../../commons/FmsSpin/FmsSpin';
import FmsPostInfoConversation from '../FmsPostInfoConversation/FmsPostInfoConversation';
import FmsTagsBar from '../FmsTagsBar/FmsTagsBar';
import FmsPrivateReplyModal from '../FmsPrivateReplyModal/FmsPrivateReplyModal';
import FmsDivider from '../FmsDivider/FmsDivider';

import {loadMoreMessages, isShownNewMsgNoti, setScrollList, resetChat} from '../../../../actions/dashboard/chat/messages';
import FmsDate from '../../../../helpers/FmsDate';

let lastScrollPosition;

class FmsChatArea extends React.Component {
    static notifyText(text) {
        if (!text) return "";
        let temp = ((text === "") ? "[ Attachment ]" : `"${text}"`);
        if (temp.length > 14) temp = temp.substring(0, 10) + '..."';
        return temp;
    }

    getChatAreaWidth() {
        let list = this.refs.chat_area;
        if (!list) return 425;
        return list.clientWidth;
    }

    scrollToLastestMsg() {
        let list = this.refs.chat_area;
        list.scrollTop = list.scrollHeight;
    }

    componentDidMount() {
        let list = this.refs.chat_area;
        list.addEventListener('scroll', () => {
            if ($(list).scrollTop() === 0) {
                this.props.dispatch(loadMoreMessages());
            } else if (list.scrollTop + list.clientHeight + 32 > list.scrollHeight) {
                this.props.dispatch(isShownNewMsgNoti(false));
            }
        });
        $(list).scrollbar();
        this.props.dispatch(setScrollList(list));
    }

    componentWillUnmount() {
        this.props.dispatch(resetChat());
    }

    componentWillUpdate() {
        if (!this.props.conversation) return;
        let list = ReactDOM.findDOMNode(this.refs.chat_area);
        lastScrollPosition = list.scrollHeight - list.scrollTop;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.alias !== this.props.alias) this.props.dispatch(resetChat());
        if (!this.props.conversation) return;
        let list = ReactDOM.findDOMNode(this.refs.chat_area);
        list.scrollTop = list.scrollHeight - lastScrollPosition;
        if (!this.props.postInfo && list.clientHeight + 12 > list.scrollHeight) {
            this.props.dispatch(loadMoreMessages());
        }
    }

    renderConversation() {
        let self = this;
        let sc = this.props.conversation;
        if (sc && Array.isArray(sc.children)) {
            let messages = sc.children;
            messages = messages.sort((msg1, msg2) => {
                let t1, t2;
                if (sc.type === "comment") {
                    t1 = new Date(msg1.created_time);
                    t2 = new Date(msg2.created_time);
                } else {
                    t1 = new Date(msg1.updated_time);
                    t2 = new Date(msg2.updated_time);
                }
                return t1 - t2;
            });
            let lastItem = messages[messages.length - 1];
            let prevSender = null;
            let res = [], lastUpdatedTime = null;
            messages.forEach(message => {
                if (!message) return;
                let last, current, hasDivider;
                if (lastUpdatedTime) last = new Date(lastUpdatedTime);
                current = new Date(message.updated_time);
                if (!lastUpdatedTime || last.getDate() !== current.getDate()) {
                    hasDivider = true;
                    let divider = <FmsDivider key={message._id}
                                              text={(new FmsDate(message.updated_time)).getTimeChatArea()}/>;
                    res.push(divider);
                }
                lastUpdatedTime = message.updated_time;
                let isSelf = message.from.fb_id === sc.page_fb_id;
                let isLast = lastItem === message;
                let type = (sc.type === "comment") ? "comment" : "inbox";
                let isFirst = (prevSender === message.from.fb_id) ? " is-not-first" : " is-first";
                if (hasDivider === true) isFirst = " is-first";
                prevSender = message.from.fb_id;
                let item = <FmsMessageItem message={message} key={message.fb_id} isSelf={isSelf} isLast={isLast}
                                           getChatAreaWidth={self.getChatAreaWidth.bind(this)} type={type}
                                           isFirst={isFirst}/>;
                res.push(item);
            });
            return res;
        }
    }

    renderPostInfo() {
        if (this.props.postInfo) {
            return <FmsPostInfoConversation/>
        }
    }

    renderTagsBar() {
        if (this.props.tags && this.props.tags.length > 0 && this.props.isLoadingMsgs === false)
            return <FmsTagsBar alias={this.props.alias}/>
    }

    renderInfoChat() {
        let sc = this.props.conversation;
        if (sc && Array.isArray(sc.children)) {
            return <FmsInfoChat post_id={this.props.postInfo ? this.props.postInfo.fb_id : null}/>
        }
    }

    render() {
        let p = this.props;
        if (!p.conversation) return <div/>;
        let spin = (p.isLoadingMsgs) ? "" : " hide";
        let showSpin = (!p.postInfo && spin !== "") ? "" : " hide";
        let input = (p.isLoadingMsgs) ? " hide" : "";
        let noti = (p.isShownNewMsgNoti) ? "" : " hide";

        return (
            <div className="inner-conversation-area">
                <div className="info-chat">
                    {this.renderInfoChat()}
                </div>
                <div className={"conversation-spin" + spin}>
                    <FmsSpin size={27}/>
                </div>
                <div className="chat-area scrollbar-inner" ref="chat_area">
                    <div className={"client-list-spin" + showSpin}>
                        <FmsSpin size={27}/>
                    </div>
                    {this.renderPostInfo()}
                    {this.renderConversation()}
                </div>
                <div className={"noti-wrapper" + noti}>
                    <div className="new-message-noti bounce" onClick={this.scrollToLastestMsg.bind(this)}>
                        Tin nhắn mới {FmsChatArea.notifyText(p.conversation.snippet)}
                    </div>
                </div>
                {this.renderTagsBar()}
                <div className={"input-message-area" + input}>
                    <FmsMessageForm/>
                </div>
                <FmsPrivateReplyModal/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        conversation: state.dashboard.chat.conversation,
        postInfo: state.dashboard.chat.postInfo,
        isLoadingMsgs: state.dashboard.chat.isLoadingMsgs,
        isLoadMoreMsgs: state.dashboard.chat.isLoadMoreMsgs,
        tags: state.dashboard.filters.tags,
        isShownNewMsgNoti: state.dashboard.chat.isShownNewMsgNoti
    }
};

export default connect(mapStateToProps)(FmsChatArea);