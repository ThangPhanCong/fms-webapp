/**
 * type: success, error, warning, info
 */

const notiCenters = [];

export function noti(type, message) {
    notiCenters.forEach(center => center(type, message));
}

export function registerNotiCenter(cb) {
    if (notiCenters.indexOf(cb) === -1) {
        notiCenters.push(cb);
    }
}