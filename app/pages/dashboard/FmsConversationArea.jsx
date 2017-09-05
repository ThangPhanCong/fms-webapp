'use strict';

const React = require('react');
const Cookie = require('universal-cookie');
const uuid = require('uuid');

let FmsMessageItem = require('FmsMessageItem');
let FmsMessageForm = require('FmsMessageForm');

let FmsConversationArea = React.createClass({
	getUserId: function () {
		let cookie = new Cookie();
		let user_id = cookie.get('user_fb_id');
		return user_id;
	},
	componentDidUpdate: function () {
		var obj = this.refs.chat_area;
		obj.scrollTop = obj.scrollHeight;
	},
	render: function () {
		let self = this, user_id = this.getUserId();
		let lastMessage = null;
		let renderConversation = function () {
			if (!self.props.currentConversation) return;
			return self.props.currentConversation.messages.map(function (message) {
				let showAvatar = true;
				if (lastMessage && lastMessage.sender.fb_id == message.sender.fb_id) {
					showAvatar = false;
				}
				let isSelf = message.sender.fb_id == user_id;
				lastMessage = message;
				return <FmsMessageItem message={message} key={uuid()} showAvatar={showAvatar} isSelf={isSelf}/>;
			});
		};
		return (
			<div>
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
