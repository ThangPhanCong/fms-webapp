'use strict';

const React = require('react');
const { browserHistory } = require('react-router');

let DashboardAPI = require('DashboardAPI');
let FmsConversationArea = require('FmsConversationArea');
let FmsClientList = require('FmsClientList');
let PagesAPI = require('PagesAPI');
let socket = require('Socket');
let FmsClientInformation = require('FmsClientInformation');
let FmsVerticalNav = require('FmsVerticalNav');

let FmsDashBoard = React.createClass({
	getInitialState: function () {
		return {
			currentConversation: undefined,
			conversations: []
		}
	},
	handleClientClick: function (fb_id) {
		for (let conversation of this.state.conversations) {
			if (conversation.fb_id == fb_id) {
				this.setState({ currentConversation: conversation });
				break;
			}
		}
	},
	componentWillMount: function () {
		this.setState({
			conversations: DashboardAPI.getConversations()
		});
		let that = this;
		PagesAPI.getPages().then(function (pages) {
			if (!pages.active) browserHistory.replace('/');
			else {
				let linkIsOK = false;
				pages.active.map(function (page) {
					let nameInListPages = page.fb_id;
					let nameInUrl = that.props.location.pathname.slice(1);
					if (nameInUrl == nameInListPages) linkIsOK = true;
				});
				if (!linkIsOK) browserHistory.replace('/');
			}
		}, function (err) {
			console.log(err);
		});
	},
  componentDidMount: function() {
    socket.subscribePage('132413412341234');
  },
	render: function () {
		return (
			<div className="dashboard">
				<div className="vertical-nav">
					
				</div>
				<div className="row working-area">
					<div className="col-xs-4 col-md-3 client-list">
						<FmsClientList handleClientClick={this.handleClientClick} conversations={this.state.conversations} />
					</div>
					<div className="col-xs-8 col-md-6 conversation-area">
						<FmsConversationArea currentConversation={this.state.currentConversation} />
					</div>
					<div className="client-information-area col-md-3">
						<FmsClientInformation/>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = FmsDashBoard;
