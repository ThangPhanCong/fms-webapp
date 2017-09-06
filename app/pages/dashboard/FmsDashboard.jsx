'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const { browserHistory } = require('react-router');
const $ = require('jquery');

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
			currentConversation: null,
			conversations: [],
			resized: false
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
	resizeComponents: function () {
		if ($(window).width() < 1000 && !this.state.resized) this.setState({ resized: true });
		else if ($(window).width() >= 1000 && this.state.resized) this.setState({ resized: false });
	},
  componentDidMount: function() {
    socket.subscribePage('132413412341234');
		window.addEventListener("resize", this.resizeComponents);
  },
	render: function () {
		let self = this;
		function renderConversation() {
			if (self.state.currentConversation) {
				return <FmsConversationArea currentConversation={self.state.currentConversation} />
			} else {
				return <div className="notifiy-no-conversation">Bạn chưa chọn cuộc hội thoại nào!</div>
			}
		};
		let clientListClass, conversationClass, clientInfoClass, resizedWidth = "";
		if (this.state.resized == true) {
			clientListClass = "col-xs-2";
			conversationClass = "col-xs-6 negative-margin";
			clientInfoClass = "col-xs-4";
			resizedWidth = " resized-width"
		} else {
			clientListClass = "col-md-3";
			conversationClass = "col-md-6";
			clientInfoClass = "col-md-3";
		}
		return (
			<div className="dashboard">
				<div className="vertical-nav">
					<FmsVerticalNav/>
				</div>
				<div className="row working-area">
					<div className={clientListClass}>
						<div className={"client-list" + resizedWidth}>
							<FmsClientList handleClientClick={this.handleClientClick} conversations={this.state.conversations}/>
						</div>
					</div>
					<div className={conversationClass}>
						<div className="conversation-area">
							{renderConversation()}
						</div>
					</div>
					<div className={clientInfoClass} ref="clientInfo">
						<div className="client-information-area">
							<FmsClientInformation/>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = FmsDashBoard;
