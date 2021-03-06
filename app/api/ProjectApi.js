let apiSender = require('./ApiSender');
let project_access_token;
import {getByProjectId} from "../helpers/token-getter";

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
    updateProject: (project_id, name) => {
        let route = `/api/a/projects/${project_id}`;
        let payload = {name};
        return apiSender.put(route, payload);
    },
    deleteProject: (project_id) => {
        let route = `/api/a/projects`;
        return apiSender.delete(route, getByProjectId(project_id));
    },
    // TODO: get pages of user
    getPages: () => {
        // let route = `/api/a/projects/${alias}/pages`;
        let route = `/api/p/pages`;
        return apiSender.get(route);
    },
    addPage: (page_fb_id, is_get_history, since) => {
        let route = `/api/p/pages`;
        let payload;
        if (is_get_history) {
            if (!since) payload = {page_fb_id, is_get_history};
            else payload = {page_fb_id, is_get_history, since};
        } else {
            payload = {page_fb_id, is_get_history};
        }
        return apiSender.post(route, payload);
    },
    deletePage: (page_id) => {
        let route = `/api/p/pages/${page_id}`;
        return apiSender.delete(route);
    },
    checkActivePage: (page_fb_ids) => {
        let route = `/api/p/pages/check-active`;
        return apiSender.post(route, {page_fb_ids});
    }
};
