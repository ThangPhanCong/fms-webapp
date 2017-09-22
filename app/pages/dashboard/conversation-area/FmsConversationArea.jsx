'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const Cookie = require('universal-cookie');

let FmsMessageItem = require('FmsMessageItem');
let FmsMessageForm = require('FmsMessageForm');
let FmsInfoChat = require('FmsInfoChat');

let count = 0;

let FmsConversationArea = React.createClass({
	componentDidMount: function () {
		const list = ReactDOM.findDOMNode(this.refs.chat_area);
		list.scrollTop = list.scrollHeight;
		list.addEventListener('scroll', () => {
			if ($(list).scrollTop() == 0) {
				this.loadMoreMessages();
			}
		});
	},
	loadMoreMessages: function () {
		if (count != 0) return;
		count++;
		alert("Vwnvwiovuwoeuw");
	},
	componentDidUpdate: function () {
		var list = this.refs.chat_area;
		list.scrollTop = list.scrollHeight;
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
