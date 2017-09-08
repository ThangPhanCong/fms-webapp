'use strict';

const React = require('react');
const Cookie = require('universal-cookie');

let FmsMessageItem = require('FmsMessageItem');
let FmsMessageForm = require('FmsMessageForm');
let FmsInfoChat = require('FmsInfoChat');

let FmsConversationArea = React.createClass({
	componentDidUpdate: function () {
		var obj = this.refs.chat_area;
		obj.scrollTop = obj.scrollHeight;
	},
	render: function () {
		let self = this;
		let lastMessage = null;
		let renderConversation = function () {
			if (!self.props.currentConversation) return;
			let count = self.props.currentConversation.length;
			return self.props.currentConversation.map(function (message) {
				count--;
				let showAvatar = true;
				if (lastMessage && lastMessage.from.id == message.from.id) {
					showAvatar = false;
				}
				let isSelf = message.from.id == self.props.pageid;
				let isLast = (count == 0);
				lastMessage = message;
				return <FmsMessageItem message={message} key={message.fb_id} showAvatar={showAvatar} isSelf={isSelf} isLast={isLast}/>;
			});
		};
		return (
			<div>
				<div className="info-chat">
					<FmsInfoChat clientName={this.props.currentConversation.name}/>
				</div>
				<div className="chat-area" ref="chat_area">
					{renderConversation()}
				</div>
				<div className="input-message-area">
					<FmsMessageForm/>
				</div>
			</div>
		);
	}
});

module.exports = FmsConversationArea;
