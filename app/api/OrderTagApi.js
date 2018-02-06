import apiSender, {get, post, put} from './ApiSender';

export function getOrderTags(projectAlias) {
    return get(`/api/o/order-tags`);
}

export function createOrderTag(projectAlias, orderTag) {
    return post(`/api/o/order-tags`, orderTag);
}

export function updateOrderTag(projectAlias, orderTag) {
    return put(`/api/o/order-tags/${orderTag._id}`, orderTag);
}

export function deleteOrderTag(projectAlias, orderTagId) {
    return apiSender.delete(`/api/o/order-tags/${orderTagId}`);
}