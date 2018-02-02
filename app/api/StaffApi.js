import apiSender, {get, post, put} from './ApiSender';
import {toQueryParams} from 'utils/query-utils';
import {getByProjectId} from "../helpers/token-getter";

export function countStaffs(project_id, filter = {}) {
    const queryParams = toQueryParams(filter);

    return get(`/api/a/staffs/count?${queryParams}`, getByProjectId(project_id));
}