'use strict';

import React from 'react';

import DashboardApi from 'DashboardApi';
import FmsConversationArea from 'FmsConversationArea';
import FmsClientList from 'FmsClientList';
import projectApi from 'ProjectApi';
import PagesApi from 'PagesApi';
import FmsClientInformation from 'FmsClientInformation';
import FmsVerticalNav from 'FmsVerticalNav';
import {filters} from 'FmsFilterConversation';

let FmsDashBoard = React.createClass({
	getInitialState: function () {
		return {
			conversations: [],
			filteredConversations: [],
			selectedConversation: null,
			project: null,
			filters: filters,
			conversationsIsLoading: false,
			conversationsPaging: null,
			tags: null,
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
		//if (newConversations.length < 10) this._child.loadMoreConversations();
	},
	parseConversationItem: function (item) {
		switch (item.type) {
			case "inbox":
				break;
			case "comment":
				break;
		}

		return item;
	},
	updateConversation: function () {
		let self = this;

		DashboardApi.getConversations(this.props.match.params.project_alias).then((data) => {
			let _convers = data.data;
			_convers = _convers.sort((a, b) => {
				let t1 = new Date(a.updated_time);
				let t2 = new Date(b.updated_time);

				return t2 - t1;
			});

			self.setState({
				conversations: _convers,
				filteredConversations: _convers,
				conversationsPaging: (data.paging && data.paging.next) ? data.paging.next : null
			});
		}, function (err) {
			console.log(err);
		})
	},
	postSeenCv: function (conversation) {
		if (conversation.type == 'inbox') {
			DashboardApi.postSeenInbox(conversation.fb_id);
		} else if (conversation.type == 'comment') {
			DashboardApi.postSeenCmt(conversation.fb_id);
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
				updated_time: Date.now(),
				parent: conversation
			}

			return itemMsg;
		}

		if (conversation.type == 'inbox') {
			DashboardApi.postRepInboxMsg(conversation.fb_id, message)
				.then(data => {
					let msgInbox = createTempMsg(data.id, message, conversation);

					self.updateMsgInConversation(msgInbox);
				})
				.catch(err => alert(err.message));
		} else if (conversation.type == 'comment') {
			DashboardApi.postRepCmtMsg(conversation.fb_id, message)
				.then(data => {
					let msgInbox = createTempMsg(data.id, message, conversation);

					self.updateMsgInConversation(msgInbox);
				})
				.catch(err => alert(err.message));
		}
	},
	reloadAttachment: function (msgs) {
		msgs.forEach((msg) => {
			if (msg.shares) {
				DashboardApi.getMessageShare(msg.fb_id, msg.page_fb_id).then((res) => {
					msg.shares = res.data.shares;
				}, (err) => {
					throw new Error(err);
				});
			} else if (msg.attachment && (msg.attachment.type == 'sticker' || msg.attachment.type == 'photo' ||
				msg.attachment.type == 'video_inline' || msg.attachment.type == 'share')) {
				DashboardApi.getCommentAttachment(msg.fb_id, msg.page_fb_id).then((res) => {
					msg.attachment = res.data.attachment;
				}, (err) => {
					throw new Error(err);
				});
			} else if (msg.attachments) {
				DashboardApi.getMessageAttachment(msg.fb_id, msg.page_fb_id).then((res) => {
					msg.attachments = res.data.attachments;
				}, (err) => {
					throw new Error(err);
				});
			}
		});
	},
	handleClientClick: function (fb_id, type) {
		let self = this;
		if (this._child2) this._child2.clientChanged();
		this.setState({ conversationsIsLoading: true });

		let _conversations = this.state.conversations;
		let _selectedConversation = _conversations
			.filter((currConversation) => { return currConversation.fb_id == fb_id })
			.pop();

		if (!_selectedConversation.is_seen) {
			_selectedConversation.is_seen = true;
			self.postSeenCv(_selectedConversation);
		}

		this.setState({ selectedConversation: _selectedConversation });

		if (!_selectedConversation.children) {
			let updateChildren = (data) => {
				let _selectedConversation = this.state.selectedConversation;
				_selectedConversation.children = data.data;
				_selectedConversation.paging = (data.paging) ? data.paging.next : null;
				this.reloadAttachment(data.data);
				this.setState({
					selectedConversation: _selectedConversation,
					conversationsIsLoading: false,
				});
			}

			if (type == "inbox") {
				DashboardApi.getMessageInbox(fb_id)
					.then(data => updateChildren(data))
			} else if (type == "comment") {
				DashboardApi.getReplyComment(fb_id)
					.then(data => updateChildren(data))
			}
		} else {
			this.setState({
				selectedConversation: _selectedConversation,
				conversationsIsLoading: false
			});
		}
	},
	displayMoreConversations: function (moreConversations, paging) {
		let newConversations = this.state.conversations;
		moreConversations.forEach((conversation) => {
			newConversations.push(conversation);
		});
		this.setState({ conversations: newConversations, conversationsPaging: paging });
		this.filterConversations();
	},
	displayMoreMessages: function (more, paging) {
		let newConversation = this.state.selectedConversation;
		let oldChildren = this.state.selectedConversation.children;
		let children = more.sort((a, b) => {
			let t1 = new Date(a.updated_time);
			let t2 = new Date(b.updated_time);
			return t2 - t1;
		});
		this.reloadAttachment(children);
		oldChildren.forEach((child) => {
			children.push(child);
		});
		newConversation.children = children;
		newConversation.paging = paging;
		this.setState({ selectedConversation: newConversation });
	},
	sendMessage: function (msg) {
		let self = this;
		let _selectedConversation = this.state.selectedConversation;

		self.postRepMsg(_selectedConversation, msg);
	},
	updateMsgInConversation: function (msg) {
		let self = this;
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

		pages.forEach(page => {
			self.props.socket.subscribePageChanges({ page_fb_id: page.fb_id, onUpdateChanges: self.updateMsgInConversation });
		});
	},
	updateBlockCustomer: function (cv, is_blocked) {
		let self = this;

		cv.customer.is_blocked = is_blocked;

		let _conversations = self.state.conversations.map(_cv => (cv.fb_id == _cv.fb_id) ? cv : _cv);

		self.setState({
			conversations: _conversations,
		})

		let _selectedConversation = this.state.selectedConversation;
		if (_selectedConversation.fb_id == cv.fb_id) {
			self.setState({
				selectedConversation: cv
			});
		}
	},
	updateClientTags: function (tags, conversation_id) {
		let newConversations = this.state.conversations;
		newConversations.forEach((convers) => {
			if (convers.fb_id == conversation_id) {
				convers.tags = tags;
			}
		});
		this.setState({ conversations: newConversations });
	},
	componentDidMount: function () {
		let self = this;

		let projectAlias = this.props.match.params.project_alias;

		projectApi.getProject(projectAlias)
			.then(project => {
				let pages = project.pages;
				let pageid = pages[0].fb_id;

				self.setState({ pageid: pageid });
				self.updateConversation();
				self.subscribePageChanges(pages);
			})
			.catch(err => alert(err));
			DashboardApi.getProjectTags(this.props.match.params.project_alias).then((res) => {
				res.forEach((tag) => {
					filters.push({
						isTag: true,
						type: tag._id,
						isActive: false,
						filterFunc: (item) => {
							let isOK = item.tags.filter((_tag) => {return _tag._id == tag._id});
							return isOK.length != 0;
						}
					});
				});
				this.setState({ tags: res, filters: filters });
			}, (err) => {
				throw new Error(err);
			});
	},
	render: function () {
		let self = this;

		function renderConversation() {
			if (self.state.selectedConversation) {
				return <FmsConversationArea ref={(child) => {
					self._child2 = child;
				}} currentConversation={self.state.selectedConversation} pageid={self.state.pageid} sendMessage={self.sendMessage} 
					tags={self.state.tags} displayMoreMessages={self.displayMoreMessages} alias={self.props.match.params.project_alias}
					isLoading={self.state.conversationsIsLoading} updateBlockCustomer={self.updateBlockCustomer} 
					noti={self.props.noti} updateClientTags={self.updateClientTags}/>
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
						allConversations={this.state.conversations} paging={this.state.conversationsPaging}
						alias={this.props.match.params.project_alias} tags={this.state.tags}
						filters={this.state.filters} handleFilter={this.handleFilter}/>
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
