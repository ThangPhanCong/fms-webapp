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
		if (type == "comment") route = `/api/comments/${msg_id}/reply-comments`;
		else route = `/api/inboxes/${msg_id}/messages`;
		if (next) route += `?next=${next}`;
		return apiSender.get(route);
	},
	postSeenCmt: function (comment_id) {
		let route = `/api/comments/${comment_id}`;
		let payload = { seen: true };
		return apiSender.put(route, payload);
	},
	postSeenInbox: function (inbox_id) {
		let route = `/api/inboxes/${inbox_id}`;
		let payload = { seen: true };
		return apiSender.put(route, payload);
	},
	postRepInboxMsg: function (inbox_id, message) {
		let route = `/api/inboxes/${inbox_id}/messages`;
		let payload = { message };
		return apiSender.post(route, payload);
	},
	postRepCmtMsg: function (cmt_id, message, attachment_url) {
		let route = `/api/comments/${cmt_id}/reply-comments`;
		let payload = {};
		if (message) payload.message = message;
		if (attachment_url) payload.attachment_url = attachment_url;
		return apiSender.post(route, payload);
	},
	blockCustomer: (page_id, customer_fb_id, state) => {
    let route = `/api/pages/${page_id}/customers/${customer_fb_id}`;
    let payload = {
      block: state
    }
    return apiSender.put(route, payload);
  },
	postPrivateReplyMessage: (comment_id, message) => {
		let route = `/api/comments/${comment_id}/private-replies`;
		let payload = { message };
		return apiSender.post(route, payload);
	},
	likeMessage: (comment_id, state) => {
		let route = `/api/comments/${comment_id}`;
		let payload = { like: state };
		return apiSender.put(route, payload);
	},
	updateExpiredAttachmentMsg: (type, msg_id, conv_id) => {
		let route, payload;
		if (type == "comment") {
			route = `/api/comments/${msg_id}`;
			payload = { attachment: true };
		} else {
			route = `/api/inboxes/${conv_id}/messages/${msg_id}`;
			payload = { attachments: true };
		}
		return apiSender.put(route, payload);
	}
}
