'use strict';

let APISender = require('ApiSender');

module.exports = {
	getPages: function () {
		let route = `/api/pages`;
		return APISender.get(route);
	},
	activePage: function (pageid, updateComponent) {
		let route = `/api/pages/${pageid}/active`;
		return APISender.post(route, updateComponent);
	}
};
