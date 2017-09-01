'use strict';

const React = require('react');

let FmsLeftMessageItem = React.createClass({
	render: function () {
		let avaUrl = (this.props.showAvatar) ? `https://graph.facebook.com/v2.10/${this.props.message.sender.fb_id}/picture` : '/img/fake-avatar.png';
		let margin = (this.props.showAvatar) ? " margintop-for-message" : "";
		return (
			<div className="left-message">
				<div className={"div-in-left-message" + margin}>
					<img src={avaUrl} className="left-profile" />
					<span className="left-message-content">{this.props.message.message}</span>
				</div>
			</div>
		);
	}
});

module.exports = FmsLeftMessageItem;