'use strict';

const React = require('react');

const searchImg = require('search.png');
let FmsClientItem = require('FmsClientItem');
let DashboardAPI = require('DashboardAPI');
let FmsSpin = require('FmsSpin');

let FmsClientList = React.createClass({
	getDefaultProps: function () {
		return {
			showSpin: false,
			conversations: [],
			currentConversation: null
		}
	},
	handleClientClick: function(fb_id, type) {
		this.props.handleClientClick(fb_id, type);
	},
	render: function () {
		let self = this;

		let renderClients = function () {
			let conversations = self.props.conversations;
			if (!conversations) return;

			return conversations.map(conversation => {
				let isSelected = (self.props.currentConversation && self.props.currentConversation.fb_id == conversation.fb_id);
				return <FmsClientItem data={conversation} key={conversation.fb_id} handleClientClick={self.handleClientClick} isSelected={isSelected}/>
			});
		};
		let showSpin = (this.props.showSpin == true) ? "" : " hide";

		return (
			<div>
				<div className="search-client">
					<img src={searchImg} className="search-icon"/>
					<input type="text" className="input-search-client" />
				</div>
				<div>
					{renderClients()}
				</div>
				<div className={"client-list-spin" + showSpin}>
					<FmsSpin size={27}/>
				</div>
			</div>
		);
	}
});

module.exports = FmsClientList;
