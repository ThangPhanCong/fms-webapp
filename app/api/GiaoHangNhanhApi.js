import apiSender, {get, post, put} from './ApiSender';

export function getProvinces() {
    return get(`/api/t/providers/ghn/provinces`);
}

export function getDistricts(province_id) {
    return get(`/api/t/providers/ghn/provinces/${province_id}/districts`);
}

export function getWards(district_id) {
    return get(`/api/t/providers/ghn/districts/${district_id}/wards`);
}

export function createExistedAccount(payload) {
    return post(`/api/t/providers/ghn/existed-account`, payload);
}

export function calculatePrice(order) {
    const payload = {...order};

    return post(`/api/t/providers/ghn/calculate-price`, payload);
}

/**
 2. Hủy đơn hàng
 3. Hoàn hàng về
 */
export function updateTransportOrderStatus(transportOrder, order_id) {
    const payload = {...transportOrder};

    return post(`/api/t/orders/${order_id}/transport-order/ghn/actions`, payload);
}

export function createTransportOrder(transportOrder, order_id) {
    const payload = {...transportOrder};

    return post(`/api/t/orders/${order_id}/transport-order/ghn`, payload);
}

export function deleteTransportOrder(order_id) {
    return apiSender.delete(`/api/t/orders/${order_id}/transport-order/ghn`);
}