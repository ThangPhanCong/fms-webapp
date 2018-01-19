import apiSender, {post, put, get} from './ApiSender';
import {toQueryParams} from 'utils/query-utils.js';
import * as storage from 'helpers/storage';

export function getOrderView(project_id) {
    const clause = {
        project_id,
        name: 'ALL_ORDER_VIEW'
    };
    const queryParams = toQueryParams(clause);
    return get(`/api/user-view?${queryParams}`);
}

export function postOrderView(project_id) {
    const payload = {
        project_id,
        name: 'ALL_ORDER_VIEW'
    };
    return post(`/api/user-view`, payload);
}

export function getProductView(project_id) {
    const clause = {
        project_id,
        name: 'ALL_PRODUCT_VIEW'
    };
    const queryParams = toQueryParams(clause);
    return get(`/api/user-view?${queryParams}`);
}

export function postProductView(project_id) {
    const payload = {
        project_id,
        name: 'ALL_PRODUCT_VIEW'
    };
    return post(`/api/user-view`, payload);
}