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
	verifyName: (name) => {
		const route = `/api/projects/verify-name`;
		const payload = { name };
		return apiSender.post(route, payload);
	},
	createNewProject: (name, page_ids) => {
		const route = `/api/projects`;
    const payload = {name, page_ids};
		return apiSender.post(route, payload);
	},
	updateProject: (alias, project) => {
		let route = `/api/projects/${alias}`;
		let payload = {project};
		return apiSender.put(route, payload);
	},
	deleteProject: (alias) => {
		let route = `/api/projects/${alias}`;
		return apiSender.delete(route);
	},
	addPage: (project_alias, page_fb_id) => {
		let route = `/api/projects/${project_alias}/pages`;
    let payload = {page_id: page_fb_id};
		return apiSender.post(route, payload);
	},
	deletePage: (project_alias, page_id) => {
		let route = `/api/projects/${project_alias}/pages/${page_id}`
		return apiSender.delete(route);
	}
};
