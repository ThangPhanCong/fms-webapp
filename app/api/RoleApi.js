import apiSender, {get, post, put} from './ApiSender';
import {toQueryParams} from 'utils/query-utils';
import {getByProjectId} from "../helpers/token-getter";

export function getRoles(project_id, filter = {}) {
    const queryParams = toQueryParams(filter);

    return get(`/api/a/roles?${queryParams}`, getByProjectId(project_id));
}

export function createNewRole(project_id, role) {
    const payload = {...role};

    return post(`/api/a/roles`, payload, getByProjectId(project_id));
}

export function updateRole(project_id, role) {
    const payload = {...role};

    return put(`/api/a/roles/${role._id}`, payload, getByProjectId(project_id));
}

export function deleteRole(project_id, role_id) {
    return apiSender.delete(`/api/a/roles/${role_id}`, getByProjectId(project_id));
}

export function getRoleById(project_id, role_id) {
    return get(`/api/a/roles/${role_id}`, getByProjectId(project_id));
}
