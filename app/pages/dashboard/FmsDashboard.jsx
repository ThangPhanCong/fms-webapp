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
			currentConversation: null, // array
			conversations: [],
			// TODO: check in child component
			selectedConversation: null,
			pageid: null
		}
	},
	parseConversationItem: function (item) {
		switch (item.type) {
			case "inbox":

				return item;
			case "comment":
				item.customer = item.from;
				item.snippet = item.message;
				return item;
		}
	},
	updateConversation: function () {
		let self = this;

		DashboardAPI.getConversations(this.state.pageid).then(function (res) {
			let _convers = [];

			for (let inbox of res.inboxes) {
				inbox.type = "inbox";
				inbox = self.parseConversationItem(inbox);
			}

			for (let comment of res.comments) {
				comment.type = "comment";
				// comment.customer = comment.from;
				// comment.snippet = comment.message;
				comment = self.parseConversationItem(comment);
			}

			_convers = _convers.concat(res.inboxes)
									.concat(res.comments)
									.sort((a, b) => { return a.updated_time > b.updated_time });

			self.setState({ conversations: _convers });
		}, function (err) {
			throw new Error(err);
		})
	},
	handleClientClick: function (fb_id, type) {
		let self = this;

		let _conversations = this.state.conversations;
		let _selectedConversation = _conversations.filter((currConversation) => {return currConversation.fb_id == fb_id})[0];

		console.log('selectedConversation', _selectedConversation);

		this.setState({selectedConversation: _selectedConversation});

		let updateChildren = (msgs) => {
			// console.log('updateChildren msgs', msgs);
			let _selectedConversation = this.state.selectedConversation;
			_selectedConversation.children = msgs;

			this.setState({selectedConversation: _selectedConversation});
		}

		if (type == "inbox") {
			DashboardAPI.getMessageInbox(fb_id)
				.then(updateChildren)
				.catch(err => console.log(err));
		} else if (type == "comment") {
			DashboardAPI.getReplyComment(fb_id)
				.then(updateChildren)
				.catch(err => console.log(err));
		}
	},
	sendMessage: function (msg) {
		// TODO: send API send msg, like, rep-cmt, hide-cmt, del-cmt
		alert(msg);
	},
	componentWillMount: function () {
		let self = this;

		let subscribePageChanges = (page_fb_id) => {

				let onUpdateChanges = (msg) => {
		      console.log('onUpdateChanges msg', msg);
					// parent : inbox | comment
					let _conversations = self.state.conversations;
					let updatedConversations = _conversations.filter((c) => {return c.fb_id == msg.parent.fb_id})
					let parent = null;

					if (updatedConversations.length == 0) {
						parent = self.parseConversationItem(msg.parent);
						_conversations.unshift(parent);
					} else {
						parent = updatedConversations[0];
						parent.children.push(msg);
					}

					self.setState({conversations: _conversations});
		    };

				socket.subscribePageChanges({page_fb_id, onUpdateChanges});
		};

		PagesAPI.getPages()
			.then(function (pages) {
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
							subscribePageChanges(page.fb_id);
						}
					});
					if (!linkIsOK) browserHistory.replace('/');
				}
			})
			.catch(err => console.log(err));
	},
	render: function () {
		let self = this;

		function renderConversation() {
			if (self.state.selectedConversation) {
				return <FmsConversationArea currentConversation={self.state.selectedConversation} pageid={self.state.pageid} sendMessage={self.sendMessage}/>
			} else {
				return <div className="notifiy-no-conversation">Bạn chưa chọn cuộc hội thoại nào!</div>
			}
		};

		return (
			<div className="dashboard page">
				<div className="vertical-nav">
					<FmsVerticalNav />
				</div>
				<div className="client-list">
					<FmsClientList handleClientClick={this.handleClientClick} conversations={this.state.conversations} />
				</div>
				<div className="conversation-area">
					{renderConversation()}
				</div>
				<div className="client-information-area">
					<FmsClientInformation />
				</div>
			</div>
		);
	}
});

module.exports = FmsDashBoard;
