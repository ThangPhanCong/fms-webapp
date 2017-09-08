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
			<div className="client-item" onClick={this.handleClientClick}>
				<img src={avaUrl} className="client-profile" />
				<div className="name-and-message">
					<div className="client-name">{this.props.data.name}</div>
					<div className="lastest-message">{this.props.data.messages[0].message}</div>
				</div>
			</div>
		);
	}
});

module.exports = FmsClientItem;