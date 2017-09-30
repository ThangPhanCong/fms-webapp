'use strict';

let apiSender = require('ApiSender');

module.exports = {
	getConversations: function (page_id) {
		let route = `/api/pages/${page_id}/conversations`;
		return apiSender.get(route);
	},
	getMessageInbox: function (inbox_id, paging) {
		let route = `/api/inboxes/${inbox_id}/messages`;
		if (paging || paging == "") route += `?next=${paging}`;
		return apiSender.get(route);
	},
	getReplyComment: function (comment_id, paging) {
		let route = `/api/comments/${comment_id}/comments`;
		if (paging) route += `?next=${paging}`;
		return apiSender.get(route);
	},
	postSeenCmt: function (comment_id) {
		let route = `/api/comments/${comment_id}/seen`;
		return apiSender.post(route);
	},
	postSeenInbox: function (inbox_id) {
		let route = `/api/inboxes/${inbox_id}/seen`;
		return apiSender.post(route);
	},
	postRepInboxMsg: function (inbox_id, message) {
		let route = `/api/inboxes/${inbox_id}/sendmsg`;
		let payload = { message };
		return apiSender.post(route, payload);
	},
	postRepCmtMsg: function (cmt_id, message) {
		let route = `/api/comments/${cmt_id}/sendmsg`;
		let payload = { message };
		return apiSender.post(route, payload);
	},
	getMoreConversations: (page_id, next) => {
		let route = `/api/pages/${page_id}/conversations?next=${next}`;
		return apiSender.get(route);
	},
	getPostInfo: (post_id) => {
		let route = `/api/posts/${post_id}`;
		return apiSender.get(route);
	},
	getAccessToken: (page_id) => {
		let route = `/api/pages/${page_id}/access-token`;
		return apiSender.get(route);
	}
}
