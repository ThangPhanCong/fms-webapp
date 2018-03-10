import apiSender, {get, post, put} from './ApiSender';

export function getProvinces() {
    return get(`/api/t/providers/ghtk/provinces`);
}

export function getDistricts(province_id) {
    return get(`/api/t/providers/ghtk/provinces/${province_id}/districts`);
}

export function getWards(district_id) {
    return get(`/api/t/providers/ghtk/districts/${district_id}/wards`);
}

export function getAllDistricts(province_name) {
    return get(`/api/t/providers/ghtk/all_districts?province_name=${province_name}`);
}

export function getAllWards(district_name) {
    return get(`/api/t/providers/ghtk/all_wards?district_name=${district_name}`);
}

export function getInfoAccount() {
    return get(`/api/t/providers/ghtk`);
}

export function createNewAccount(account) {
    /**
     check('name').exists(),
     check('first_address').exists(),
     check('province').exists(),
     check('district').exists(),
     check('tel').exists(),
     check('email').exists(),
     */
    const payload = {...account};

    return post(`/api/t/providers/ghtk/new-account`, payload);
}

export function createExistedAccount(account) {
    const payload = {...account};

    return post(`/api/t/providers/ghtk/existed-account`, payload);
}

export function calculatePrice(order) {
    const payload = {...order};

    return post(`/api/t/providers/ghtk/calculate-price`, payload);
}

export function createTransportOrder(transportOrder, order_id) {
    const payload = {...transportOrder};

    return post(`/api/t/orders/${order_id}/transport-order/ghtk`, payload);
}

export function deleteTransportOrder(order_id) {
    return apiSender.delete(`/api/t/orders/${order_id}/transport-order/ghtk`);
}