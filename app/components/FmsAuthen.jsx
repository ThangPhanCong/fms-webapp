'use strict';

const React = require('react');
const { browserHistory } = require('react-router');
import store from 'store';

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
		store.clearAll('jwt');
		console.log('remove store');
		console.log(store.get('jwt'));
		socket.disconnect();

		window.location = '/'
	}
}
