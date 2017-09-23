'use strict';

const React = require('react');
const { browserHistory } = require('react-router');

let DashboardAPI = require('DashboardAPI');
let FmsConversationArea = require('FmsConversationArea');
let FmsClientList = require('FmsClientList');

let projectApi = require('ProjectApi');
let PagesAPI = require('PagesAPI');
let socket = require('Socket');
let FmsClientInformation = require('FmsClientInformation');
let FmsVerticalNav = require('FmsVerticalNav');
let filters = require('FmsFilterConversation').filters;

let FmsDashBoard = React.createClass({
	getInitialState: function () {
		return {
			conversations: [],
			filteredConversations: [],
			selectedConversation: null,
			project: null,
			filters: filters,
			pageid: null
		}
	},
	handleFilter: function (newFilters) {
		this.setState({ filters: newFilters });
		this.filterConversations();
	},
	filterConversations: function () {
		let newConversations = this.state.conversations;
		this.state.filters.map((filter) => {
			if (filter.isActive == true) {
				newConversations = newConversations.filter(filter.filterFunc);
			}
		});
		this.setState({ filteredConversations: newConversations });
		if (newConversations.length < 10) this._child.loadMoreConversations();
	},
	parseConversationItem: function (item) {
		switch (item.type) {
			case "inbox":
				break;
			case "comment":
				item.customer = item.from;
				break;
		}

		return item;
	},
	updateConversation: function () {
		let self = this;

		DashboardAPI.getConversations(this.state.pageid).then((data) => {
			let _convers = [];

			for (let inbox of data.inboxes) {
				inbox.type = "inbox";
				inbox = self.parseConversationItem(inbox);
			}

			for (let comment of data.comments) {
				comment.type = "comment";
				comment = self.parseConversationItem(comment);
			}

			_convers = _convers.concat(data.inboxes)
				.concat(data.comments)
				.sort((a, b) => {
					let t1 = new Date(a.updated_time);
					let t2 = new Date(b.updated_time);

					return t2 - t1;
				});

			self.setState({
				conversations: _convers,
				filteredConversations: _convers
			});
		}, function (err) {
			console.log(err);
		})
	},
	postSeenCv: function (conversation) {
		if (conversation.type == 'inbox') {
			DashboardAPI.postSeenInbox(conversation.fb_id);
		} else if (conversation.type == 'comment') {
			DashboardAPI.postSeenCmt(conversation.fb_id);
		}
	},
	postRepMsg: function (conversation, message) {
		let self = this;

		function createTempMsg(fb_id, msg, conversation) {
			let itemMsg = {
				fb_id,
				message: msg,
				from: {
					id: self.state.pageid
				},
				parent: conversation
			}

			return itemMsg;
		}

		if (conversation.type == 'inbox') {
			DashboardAPI.postRepInboxMsg(conversation.fb_id, message)
				.then(data => {
					let msgInbox = createTempMsg(data.id, message, conversation);

					self.updateMsgInConversation(msgInbox);
				})
				.catch(err => alert(err.message));
		} else if (conversation.type == 'comment') {
			DashboardAPI.postRepCmtMsg(conversation.fb_id, message)
				.then(data => {
					let msgInbox = createTempMsg(data.id, message, conversation);

					self.updateMsgInConversation(msgInbox);
				})
				.catch(err => alert(err.message));
		}
	},
	handleClientClick: function (fb_id, type) {
		let self = this;

		let _conversations = this.state.conversations;
		let _selectedConversation = _conversations
			.filter((currConversation) => { return currConversation.fb_id == fb_id })
			.pop();

		if (!_selectedConversation.is_seen) {
			_selectedConversation.is_seen = true;
			self.postSeenCv(_selectedConversation);
		}

		if (!_selectedConversation.children) {
			let updateChildren = (msgs) => {
				let _selectedConversation = this.state.selectedConversation;
				_selectedConversation.children = msgs;
				this.setState({ selectedConversation: _selectedConversation });
			}

			if (type == "inbox") {
				DashboardAPI.getMessageInbox(fb_id)
					.then(data => updateChildren(data.data))
			} else if (type == "comment") {
				DashboardAPI.getReplyComment(fb_id)
					.then(data => updateChildren(data.data))
			}
		}

		this.setState({ selectedConversation: _selectedConversation });
	},
	displayMoreConversations: function (newConversations) {
		this.setState({ conversations: newConversations });
		this.filterConversations();
	},
	displayMoreMessages: function (newConversation) {
		this.setState({ selectedConversation: newConversation });
	},
	sendMessage: function (msg) {
		let self = this;
		let _selectedConversation = this.state.selectedConversation;

		self.postRepMsg(_selectedConversation, msg);
	},
	updateMsgInConversation: function (msg) {
		let self = this;
		console.log('updateMsgInConversation', msg);
		if (!msg || !msg.parent || !msg.parent.type) return;

		let _conversations = self.state.conversations;
		let parentConversations = _conversations.filter((c) => { return c.fb_id == msg.parent.fb_id });
		let parent = null;

		if (parentConversations.length == 0) {
			// if conversation is not found in current conversations -> create as new conversation and push to first
			parent = self.parseConversationItem(msg.parent);
			_conversations.unshift(parent);
		} else {
			parent = parentConversations.pop();

			// check if this msg is exists in msg list
			function isMsgExist(msg, listMsg) {
				if (!listMsg || !Array.isArray(listMsg) || listMsg.length == 0) {
					return false;
				}
				let filterArr = listMsg.filter((currMsg) => { return currMsg.fb_id == msg.fb_id });

				return (filterArr.length == 0) ? false : filterArr.pop();
			}

			let tempMsg = isMsgExist(msg, parent.children);
			if (tempMsg) {
				// just update msg in list && post seen
				let updatedMsgList = parent.children.map((item) => {
					if (item.fb_id == tempMsg.fb_id) {
						return msg;
					} else {
						return item;
					}
				});

				parent.children = updatedMsgList;

				// update parent conversation in current conversations
				_conversations = _conversations.map(parentCv => {
					if (parentCv.fb_id == parent.fb_id) {
						return parent;
					} else {
						return parentCv;
					}
				})

				self.postSeenCv(parent);

			} else {
				//this msg is not exists -> add to msg list and update parent
				let _selectedConversation = self.state.selectedConversation;
				if (_selectedConversation && (_selectedConversation.fb_id == parent.fb_id)) {
					parent.is_seen = true;
					self.postSeenCv(parent);
				} else {
					parent.is_seen = false;
				}

				if (Array.isArray(parent.children)) {
					parent.children.push(msg);
				}

				parent.snippet = msg.message;

				let filterConversations = _conversations.filter((c) => { return c.fb_id != parent.fb_id });
				filterConversations.unshift(parent);
				_conversations = filterConversations;
			}
		}

		self.setState({ conversations: _conversations });
		self.filterConversations();
	},
	subscribePageChanges: function (pages) {
		let self = this;

		// for test only
		// let page = pages.pop();
		// socket.subscribePageChanges({ page_fb_id: page.fb_id, onUpdateChanges: self.updateMsgInConversation });

		pages.forEach(page => {
			socket.subscribePageChanges({ page_fb_id: page.fb_id, onUpdateChanges: self.updateMsgInConversation });
		});
	},
	componentDidMount: function () {
		let self = this;

		console.log('params', this.props.params);
		let projectAlias = this.props.params.alias;

		projectApi.getProject(projectAlias)
			.then(project => {
				let pages = project.pages;
				let pageid = pages[0].fb_id;

				self.setState({ pageid: pageid });
				self.updateConversation();
				self.subscribePageChanges(pages);
			})
			.catch(err => alert(err));
	},
	render: function () {
		let self = this;

		function renderConversation() {
			if (self.state.selectedConversation) {
				return <FmsConversationArea currentConversation={self.state.selectedConversation} pageid={self.state.pageid} 
				sendMessage={self.sendMessage} displayMoreMessages={self.displayMoreMessages}/>
			} else {
				return <div className="notifiy-no-conversation">Bạn chưa chọn cuộc hội thoại nào!</div>
			}
		};

		return (
			<div className="dashboard page">
				<div className="vertical-nav">
					<FmsVerticalNav state={this.state.filters} handleFilter={this.handleFilter} />
				</div>
				<div className="client-list">
					<FmsClientList ref={(child) => {
						this._child = child;
					}} handleClientClick={this.handleClientClick} conversations={this.state.filteredConversations}
						currentConversation={this.state.selectedConversation} displayMoreConversations={this.displayMoreConversations}
						allConversations={this.state.conversations} />
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
