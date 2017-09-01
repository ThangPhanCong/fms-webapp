'use strict';

const axios = require('axios');

let conversations = [
	{
		fb_id: "100004430053999",
		name: "Nguyễn Đăng Thế",
		messages: [
			{
				message: "ok men ok men ok men ok men ok men ok men ok men ok men ok men",
				sender: {
					fb_id: '1958682827749688',// user_id,
					name: "Bùi Mạnh Thắng"
				}
			}, {
				message: "viet nam iet nam viet nam viet nam viet reio eroueo eriwuo erwoirw weiwuo weiwo weiwo weoiwo weiwo weoiweo weio",
				sender: {
					fb_id: '100004430053999', // user_id,
					name: "Nguyễn Đăng Thế"
				}
			}, {
				message: "thai binh thai binh thai binh",
				sender: {
					fb_id: '100004430053999', // user_id,
					name: "Nguyễn Đăng Thế"
				}
			}, {
				message: "binh dinh binh dinh binh dinh binh dinh binh dinh binh dinh binh dinh binh dinh binh dinh binh finh",
				sender: {
					fb_id: '1958682827749688',// user_id,
					name: "Bùi Mạnh Thắng"
				}
			}, {
				message: "uet uet uet uet uet uet rwrk jerwio eiwow wriwo wiowr weiow woiw woirw woirw wroiw wiorw wifs wsvnw wsds swlek wl",
				sender: {
					fb_id: '1958682827749688',// user_id,
					name: "Bùi Mạnh Thắng"
				}
			}, {
				message: "viet nam iet nam viet nam viet nam viet",
				sender: {
					fb_id: '100004430053999', // user_id,
					name: "Nguyễn Đăng Thế"
				}
			}, {
				message: "thai binh thai binh thai binh",
				sender: {
					fb_id: '100004430053999', // user_id,
					name: "Nguyễn Đăng Thế"
				}
			}, {
				message: "binh dinh binh dinh binh dinh binh dinh binh dinh binh dinh binh dinh binh dinh binh dinh binh finh",
				sender: {
					fb_id: '1958682827749688',// user_id,
					name: "Bùi Mạnh Thắng"
				}
			}, {
				message: "uet uet uet uet uet uet",
				sender: {
					fb_id: '1958682827749688',// user_id,
					name: "Bùi Mạnh Thắng"
				}
			}, {
				message: "viet nam iet nam viet nam viet nam viet",
				sender: {
					fb_id: '100004430053999', // user_id,
					name: "Nguyễn Đăng Thế"
				}
			}, {
				message: "thai binh thai binh thai binh",
				sender: {
					fb_id: '100004430053999', // user_id,
					name: "Nguyễn Đăng Thế"
				}
			}, {
				message: "binh dinh binh dinh binh dinh binh dinh binh dinh binh dinh binh dinh binh dinh binh dinh binh finh",
				sender: {
					fb_id: '1958682827749688',// user_id,
					name: "Bùi Mạnh Thắng"
				}
			}, {
				message: "uet uet uet uet uet uet",
				sender: {
					fb_id: '1958682827749688',// user_id,
					name: "Bùi Mạnh Thắng"
				}
			}
		]
	},
	{
		fb_id: "100001815903421",
		name: "Nguyễn Tiến Minh",
		messages: [
			{
				message: "Hello men! rfwjirwpor iwopiropwirp oiwo pirw opirop",
				sender: {
					fb_id: '100001815903421',// user_id,
					name: "Nguyễn Tiến Minh"
				}
			}, {
				message: "ok men em",
				sender: {
					fb_id: '1958682827749688', // user_id,
					name: "Bùi Mạnh Thắng"
				}
			}
		]
	}
]

module.exports = {
	getConversations: function () {
		return conversations;
	}
}