'use strict';

let apiSender = require('ApiSender');

module.exports = {
	getConversations: function (alias, next) {
		let route = `/api/projects/${alias}/conversations`;
		if (next) route += `?next=${next}`;
		return apiSender.get(route);
	},
	getMessageInbox: function (inbox_id, next) {
		let route = `/api/inboxes/${inbox_id}/messages`;
		if (next) route += `?next=${next}`;
		return apiSender.get(route);
	},
	getReplyComment: function (comment_id, next) {
		let route = `/api/comments/${comment_id}/comments`;
		if (next) route += `?next=${next}`;
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
	postRepCmtMsg: function (cmt_id, message, attachment_url) {
		let route = `/api/comments/${cmt_id}/sendmsg`;
		let payload = {};
		if (message) {
			payload.message = message;
		}
		if (attachment_url) {
			payload.attachment_url = attachment_url;
		}
		return apiSender.post(route, payload);
	},
	getPostInfo: (post_id) => {
		let route = `/api/posts/${post_id}`;
		return apiSender.get(route);
	},
	getAccessToken: (page_id) => {
		let route = `/api/pages/${page_id}/access-token`;
		return apiSender.get(route);
	},
	getMessageAttachment: (msg_id, page_id) => {
		let route = `/${msg_id}?fields=attachments`;
		return apiSender.getGraphApi(route, page_id);
	},
	getCommentAttachment: (comment_id, page_id) => {
		let route = `/${comment_id}?fields=attachment`;
		return apiSender.getGraphApi(route, page_id);
	},
	getMessageShare: (msg_id, page_id) => {
		let route = `/${msg_id}?fields=shares{link}`;
		return apiSender.getGraphApi(route, page_id);
	},
	postPrivateReplyMessage: (comment_id, message) => {
		let route = `/api/comments/${comment_id}/private_replies`;
		let payload = { message };
		return apiSender.post(route, payload);
	},
	getProjectTags: (alias) => {
		let route = `/api/projects/${alias}/tags`;
		return apiSender.get(route);
	}
}
