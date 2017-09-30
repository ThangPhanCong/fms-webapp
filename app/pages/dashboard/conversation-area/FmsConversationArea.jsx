'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

let FmsMessageItem = require('FmsMessageItem');
let FmsMessageForm = require('FmsMessageForm');
let FmsInfoChat = require('FmsInfoChat');
let FmsSpin = require('FmsSpin');
let DashboardAPI = require('DashboardAPI');

let messageHasAttachment = 0;
let lastScrollPosition;

let FmsConversationArea = React.createClass({
	getInitialState: function () {
		return {
			showSpin: false
		}
	},
	attachmentLoadDone: function () {
		messageHasAttachment--;
		if (messageHasAttachment == 0) {
			this.props.conversationLoaded();
			messageHasAttachment--;
		}
	},
	componentDidMount: function () {
		var list = this.refs.chat_area;
		list.addEventListener('scroll', () => {
			if ($(list).scrollTop() == 0) {
				this.loadMoreMessages();
			}
		});
	},
	loadMoreMessages: function () {
		let current = this.props.currentConversation;
		if (current.type == "comment" && this.props.paging && !this.state.showSpin) {
			this.setState({ showSpin: true });
			DashboardAPI.getReplyComment(current.fb_id, this.props.paging).then((res) => {
				let paging = (res.paging) ? res.paging.next : null
				this.setState({ showSpin: false });
				this.props.displayMoreMessages(res.data, paging);
			});
		} else if (this.props.paging && !this.state.showSpin) {
			this.setState({ showSpin: true });
			DashboardAPI.getMessageInbox(current.fb_id, this.props.paging).then((res) => {
				let paging = (res.paging) ? res.paging.next : null;
				this.setState({ showSpin: false });
				this.props.displayMoreMessages(res.data, paging);
			});
		}
	},
	componentWillUpdate: function () {
		var list = ReactDOM.findDOMNode(this.refs.chat_area);
		lastScrollPosition = list.scrollHeight - list.scrollTop;
	},
	componentDidUpdate: function (prevProp, prevState) {
		var list = ReactDOM.findDOMNode(this.refs.chat_area);
		list.scrollTop = list.scrollHeight - lastScrollPosition;
		if (this.props.isLoading == false && prevProp.isLoading == true && list.clientHeight + 12 > list.scrollHeight) {
			this.loadMoreMessages();
		}
	},
	render: function () {
		let self = this;

		let renderConversation = () => {
			if (self.props.currentConversation && Array.isArray(self.props.currentConversation.children)) {
				let messages = self.props.currentConversation.children;
				messages = messages.sort((msg1, msg2) => {
					let t1 = new Date(msg1.updated_time);
					let t2 = new Date(msg2.updated_time);
					return t1 - t2;
				})
				let lastItem = messages[messages.length - 1];

				messageHasAttachment = self.props.countAttachment(messages);
				return messages.map(message => {
					let isSelf = message.from.id == self.props.pageid;
					let isLast = lastItem === message;
					let type = (self.props.currentConversation.type == "comment") ? "comment" : "inbox";

					return <FmsMessageItem message={message} key={message.fb_id} isSelf={isSelf}
						isLast={isLast} type={type} attachmentLoadDone={self.attachmentLoadDone} />;
				});
			}
		};
		let showSpin = (this.state.showSpin == true) ? "" : " hide";
		let chatArea = (this.props.isLoading) ? " hide" : "";
		let spin = (this.props.isLoading) ? "" : " hide";
		let input = (this.props.isLoading) ? " hide" : "";

		return (
			<div className="inner-conversation-area">
				<div className="info-chat">
					<FmsInfoChat currentConversation={this.props.currentConversation} updateBlockCustomer={self.props.updateBlockCustomer}/>
				</div>
				<div className={"conversation-spin" + spin}>
					<FmsSpin size={27} />
				</div>
				<div className={"chat-area" + chatArea} ref="chat_area">
					<div className={"client-list-spin" + showSpin}>
						<FmsSpin size={27} />
					</div>
					{renderConversation()}
				</div>
				<div className={"input-message-area" + input}>
					<FmsMessageForm sendMessage={this.props.sendMessage} />
				</div>
			</div>
		);
	}
});

module.exports = FmsConversationArea;
