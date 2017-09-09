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
			currentConversation: null,
			conversations: [],
			pageid: null
		}
	},
	updateConversation: function () {
		let self = this;
		DashboardAPI.getConversations(this.state.pageid).then(function (res) {
			let convers = [];
			for (let inbox of res.inboxes) {
				inbox.type = "inbox";
			}
			for (let comment of res.comments) {
				comment.type = "comment";
			}
			convers = convers.concat(res.inboxes).concat(res.comments);
			convers = convers.sort(function (a, b) { return a.updated_time > b.updated_time });
			self.setState({ conversations: convers });
		}, function (err) {
			throw new Error(err);
		})
	},
	handleClientClick: function (fb_id, type) {
		let self = this;
		if (type == "inbox") {
			DashboardAPI.getMessageInbox(fb_id).then(function (data) {
				self.setState({ currentConversation: data.reverse() });
			}, function (err) {
				throw new Error(err);
			})
		} else if (type == "comment") {
			DashboardAPI.getReplyComment(fb_id).then(function (data) {
				let newData = [];
				newData = newData.concat(data.parent).concat(data.childrent);
				self.setState({ currentConversation: newData });
			}, function (err) {
				throw new Error(err);
			})
		}
	},
	sendMessage: function (msg) {
		//check malicious injection
		alert(msg);
	},
	componentWillMount: function () {
		let self = this;
		PagesAPI.getPages().then(function (pages) {
			if (!pages.active) browserHistory.replace('/');
			else {
				let linkIsOK = false;
				pages.active.map(function (page) {
					let nameInListPages = page.fb_id;
					let nameInUrl = self.props.location.pathname.slice(1);
					if (nameInUrl == nameInListPages) {
						linkIsOK = true;
						self.setState({ pageid: page.fb_id });
						self.updateConversation();
					}
				});
				if (!linkIsOK) browserHistory.replace('/');
			}
		}, function (err) {
			console.log(err);
		});
	},
	componentDidMount: function () {
		socket.subscribePage('132413412341234');
		//window.addEventListener("resize", this.resizeComponents);
	},
	render: function () {
		let self = this;
		function renderConversation() {
			if (self.state.currentConversation) {
				return <FmsConversationArea currentConversation={self.state.currentConversation} pageid={self.state.pageid} sendMessage={self.sendMessage}/>
			} else {
				return <div className="notifiy-no-conversation">Bạn chưa chọn cuộc hội thoại nào!</div>
			}
		};
		return (
			<div className="dashboard page">
				<div className="vertical-nav">
					<FmsVerticalNav />
				</div>
				<div className="row working-area">
					<div className="col-xs-4 col-md-3">
						<div className="client-list">
							<FmsClientList handleClientClick={this.handleClientClick} conversations={this.state.conversations} />
						</div>
					</div>
					<div className="col-xs-8 col-md-6">
						<div className="conversation-area">
							{renderConversation()}
						</div>
					</div>
					<div className="col-md-3">
						<div className="client-information-area">
							<FmsClientInformation />
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = FmsDashBoard;
