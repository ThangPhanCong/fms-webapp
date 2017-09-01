'use strict';

const React = require('react');

let FmsRightMessageItem = React.createClass({
	render: function () {
		let avaUrl = (this.props.showAvatar) ? `https://graph.facebook.com/v2.10/${this.props.message.sender.fb_id}/picture` : '/img/fake-avatar.png';
		let margin = (this.props.showAvatar) ? " margintop-for-message" : "";
		return (
			<div className="right-message">
				<div className={"div-in-right-message" + margin}>
					<img src={avaUrl} className="right-profile" />
					<span className="right-message-content">{this.props.message.message}</span>
				</div>
			</div>
		);
	}
});

module.exports = FmsRightMessageItem;