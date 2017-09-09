'use strict';

const React = require('react');
const Cookie = require('universal-cookie');
const { browserHistory } = require('react-router');

let config = require('config');
let socket = require('Socket');

module.exports = {
	onLogin: function () {
		let clientId = config.FB_CLIENT_ID;
		let redirectUri = config.REDIRECT_URI;
		let scope = config.FB_SCOPE;
		let fbLoginLink = `https://www.facebook.com/v2.8/dialog/oauth` +
			`?auth_type=rerequest` +
			`&client_id=${clientId}` +
			`&redirect_uri=${redirectUri}` +
			`&scope=${scope}`;

		window.location = fbLoginLink;
	},
	onLogout: function () {
		let cookie = new Cookie();
		cookie.remove('jwt');
		cookie.remove('user_fb_id');
		cookie.remove('user_name');

		socket.disconnect();

		browserHistory.push('/');
	}
}
