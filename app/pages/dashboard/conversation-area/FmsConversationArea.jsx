'use strict';

const React = require('react');
const Cookie = require('universal-cookie');

let FmsMessageItem = require('FmsMessageItem');
let FmsMessageForm = require('FmsMessageForm');
let FmsInfoChat = require('FmsInfoChat');

let FmsConversationArea = React.createClass({
	componentDidMount: function () {
		var obj = this.refs.chat_area;
		obj.scrollTop = obj.scrollHeight;
	},
	componentDidUpdate: function () {
		var obj = this.refs.chat_area;
		obj.scrollTop = obj.scrollHeight;
	},
	render: function () {
		let self = this;

		let renderConversation = function () {

			if (self.props.currentConversation && Array.isArray(self.props.currentConversation.children)) {
				let lastItem = self.props.currentConversation.children[self.props.currentConversation.children.length - 1];
				return self.props.currentConversation.children.map(message => {
					let isSelf = message.from.id == self.props.pageid;
					let isLast = lastItem === message;
					let type = (self.props.currentConversation.type == "comment") ? "comment" : "inbox";

					return <FmsMessageItem message={message} key={message.fb_id} isSelf={isSelf} isLast={isLast} type={type}/>;
				});
			}
		};
		return (
			<div className="inner-conversation-area">
				<div className="info-chat">
					<FmsInfoChat currentConversation={this.props.currentConversation}/>
				</div>
				<div className="chat-area" ref="chat_area">
					{renderConversation()}
				</div>
				<div className="input-message-area">
					<FmsMessageForm sendMessage={this.props.sendMessage}/>
				</div>
			</div>
		);
	}
});

module.exports = FmsConversationArea;
