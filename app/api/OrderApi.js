let apiSender = require('./ApiSender');

module.exports = {
  createNote: (alias, conv_id, customer_id, page_id, content) => {
		let route = `/api/projects/${alias}/conversations/${conv_id}/notes`;
		let payload = {
			customer_id: customer_id,
			page_id: page_id,
			content: content
		}
		return apiSender.post(route, payload);
	},
	getNotes: (alias, conv_id) => {
		let route = `/api/projects/${alias}/conversations/${conv_id}/notes`;
		return apiSender.get(route);
	},
	updateNote: (alias, conv_id, note_id, content) => {
		let route = `/api/projects/${alias}/conversations/${conv_id}/notes/${note_id}`;
		let payload = { content };
		apiSender.put(route, payload);
	},
	deleteNote: (alias, conv_id, note_id) => {
		let route = `/api/projects/${alias}/conversations/${conv_id}/notes/${note_id}`;
		apiSender.delete(route);
	},
	createOrder: (alias, customer_id, payload) => {
		let route = `/api/projects/${alias}/customers/${customer_id}/orders`;
		return apiSender.post(route, payload);
	},
	getOrders: (alias, customer_id, page_fb_id) => {
		let route = `/api/projects/${alias}/customers/${customer_id}/orders?pageFbId=${page_fb_id}`;
		return apiSender.get(route);
	}
}