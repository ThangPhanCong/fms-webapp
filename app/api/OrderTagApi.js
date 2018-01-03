import {delay} from '../utils/timeout-utils';
import apiSender, {get, post, put} from './ApiSender';

export function getOrderTags(projectAlias) {
    return get(`/api/projects/${projectAlias}/tags`);
}

export function createOrderTag(projectAlias, orderTag) {
    // return post(`/api/projects/${projectAlias}/tags`);
    console.log('orderTag', orderTag)
    return delay(1000).then(() => Promise.resolve(orderTag));
}