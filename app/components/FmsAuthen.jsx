import * as store from '../helpers/storage';
import config from 'CONFIG';
import * as socket from '../socket';

module.exports = {
	login: function () {
		let oauthLink = `${config.BASE_URL}/api/fb/oauth?redirect_to=${config.REDIRECT_TO}`;

		window.location = oauthLink;
	},
	logout: function () {
		store.clearAll();
		socket.disconnect();

		window.location = '/'
	},
	clean: () => {
		store.clearAll();
	},
	isAuthenticated: false
}
