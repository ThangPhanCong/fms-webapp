'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');

let FmsClientItem = require('FmsClientItem');
let DashboardAPI = require('DashboardAPI');

let FmsClientList = React.createClass({
	getInitialState: function () {
		return {
			hide: false
		}
	},
	handleClientClick: function (fb_id) {
		this.props.handleClientClick(fb_id);
	},
	hideClientList: function () {
		if ($(window).width() < 1000 && !this.state.hide) this.setState({ hide: true });
		else if ($(window).width() >= 1000 && this.state.hide) this.setState({ hide: false });
	},
	componentDidMount: function() {
		window.addEventListener("resize", this.hideClientList);
  },
	render: function () {
		let self = this;
		let renderClients = function () {
			let conversations = self.props.conversations;
			return conversations.map(function (conversation) {
				return <FmsClientItem data={conversation} key={conversation.fb_id} handleClientClick={self.handleClientClick} hide={self.state.hide}/>
			});
		};
		return (
			<div>
				<div className={"search-client" + ((this.state.hide == true) ? " hide" : "")}>
					<img src="/img/search.png" className="search-icon" />
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