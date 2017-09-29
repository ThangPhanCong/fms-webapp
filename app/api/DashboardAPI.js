'use strict';

let apiSender = require('ApiSender');

module.exports = {
	getConversations: function (page_id) {
		let route = `/api/pages/${page_id}/conversations`;
		return apiSender.get(route);
	},
	getMessageInbox: function (inbox_id) {
		let route = `/api/inboxes/${inbox_id}/messages`;
		return apiSender.get(route);
	},
	getReplyComment: function (comment_id) {
		let route = `/api/comments/${comment_id}/comments`;
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
	},
	getMoreConversationsTest: function () {
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
				"type": 'inbox',
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
				"type": "comment",
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
				"type": 'inbox',
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
				"type": "comment",
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
				"type": "comment",
				"snippet": "Hi, Thuy Anh! Nice to meet you.\n\nYou successfully connected your bot created on https://chatfuel.com to your page.\n\nMessages from this block are shown to your users when they first start to chat with your bot.\n\nMake sure to never leave this block empty.\n\nIntroduce your new users to what your bot does and write something helpful to onboard them for the first time."
			}
		]
	},
	getMoreMessages: function () {
		return [
			{
				"_id": "59c694b6ac70d6287c6d6ac51",
				"fb_id": "1300789760030502_13116727022755411",
				"parent_fb_id": "1266831106759701_1300789760030502",
				"page_fb_id": "1266831106759701",
				"message": "test sticker, image in comment",
				"attachment": {
					"media": {
						"image": {
							"height": 407,
							"src": "https://scontent.xx.fbcdn.net/v/t1.0-9/s720x720/21686036_2043926589174844_8425368716629990326_n.png?oh=fe4489f586bdd730155ea7d301dae428&oe=5A4ED87F",
							"width": 720
						}
					},
					"target": {
						"id": "2043926589174844",
						"url": "https://www.facebook.com/2032256707008499/photos/p.2043926589174844/2043926589174844/?type=3"
					},
					"type": "photo",
					"url": "https://www.facebook.com/2032256707008499/photos/p.2043926589174844/2043926589174844/?type=3"
				},
				"updated_time": "2016-09-22T05:00:30.000Z",
				"from": {
					"name": "Trường Trung học cơ sở Bình Định",
					"id": "2032256707008499"
				},
				"snippet": "test sticker, image in comment",
				"__v": 0,
				"last_seen": "2017-09-23T17:08:26.010Z",
				"is_private": false,
				"is_hidden": false,
				"can_reply_privately": false,
				"can_remove": true,
				"can_like": true,
				"can_hide": false,
				"can_comment": true,
				"is_seen": true
			},
			{
				"_id": "59c694b7ac70d6287c6d6b38",
				"fb_id": "1300789760030502_13116744389420341",
				"parent_fb_id": "1300789760030502_1311672702275541",
				"page_fb_id": "1266831106759701",
				"message": "Okmen okokokokokokokokok",
				"attachment": {
					"media": {
						"image": {
							"height": 240,
							"src": "https://scontent.xx.fbcdn.net/v/t39.1997-6/11057038_789355231153391_628209586_n.png?oh=e5b24442743296893fff353ae30b5af0&oe=5A865D1E",
							"width": 240
						}
					},
					"target": {
						"id": "789355224486725",
						"url": "https://scontent.xx.fbcdn.net/v/t39.1997-6/11057038_789355231153391_628209586_n.png?oh=e5b24442743296893fff353ae30b5af0&oe=5A865D1E"
					},
					"type": "sticker",
					"url": "https://scontent.xx.fbcdn.net/v/t39.1997-6/11057038_789355231153391_628209586_n.png?oh=e5b24442743296893fff353ae30b5af0&oe=5A865D1E"
				},
				"updated_time": "2016-09-22T05:03:35.000Z",
				"from": {
					"name": "Trường Trung học cơ sở Bình Định",
					"id": "2032256707008499"
				},
				"snippet": "Okmen okokokokokokokokok",
				"__v": 0,
				"is_private": false,
				"is_hidden": false,
				"can_reply_privately": false,
				"can_remove": true,
				"can_like": true,
				"can_hide": false,
				"can_comment": false,
				"is_seen": false
			},
			{
				"_id": "59c694b7ac70d6287c6d6b37",
				"fb_id": "1300789760030502_13116742422753871",
				"parent_fb_id": "1300789760030502_1311672702275541",
				"page_fb_id": "1266831106759701",
				"message": "😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋",
				"attachment": {
					"media": {
						"image": {
							"height": 240,
							"src": "https://scontent.xx.fbcdn.net/v/t39.1997-6/11057043_789355361153378_472790211_n.png?oh=89533eccd69ff5833181ba23f68c5728&oe=5A45EA9B",
							"width": 240
						}
					},
					"target": {
						"id": "789355354486712",
						"url": "https://scontent.xx.fbcdn.net/v/t39.1997-6/11057043_789355361153378_472790211_n.png?oh=89533eccd69ff5833181ba23f68c5728&oe=5A45EA9B"
					},
					"type": "sticker",
					"url": "https://scontent.xx.fbcdn.net/v/t39.1997-6/11057043_789355361153378_472790211_n.png?oh=89533eccd69ff5833181ba23f68c5728&oe=5A45EA9B"
				},
				"updated_time": "2016-09-22T05:03:12.000Z",
				"from": {
					"name": "Trường Trung học cơ sở Bình Định",
					"id": "2032256707008499"
				},
				"snippet": "😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋",
				"__v": 0,
				"is_private": false,
				"is_hidden": false,
				"can_reply_privately": false,
				"can_remove": true,
				"can_like": true,
				"can_hide": false,
				"can_comment": false,
				"is_seen": false
			},
			{
				"_id": "59c694b7ac70d6287c6d6b36",
				"fb_id": "1300789760030502_131167343894213411",
				"parent_fb_id": "1300789760030502_1311672702275541",
				"page_fb_id": "1266831106759701",
				"message": "😁😁😁😁😁",
				"attachment": {
					"media": {
						"image": {
							"height": 240,
							"src": "https://scontent.xx.fbcdn.net/v/t39.1997-6/11057038_789355231153391_628209586_n.png?oh=e5b24442743296893fff353ae30b5af0&oe=5A865D1E",
							"width": 240
						}
					},
					"target": {
						"id": "789355224486725",
						"url": "https://scontent.xx.fbcdn.net/v/t39.1997-6/11057038_789355231153391_628209586_n.png?oh=e5b24442743296893fff353ae30b5af0&oe=5A865D1E"
					},
					"type": "sticker",
					"url": "https://scontent.xx.fbcdn.net/v/t39.1997-6/11057038_789355231153391_628209586_n.png?oh=e5b24442743296893fff353ae30b5af0&oe=5A865D1E"
				},
				"updated_time": "2016-09-22T05:01:47.000Z",
				"from": {
					"name": "Thính Thơm",
					"id": "1266831106759701"
				},
				"snippet": "😁😁😁😁😁",
				"__v": 0,
				"is_private": false,
				"is_hidden": false,
				"can_reply_privately": false,
				"can_remove": true,
				"can_like": true,
				"can_hide": false,
				"can_comment": false,
				"is_seen": false
			},
			{
				"_id": "59c694b7ac70d6287c6d6b35",
				"fb_id": "1300789760030502_131167323560882111",
				"parent_fb_id": "1300789760030502_1311672702275541",
				"page_fb_id": "1266831106759701",
				"message": "Ban muon gi",
				"attachment": {
					"media": {
						"image": {
							"height": 345,
							"src": "https://scontent.xx.fbcdn.net/v/t1.0-9/s720x720/21761861_1311673105608834_1209398197855222059_n.jpg?oh=97e1c8724db385a1b912b3d4883ef802&oe=5A5372BF",
							"width": 720
						}
					},
					"target": {
						"id": "1311673105608834",
						"url": "https://www.facebook.com/1266831106759701/photos/p.1311673105608834/1311673105608834/?type=3"
					},
					"type": "photo",
					"url": "https://www.facebook.com/1266831106759701/photos/p.1311673105608834/1311673105608834/?type=3"
				},
				"updated_time": "2016-09-22T05:01:19.000Z",
				"from": {
					"name": "Thính Thơm",
					"id": "1266831106759701"
				},
				"snippet": "Ban muon gi",
				"__v": 0,
				"is_private": false,
				"is_hidden": false,
				"can_reply_privately": false,
				"can_remove": true,
				"can_like": true,
				"can_hide": false,
				"can_comment": false,
				"is_seen": false
			}
		]
	}
}
