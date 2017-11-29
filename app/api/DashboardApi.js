let apiSender = require('./ApiSender');

module.exports = {
	getConversations: function (alias, next, query) {
		let route = `/api/projects/${alias}/conversations`;
		if (next) route += `?next=${next}&limit=30`;
		else route += '?limit=30';
		if (query) {
			for (let prop in query) {
				route += `&${prop}=${query[prop]}`;
			}
		}
		return apiSender.get(route);
	},
	getMessages: function (type, msg_id, next) {
		let route;
		if (type == "comment") route = `/api/comments/${msg_id}/comments`;
		else route = `/api/inboxes/${msg_id}/messages`;
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
	postPrivateReplyMessage: (comment_id, message) => {
		let route = `/api/comments/${comment_id}/private_replies`;
		let payload = { message };
		return apiSender.post(route, payload);
	},
	getProjectTags: (alias) => {
		let route = `/api/projects/${alias}/tags`;
		return apiSender.get(route);
	},
	createTagConversation: (alias, conversation_id, tag_id) => {
		let route = `/api/projects/${alias}/conversations/${conversation_id}/tags`;
		let payload = {tag_id: tag_id};
		return apiSender.post(route, payload);
	},
	deleteTagConversation: (alias, conversation_id, tag_id) => {
		let route = `/api/projects/${alias}/conversations/${conversation_id}/tags/${tag_id}`;
		return apiSender.delete(route);
	},
	likeMessage: (comment_id) => {
		let route = `/api/comments/${comment_id}/like`;
		return apiSender.post(route);
	},
	unlikeMessage: (comment_id) => {
		let route = `/api/comments/${comment_id}/unlike`;
		return apiSender.post(route);
	},
	createNote: (conv_id, customer_id, page_id, content) => {
		let route = `/api/conversations/${conv_id}/notes`;
		let payload = {
			customer_id: customer_id,
			page_id: page_id,
			content: content
		}
		return apiSender.post(route, payload);
	},
	getNotes: (conv_id) => {
		let route = `/api/conversations/${conv_id}/notes`;
		return apiSender.get(route);
	},
	updateExpiredAttachment: (type, id) => {
		let route;
		if (type == "comment") route = `/api/comments/${id}/attachment`;
		else if (type == "inbox") route = `/api/inboxes/${id}/attachments`;
		else route = `/api/posts/${id}/attachments`;
		return apiSender.put(route);
	}
}
