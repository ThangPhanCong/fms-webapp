'use strict';

import store from 'store';

let config = require('CONFIG');
let socket = require('Socket');

module.exports = {
	login: function () {
		let oauthLink = `${config.BASE_URL}/api/fb/oauth?redirect_to=${config.REDIRECT_TO}`;

		window.location = oauthLink;
	},
	logout: function () {
		store.clearAll('jwt');
		socket.disconnect();

		window.location = '/'
	}
}
