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

import { loadMoreMessages } from '../../../actions/dashboard/chat/messages';

let lastScrollPosition;
let lastLength = 0;

class FmsChatArea extends React.Component {
	// clientChanged() {
	// 	this.setState({ postInfo: null });
	// 	lastLength = 0;
	// }
	// scrollToBottom() {
	// 	let list = this.refs.chat_area;
	// 	list.scrollTop = list.scrollHeight;
	// }

	getChatAreaWidth() {
		let list = this.refs.chat_area;
		return list.clientWidth;
	}
	componentDidMount() {
		let list = this.refs.chat_area;
		list.addEventListener('scroll', () => {
			if ($(list).scrollTop() == 0) {
				this.props.dispatch(loadMoreMessages());
			}
		});
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
		let sc = this.props.conversation;
		if (sc.children && sc.children.length != lastLength) {
			if (lastLength != 0) list.scrollTop = list.scrollHeight - lastScrollPosition - 51;
			lastLength = sc.children.length;
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
			return messages.map(message => {
				let isSelf = message.from.fb_id == sc.page_fb_id;
				let isLast = lastItem === message;
				let type = (sc.type == "comment") ? "comment" : "inbox";
				return <FmsMessageItem message={message} key={uuid()} isSelf={isSelf} isLast={isLast} type={type}
					getChatAreaWidth={self.getChatAreaWidth.bind(this)} />;
			});
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
		let showSpin = (this.props.isLoadMoreMsgs == true) ? "" : " hide";
		let chatArea = (this.props.isLoadingMsgs) ? " hide" : "";
		let spin = (this.props.isLoadingMsgs) ? "" : " hide";
		let input = (this.props.isLoadingMsgs) ? " hide" : "";

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
				{this.renderTagsBar()}
				<div className={"input-message-area" + input}>
					<FmsMessageForm />
				</div>
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
		tags: state.dashboard.filters.tags
  }
}

export default connect(mapStateToProps)(FmsChatArea);
