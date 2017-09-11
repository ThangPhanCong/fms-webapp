'use strict';

const React = require('react');

let FmsClientItem = React.createClass({
	handleClientClick: function () {
		this.props.handleClientClick(this.props.data.fb_id, this.props.data.type);
	},
	render: function () {
		let clientid, clientName, message;
		let isSelected = (this.props.isSelected) ? " selectedItem" : "";

		clientid = this.props.data.customer.id;
		clientName = this.props.data.customer.name;
		message = this.props.data.snippet;

		// TODO: use query param to set image size
		// eg: https://graph.facebook.com/v2.10/${clientid}/picture?width=50&height=50
		let avaUrl = `https://graph.facebook.com/v2.10/${clientid}/picture`;
		return (
			<div className={"client-item" + isSelected} onClick={this.handleClientClick}>
				<div className="client-profile-wrapper">
					<img src={avaUrl} className="client-profile" />
				</div>
				<div className="name-and-message">
					<div className="client-name">{clientName}</div>
					<div className="lastest-message">{message}</div>
				</div>
			</div>
		);
	}
});

module.exports = FmsClientItem;
