'use strict';

const React = require('react');

let FmsTextMessageContent = require('FmsTextMessageContent');

let FmsMessageItem = React.createClass({
	render: function () {
		let avaUrl = (this.props.showAvatar) ? `https://graph.facebook.com/v2.10/${this.props.message.sender.fb_id}/picture` : '';
		let margin = (this.props.showAvatar) ? " margintop-for-message" : "";
    let float = (this.props.isSelf) ? " float-right" : " float-left";
    let background = (this.props.isSelf) ? " background-right-message" : " background-left-message";
		return (
			<div className="message-item">
				<div className={"div-in-message" + margin + float}>
          <div className={"div-wrap-profile" + float}>
					  <img src={avaUrl} className="profile-message" />
          </div>
          <div className={"message-content" + float + background}>
					  <FmsTextMessageContent content={this.props.message.message}/>
          </div>
				</div>
			</div>
		);
	}
});

module.exports = FmsMessageItem;