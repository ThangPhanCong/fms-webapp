import apiSender, {get, post, put} from './ApiSender';

export function getOrderTags(projectAlias) {
    return get(`/api/projects/${projectAlias}/order-tags`);
}

export function createOrderTag(projectAlias, orderTag) {
    return post(`/api/projects/${projectAlias}/order-tags`, orderTag);
}

export function updateOrderTag(projectAlias, orderTag) {
    return put(`/api/projects/${projectAlias}/order-tags/${orderTag._id}`, orderTag);
}

export function deleteOrderTag(projectAlias, orderTagId) {
    return apiSender.delete(`/api/projects/${projectAlias}/order-tags/${orderTagId}`);
}