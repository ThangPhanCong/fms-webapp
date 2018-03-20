import apiSender from './ApiSender';
import getToken from '../helpers/token-getter';

export function getNotifications(user_id, scope) {
    let route = `/api/n/users/${user_id}/notifications`;
    return apiSender.get(route, getToken(scope));
}

export function getNotification(user_id, noti_id, scope) {
    let route = `/api/n/users/${user_id}/notifications/${noti_id}`;
    return apiSender.get(route, getToken(scope));
}

export function updateSeen(is_seen, user_id, noti_id, scope) {
    let route = `/api/n/users/${user_id}/notifications/${noti_id}`;
    let payload = {is_seen: is_seen};

    return apiSender.put(route, payload, getToken(scope));
}

export function updateArchived(is_archived, user_id, noti_id, scope) {
    let route = `/api/n/users/${user_id}/notifications/${noti_id}`;
    let payload = {is_archived: is_archived};

    return apiSender.put(route, payload, getToken(scope));
}

export function deleteNotification(user_id, noti_id, scope) {
    let route = `/api/n/users/${user_id}/notifications/${noti_id}`;
    return apiSender.delete(route, getToken(scope));
}
