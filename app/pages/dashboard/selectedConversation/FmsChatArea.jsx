import React from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid';
import { connect } from 'react-redux';

import FmsMessageItem from './FmsMessageItem';
import FmsMessageForm from './FmsMessageForm';
import FmsInfoChat from './FmsInfoChat';
import FmsSpin from '../../../components/FmsSpin';
import DashboardAPI from '../../../api/DashboardApi';
import FmsPostInfoConversation from './FmsPostInfoConversation';
import FmsTagsBar from './FmsTagsBar';
import FmsPrivateReplyModal from './FmsPrivateReplyModal';
import FmsDivider from './FmsDivider';

import { loadMoreMessages, isShownNewMsgNoti, setScrollList } from '../../../actions/dashboard/chat/messages';

let lastScrollPosition;

class FmsChatArea extends React.Component {
	convertTime(time) {
		let date;
    let current = new Date();
    if (!time) date = current;
    else date = new Date(time);

    let cday = current.getDate();
    let cmonth = current.getMonth() + 1;
    let cyear = current.getFullYear();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let res = "Đã xem";
    let whatday;
    if (cyear == year && cmonth == month && cday == day) whatday = "Hôm nay";
    else if (cyear == year && cmonth == month && cday - day == 1) whatday = "Hôm qua";
    else whatday = "Ngày " + day + " tháng " + month;
    return whatday;
	}
	getChatAreaWidth() {
		let list = this.refs.chat_area;
		if (!list) return 0;
		return list.clientWidth;
	}
	scrollToLastestMsg() {
		let list = this.refs.chat_area;
		list.scrollTop = list.scrollHeight;
	}
	componentDidMount() {
		let list = this.refs.chat_area;
		list.addEventListener('scroll', () => {
			if ($(list).scrollTop() == 0) {
				this.props.dispatch(loadMoreMessages());
			} else if (list.scrollTop + list.clientHeight + 32 > list.scrollHeight) {
				this.props.dispatch(isShownNewMsgNoti(false));
			}
		});
		this.props.dispatch(setScrollList(list));
	}
	componentWillUpdate() {
		let list = ReactDOM.findDOMNode(this.refs.chat_area);
		lastScrollPosition = list.scrollHeight - list.scrollTop;
	}
	componentDidUpdate(prevProp, prevState) {
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
				if (sc.type == "comment") {
					t1 = new Date(msg1.created_time);
					t2 = new Date(msg2.created_time);
				} else {
					t1 = new Date(msg1.updated_time);
					t2 = new Date(msg2.updated_time);
				}
				return t1 - t2;
			})
			let lastItem = messages[messages.length - 1];
			let prevSender = null;
			let res = [], lastUpdatedTime = null;
			messages.forEach(message => {
				if (!message) return;
				let last, current, hasDivider;
				if (lastUpdatedTime) last = new Date(lastUpdatedTime);
				current = new Date(message.updated_time);
				if (!lastUpdatedTime || last.getDate() != current.getDate()) {
					hasDivider = true;
					let divider = <FmsDivider key={uuid()} text={this.convertTime(message.updated_time)}/>;
					res.push(divider);
				}
				lastUpdatedTime = message.updated_time;
				let isSelf = message.from.fb_id == sc.page_fb_id;
				let isLast = lastItem === message;
				let type = (sc.type == "comment") ? "comment" : "inbox";
				let isFirst = (prevSender == message.from.fb_id) ? " is-not-first" : " is-first";
				if (hasDivider == true) isFirst = " is-first";
				prevSender = message.from.fb_id;
				let item = <FmsMessageItem message={message} key={uuid()} isSelf={isSelf} isLast={isLast} 
								getChatAreaWidth={self.getChatAreaWidth.bind(this)} type={type} isFirst={isFirst} />;
				res.push(item);
			});
			return res;
		}
	}

	renderPostInfo() {
		if (this.props.postInfo) {
			return <FmsPostInfoConversation />
		}
	}

	renderTagsBar() {
		if (this.props.tags && this.props.tags.length > 0 && this.props.isLoadingMsgs == false)
			return <FmsTagsBar />
	}

	renderInfoChat() {
		let sc = this.props.conversation;
		if (sc && Array.isArray(sc.children)) {
			return <FmsInfoChat />
		}
	}

	render() {
		let showSpin = (!this.props.postInfo) ? "" : " hide";
		let chatArea = (this.props.isLoadingMsgs) ? " hide" : "";
		let spin = (this.props.isLoadingMsgs) ? "" : " hide";
		let input = (this.props.isLoadingMsgs) ? " hide" : "";
		let noti = (this.props.isShownNewMsgNoti) ? "" : " hide";
		let notiText = (this.props.conversation.snippet == "") ? "[Attachment]" : this.props.conversation.snippet;

		return (
			<div className="inner-conversation-area">
				<div className="info-chat">
					{this.renderInfoChat()}
				</div>
				<div className={"conversation-spin" + spin}>
					<FmsSpin size={27} />
				</div>
				<div className={"chat-area" + chatArea} ref="chat_area">
					<div className={"client-list-spin" + showSpin}>
						<FmsSpin size={27} />
					</div>
					{this.renderPostInfo()}
					{this.renderConversation()}
				</div>
				<div className={"noti-wrapper" + noti}>
					<div className="new-message-noti bounce" onClick={this.scrollToLastestMsg.bind(this)}>
						Tin nhắn mới "{notiText}"
					</div>
				</div>
				{this.renderTagsBar()}
				<div className={"input-message-area" + input}>
					<FmsMessageForm />
				</div>
				<FmsPrivateReplyModal />
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
}

export default connect(mapStateToProps)(FmsChatArea);
