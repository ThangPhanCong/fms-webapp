'use strict';

const React = require('react');

let FmsClientItem = React.createClass({
	handleClientClick: function () {
		this.props.handleClientClick(this.props.data.fb_id, this.props.data.type);
	},
	render: function () {
		let clientid, clientName, message = this.props.data.message;
		if (this.props.data.type == "inbox") {
			clientid = this.props.data.customer.id;
			clientName = this.props.data.customer.name;
		} else if (this.props.data.type == "comment") {
			clientid = this.props.data.from.id;
			clientName = this.props.data.from.name;
		}
		let avaUrl = `https://graph.facebook.com/v2.10/${clientid}/picture`;
		return (
			<div className="client-item" onClick={this.handleClientClick}>
				<img src={avaUrl} className="client-profile" />
				<div className="name-and-message">
					<div className="client-name">{clientName}</div>
					<div className="lastest-message">{message}</div>
				</div>
			</div>
		);
	}
});

module.exports = FmsClientItem;