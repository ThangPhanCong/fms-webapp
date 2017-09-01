'use strict';

const React = require('react');

let FmsClientItem = React.createClass({
	handleClientClick: function () {
		this.props.handleClientClick(this.props.data.fb_id);
	},
	render: function () {
		let that = this;
		let avaUrl = `https://graph.facebook.com/v2.10/${this.props.data.fb_id}/picture`;
		return (
			<div id="client-item" onClick={this.handleClientClick}>
				<img src={avaUrl} id="client-profile" />
				<div id="name-and-message">
					<div id="client-name">{this.props.data.name}</div>
					<div id="lastest-message">{this.props.data.messages[0].message}</div>
				</div>
			</div>
		);
	}
});

module.exports = FmsClientItem;