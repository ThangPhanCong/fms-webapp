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
	},
	postRepInboxMsg: function (inbox_id, message) {
		let route = `/api/inbox/${inbox_id}/sendmsg`;
		let payload = {message};
		return apiSender.post(route, payload);
	},
	postRepCmtMsg: function (cmt_id, message) {
		let route = `/api/comment/${cmt_id}/sendmsg`;
		let payload = {message};
		return apiSender.post(route, payload);
	},
	getMoreConversations: function () {
		return [
			{
				"fb_id": "t_mid.$cAATa2eGB2fxkoPXIWFeb7B8WBlWZc",
				"page_fb_id": "1266831106759701",
				"customer": {
					"name": "Bùi Mạnh Thắng",
					"email": "1958682827749688@facebook.com",
					"id": "1958682827749688"
				},
				"link": "/Thính-Thơm-1266831106759701/manager/messages/?threadid=1966072130344091&folder=inbox",
				"updated_time": "2017-09-13T03:48:57.000Z",
				"can_reply": true,
				"is_seen": false,
				"snippet": ""
			},
			{
				"fb_id": "t_mid.$cAATa3matYKhkX_wJ7FeLrbA8kjCSc",
				"page_fb_id": "1266831106759701",
				"customer": {
					"name": "Nguyễn Tiến Minh",
					"email": "1525612837509232@facebook.com",
					"id": "1525612837509232"
				},
				"link": "/Thính-Thơm-1266831106759701/manager/messages/?threadid=1556380764432439&folder=inbox",
				"updated_time": "2017-09-13T03:43:32.000Z",
				"can_reply": true,
				"is_seen": false,
				"snippet": "ok men"
			},
			{
				"fb_id": "t_mid.$cAATa2Yo7jVpkql707VeeRmrN3JBoc",
				"page_fb_id": "1266831106759701",
				"customer": {
					"name": "Marus Nguyễn",
					"email": "2403826563175205@facebook.com",
					"id": "2403826563175205"
				},
				"link": "/Thính-Thơm-1266831106759701/manager/messages/?threadid=2403815593176302&folder=inbox",
				"updated_time": "2017-09-13T02:38:35.000Z",
				"can_reply": true,
				"is_seen": false,
				"snippet": "The Default Answer block is your bot's default response to any input from a user.\n\nTo change it, just open your bot’s dashboard on https://chatfuel.com.\n\nCreate messages in this block that will guide your users.\n\nMake sure to avoid creating conversation dead-ends. You can add buttons that lead users to other blocks.\n\nRemember to use “Set Up AI” to choose what blocks to show based on users' specific inputs."
			},
			{
				"fb_id": "t_mid.$cAATa2RaNsndkkZDnQFeYEubMup3Jc",
				"page_fb_id": "1266831106759701",
				"customer": {
					"name": "Phương Duy",
					"email": "873153999502249@facebook.com",
					"id": "873153999502249"
				},
				"link": "/Thính-Thơm-1266831106759701/manager/messages/?threadid=873140422836940&folder=inbox",
				"updated_time": "2017-09-12T18:13:50.000Z",
				"can_reply": true,
				"is_seen": false,
				"snippet": "Hi, Phương! Nice to meet you.\n\nYou successfully connected your bot created on https://chatfuel.com to your page.\n\nMessages from this block are shown to your users when they first start to chat with your bot.\n\nMake sure to never leave this block empty.\n\nIntroduce your new users to what your bot does and write something helpful to onboard them for the first time."
			},
			{
				"fb_id": "t_mid.$cAATa1TKF321kqCx0_1educrFvmkDc",
				"page_fb_id": "1266831106759701",
				"customer": {
					"name": "Nguyễn Trần Thuy Anh",
					"email": "124769624929031@facebook.com",
					"id": "124769624929031"
				},
				"link": "/Thính-Thơm-1266831106759701/manager/messages/?threadid=124429774963016&folder=inbox",
				"updated_time": "2017-09-12T16:23:37.000Z",
				"can_reply": true,
				"is_seen": false,
				"snippet": "Hi, Thuy Anh! Nice to meet you.\n\nYou successfully connected your bot created on https://chatfuel.com to your page.\n\nMessages from this block are shown to your users when they first start to chat with your bot.\n\nMake sure to never leave this block empty.\n\nIntroduce your new users to what your bot does and write something helpful to onboard them for the first time."
			}
		]
	}
}
