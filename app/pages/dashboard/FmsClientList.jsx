'use strict';

const React = require('react');

let FmsClientItem = require('FmsClientItem');
let DashboardAPI = require('DashboardAPI');

let FmsClientList = React.createClass({
	handleClientClick: function (fb_id) {
		this.props.handleClientClick(fb_id);
	},
	render: function () {
		let self = this;
		let renderClients = function () {
			let conversations = self.props.conversations;
			return conversations.map(function (conversation) {
				return <FmsClientItem data={conversation} key={conversation.fb_id} handleClientClick={self.handleClientClick} />
			});
		};
		return (
			<div>
				{renderClients()}
			</div>
		);
	}
});

module.exports = FmsClientList;