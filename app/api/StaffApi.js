import apiSender, {get, post, put} from './ApiSender';
import {toQueryParams} from 'utils/query-utils';
import {getByProjectId} from "../helpers/token-getter";

export function countStaffs(project_id, filter = {}) {
    const queryParams = toQueryParams(filter);

    return get(`/api/a/staffs/count?${queryParams}`, getByProjectId(project_id));
}

export function getStaffs(project_id, filter = {}) {
    const queryParams = toQueryParams(filter);

    return get(`/api/a/staffs?${queryParams}`, getByProjectId(project_id));
}

export function createNewStaff(project_id, staff) {
    const payload = {...staff};

    return post(`/api/a/staffs`, payload, getByProjectId(project_id));
}

export function updateStaff(project_id, staff) {
    const payload = {...staff};

    return put(`/api/a/staffs/${staff._id}`, payload, getByProjectId(project_id));
}

export function deleteStaff(project_id, staff_id) {
    return apiSender.delete(`/api/a/staffs/${staff_id}`, getByProjectId(project_id));
}
