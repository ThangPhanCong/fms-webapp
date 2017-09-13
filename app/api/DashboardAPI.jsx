'use strict';

let apiSender = require('ApiSender');

module.exports = {
	getConversations: function (page_id) {
		let route = `/api/pages/${page_id}/conversations`;
		return apiSender.get(route);
	},
	getMessageInbox: function (inbox_id) {
		let route = `/api/inbox/${inbox_id}/messages`;
		return apiSender.get(route);
	},
	getReplyComment: function (comment_id) {
		let route = `/api/comment/${comment_id}/comments`;
		return apiSender.get(route);
	},
	postSeenCmt: function (comment_id) {
		let route = `/api/comment/${comment_id}/seen`;
		return apiSender.post(route);
	},
	postSeenInbox: function (inbox_id) {
		let route = `/api/inbox/${inbox_id}/seen`;
		return apiSender.post(route);
	}
}
