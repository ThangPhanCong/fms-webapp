'use strict';

const React = require('react');

let FmsLeftMessageItem = React.createClass({
	render: function () {
		let avaUrl = `https://graph.facebook.com/v2.10/${this.props.message.sender.fb_id}/picture`;
		return (
			<div id="left-message">
				<div id="div-in-left-message">
					<img src={avaUrl} id="left-profile" />
					<span id="left-message-content">{this.props.message.message}</span>
				</div>
			</div>
		);
	}
});

module.exports = FmsLeftMessageItem;