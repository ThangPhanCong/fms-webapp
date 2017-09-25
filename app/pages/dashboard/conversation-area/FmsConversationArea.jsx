'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

let FmsMessageItem = require('FmsMessageItem');
let FmsMessageForm = require('FmsMessageForm');
let FmsInfoChat = require('FmsInfoChat');
let FmsSpin = require('FmsSpin');
let DashboardAPI = require('DashboardAPI');

let count = 0;
let messageHasAttachment = 0;
let lastPosition = 0;

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
		if (count != 0) return;
		count++;
		let newConversation = this.props.currentConversation;
		let newMessages = [].concat(this.props.currentConversation.children);
		let more = DashboardAPI.getMoreMessages();
		newMessages = newMessages.concat(more);
		newConversation.children = newMessages;
		this.props.displayMoreMessages(newConversation);
	},
	componentWillUpdate: function () {
		var list = this.refs.chat_area;
		lastPosition = list.scrollHeight;
	},
	componentDidUpdate: function () {
		var list = this.refs.chat_area;
		list.scrollTop = list.scrollHeight - lastPosition;
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

				messageHasAttachment = 0;
				return messages.map(message => {
					let isSelf = message.from.id == self.props.pageid;
					let isLast = lastItem === message;
					let type = (self.props.currentConversation.type == "comment") ? "comment" : "inbox";
					if (message.shares) messageHasAttachment += message.shares.data.length;
					else if (message.attachment) messageHasAttachment += 1;
					else if (message.attachments) messageHasAttachment += message.attachments.data.length;

					return <FmsMessageItem message={message} key={message.fb_id} isSelf={isSelf} 
									isLast={isLast} type={type} attachmentLoadDone={self.attachmentLoadDone}/>;
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
					<FmsInfoChat currentConversation={this.props.currentConversation}/>
				</div>
				<div className={"conversation-spin" + spin}>
					<FmsSpin size={27}/>
				</div>
				<div className={"chat-area" + chatArea} ref="chat_area">
					<div className={"client-list-spin" + showSpin}>
						<FmsSpin size={27}/>
					</div>
					{renderConversation()}
				</div>
				<div className={"input-message-area" + input}>
					<FmsMessageForm sendMessage={this.props.sendMessage}/>
				</div>
			</div>
		);
	}
});

module.exports = FmsConversationArea;
