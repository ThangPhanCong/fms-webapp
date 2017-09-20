'use strict';

let apiSender = require('ApiSender');

module.exports = {
	getAllProject: function (name) {
		let route = `/api/projects`;
		return apiSender.get(route);
	},
	createNewProject: function (name) {
		let route = `/api/projects`;
    let payload = {name};
		return apiSender.post(route, payload);
	},
	addPage: function (project_alias, page_fb_id) {
		let route = `/api/projects/${project_alias}/addpage`;
    let payload = {page_id: page_fb_id};
		return apiSender.post(route, payload);
	}
};
