let apiSender = require('./ApiSender');
let project_access_token;

module.exports = {
    setProjectToken: (token) => {
        project_access_token = token;
    },
    getProjectToken: () => {
        return project_access_token;
    },
    getAllProjects: () => {
        let route = `/api/a/projects`;
        return apiSender.get(route);
    },
    getProject: (alias) => {
        let route = `/api/a/projects/${alias}`;
        return apiSender.get(route);
    },
    verifyName: (name) => {
        const route = `/api/a/projects/verify-name`;
        const payload = {name};
        return apiSender.post(route, payload);
    },
    createNewProject: (name, page_ids) => {
        const route = `/api/a/projects`;
        const payload = {name, page_ids};
        return apiSender.post(route, payload);
    },
    updateProject: (alias, project) => {
        let route = `/api/a/projects/${alias}`;
        let payload = {project};
        return apiSender.put(route, payload);
    },
    deleteProject: (alias) => {
        let route = `/api/a/projects/${alias}`;
        return apiSender.delete(route);
    },
    // TODO: get pages of user
    getPages: (alias) => {
        // let route = `/api/a/projects/${alias}/pages`;
        let route = `/api/a/users`
        return apiSender.get(route);
    },
    addPage: (project_alias, page_fb_id) => {
        let route = `/api/a/projects/${project_alias}/pages`;
        let payload = {page_id: page_fb_id};
        return apiSender.post(route, payload);
    },
    deletePage: (project_alias, page_id) => {
        let route = `/api/a/projects/${project_alias}/pages/${page_id}`;
        return apiSender.delete(route);
    }
};
