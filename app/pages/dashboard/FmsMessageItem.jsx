'use strict';

const React = require('react');

let FmsTextMessageContent = require('FmsTextMessageContent');

let FmsMessageItem = React.createClass({
	render: function () {
		let avaUrl = `https://graph.facebook.com/v2.10/${this.props.message.from.id}/picture`;
    let messageWrapper = (this.props.isSelf) ? " right-message-wrapper" : " left-message-wrapper";
		let profileWrapper = (this.props.isSelf) ? " right-profile-wrapper" : " left-profile-wrapper";
		let messageContent = (this.props.isSelf) ? " right-message-content" : " left-message-content";
		let isLast = (this.props.isLast) ? " last-message" : "";
		return (
			<div className="message-item">
				<div className={"message-wrapper" + messageWrapper + isLast}>
          <div className={"profile-wrapper" + profileWrapper}>
					  <img src={avaUrl} className="profile-message" />
          </div>
          <div className={"message-content" + messageContent}>
					  <FmsTextMessageContent content={this.props.message.message}/>
          </div>
				</div>
			</div>
		);
	}
});

module.exports = FmsMessageItem;