import apiSender, {get, post, put} from './ApiSender';

export function getProvinces() {
    return get(`/api/t/providers/shipchung/provinces`);
}

export function getDistricts(province_id) {
    return get(`/api/t/providers/shipchung/provinces/${province_id}/districts`);
}

export function getWards(district_id) {
    return get(`/api/t/providers/shipchung/districts/${district_id}/wards`);
}

export function createExistedAccount(payload) {
    return post(`/api/t/providers/shipchung/existed-account`, payload);
}

export function calculatePrice(order) {
    const payload = {...order};

    return post(`/api/t/providers/shipchung/calculate-price`, payload);
}

export function createTransportOrder(transportOrder, order_id) {
    const payload = {...transportOrder};

    return post(`/api/t/orders/${order_id}/transport-order/shipchung`, payload);
}

export function deleteTransportOrder(order_id) {
    return apiSender.delete(`/api/t/orders/${order_id}/transport-order/shipchung`);
}