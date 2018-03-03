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

export function getProvincesCache() {
    return get(`/api/t/providers/viettel/cache-provinces`);
}

export function getDistrictsCache(province_id) {
    return get(`/api/t/providers/viettel/cache-provinces/${province_id}/cache-districts`);
}

export function getWardsCache(district_id) {
    return get(`/api/t/providers/viettel/cache-districts/${district_id}/cache-wards`);
}

export function getViettelInfoAccount() {
    return get(`/api/t/providers/viettel`);
}

export function createViettelAccount(account) {
    const payload = {...account};

    return post(`/api/t/providers/viettel`, payload);
}

export function calculatePriceViettel(order) {
    const payload = {...order};

    return post(`/api/t/providers/viettel/calculate-price`, payload);
}

export function getViettelInventories() {
    return get(`/api/t/providers/viettel/inventories`);
}

export function getViettelServices() {
    return get(`/api/t/providers/viettel/services`);
}

export function getViettelExtraServices() {
    return get(`/api/t/providers/viettel/extra-services`);
}

export function createViettelTransportOrder(transportOrder, order_id) {
    const payload = {...transportOrder};

    return post(`/api/t/orders/${order_id}/transport-order/viettel`, payload);
}