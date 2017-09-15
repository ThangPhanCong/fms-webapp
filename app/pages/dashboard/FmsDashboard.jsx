'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
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
			conversations: [],
			showSpin: false,
			selectedConversation: null,
			pageid: null
		}
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

		DashboardAPI.getConversations(this.state.pageid).then(function (res) {
			let _convers = [];

			for (let inbox of res.inboxes) {
				inbox.type = "inbox";
				inbox = self.parseConversationItem(inbox);
			}

			for (let comment of res.comments) {
				comment.type = "comment";
				comment = self.parseConversationItem(comment);
			}

			_convers = _convers.concat(res.inboxes)
				.concat(res.comments)
				.sort((a, b) => {
					let t1 = new Date(a.updated_time);
					let t2 = new Date(b.updated_time);

					return t2 - t1;
				});

			self.setState({ conversations: _convers });
		}, function (err) {
			throw new Error(err);
		})
	},
	postSeenCv: function (conversation) {
		if (conversation.type == 'inbox') {
			DashboardAPI.postSeenInbox(conversation.fb_id);
		} else if (conversation.type == 'comment') {
			DashboardAPI.postSeenCmt(conversation.fb_id);
		}
	},
	addTempItemMsg: function (msg, _conversation) {

	},
	postRepMsg: function (conversation, message) {
		let self = this;

		function createTempMsg (fb_id, msg, conversation) {
			let itemMsg = {
				fb_id,
				message: msg,
				from: {
					// todo: delete test, update page id
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
					.then(updateChildren)
			} else if (type == "comment") {
				DashboardAPI.getReplyComment(fb_id)
					.then(updateChildren)
			}
		}

		this.setState({ selectedConversation: _selectedConversation });
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
			function isMsgExist (msg, listMsg) {
				if (!listMsg || !Array.isArray(listMsg) || listMsg.length == 0) {
					return false;
				}
				let filterArr = listMsg.filter((currMsg) => {return currMsg.fb_id == msg.fb_id});

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

				// parent.children.push(msg);
				parent.snippet = msg.message;

				let filterConversations = _conversations.filter((c) => { return c.fb_id != parent.fb_id });
				filterConversations.unshift(parent);
				_conversations = filterConversations;
			}

			// _conversations = filterConversations;
		}

		self.setState({ conversations: _conversations });
	},
	componentWillMount: function () {
		let self = this;

		let subscribePageChanges = (page_fb_id) => {
			socket.subscribePageChanges({ page_fb_id, onUpdateChanges: self.updateMsgInConversation });
		};

		// TODO: refactor
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
	loadMoreConversations: function () {
		let newConversations = this.state.conversations.concat(DashboardAPI.getMoreConversations());

		console.log('newConversations', newConversations);

		this.setState({ showSpin: true });

		setTimeout(() => {
			this.setState({
				showSpin: false,
				conversations: newConversations
			});
		}, 1000);
	},
	componentDidMount: function () {
		let self = this;

		const list = ReactDOM.findDOMNode(this.refs.list);
		list.addEventListener('scroll', () => {
			if ($(list).scrollTop() + $(list).innerHeight() >= $(list)[0].scrollHeight - 32) {
				self.loadMoreConversations();
			}
		})
	},
	render: function () {
		let self = this;

		function renderConversation() {
			if (self.state.selectedConversation) {
				return <FmsConversationArea currentConversation={self.state.selectedConversation} pageid={self.state.pageid} sendMessage={self.sendMessage} />
			} else {
				return <div className="notifiy-no-conversation">Bạn chưa chọn cuộc hội thoại nào!</div>
			}
		};

		return (
			<div className="dashboard page">
				<div className="vertical-nav">
					<FmsVerticalNav />
				</div>
				<div className="client-list" ref="list">
					<FmsClientList handleClientClick={this.handleClientClick} conversations={this.state.conversations}
						currentConversation={this.state.selectedConversation} showSpin={this.state.showSpin} />
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
