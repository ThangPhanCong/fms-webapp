let apiSender = require('./ApiSender');

module.exports = {
	getAllProjects: () => {
		let route = `/api/projects`;
		return apiSender.get(route);
	},
	getProject: (alias) => {
		let route = `/api/projects/${alias}`;
		return apiSender.get(route);
	},
	createNewProject: (name) => {
		let route = `/api/projects`;
    let payload = {name};
		return apiSender.post(route, payload);
	},
	deleteProject: (alias) => {
		let route = `/api/projects/${alias}`;
		return apiSender.delete(route);
	},
	addPage: (project_alias, page_fb_id) => {
		let route = `/api/projects/${project_alias}/addpage`;
    let payload = {page_id: page_fb_id};
		return apiSender.post(route, payload);
	},
	deletePage: (project_alias, page_id) => {
		let route = `/api/projects/${project_alias}/pages/${page_id}`
		return apiSender.delete(route);
	}
};
