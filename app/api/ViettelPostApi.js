import apiSender, {get, post, put} from './ApiSender';

export function getProvinces() {
    return get(`/api/t/providers/viettel/provinces`);
}

export function getDistricts() {
    return get(`/api/t/providers/viettel/districts`);
}

export function getWards() {
    return get(`/api/t/providers/viettel/wards`);
}

export function getViettelInfoAccount() {
    return get(`/api/t/providers/viettel`);
}

export function createViettelAccount(account) {
    const payload = {...account};

    return post(`/api/t/providers/viettel`, payload);
}

export function calculatePrice(order) {
    const payload = {...order}

    return post(`/api/t/providers/viettel/calculate-price`, payload);
}
