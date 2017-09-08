'use strict';

const React = require('react');

const searchImg = require('search.png');
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
				<div className="search-client">
					<img src={searchImg} className="search-icon"/>
					<input type="text" className="input-search-client" />
				</div>
				<div>
					{renderClients()}
				</div>
			</div>
		);
	}
});

module.exports = FmsClientList;
