'use strict';

const React = require('react');
const { browserHistory } = require('react-router');
import store from 'store';

let config = require('CONFIG');
let socket = require('Socket');

module.exports = {
	onLogin: function () {
		let oauthLink = `${config.BASE_URL}/api/fb/oauth?redirect_to=${config.REDIRECT_TO}`;

		window.location = oauthLink;
	},
	onLogout: function () {
		store.clearAll('jwt');
		console.log('remove store');
		console.log(store.get('jwt'));
		socket.disconnect();

		window.location = '/'
	}
}
