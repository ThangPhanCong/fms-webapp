import apiSender, {get, post, put} from './ApiSender';

export function getAllProviders() {
    return get(`/api/t/providers/all`);
}

export function createOtherProvider(providerInfo) {
    const payload = {...providerInfo};

    return post(`/api/t/providers/other`, payload);
}

export function createTransportOrder(transportOrder, order_id, provider_name) {
    const payload = {...transportOrder};

    return post(`/api/t/orders/${order_id}/transport-order/other/${provider_name}`, payload);
}

export function getTransportOrderInfo(order_id) {
    return get(`/api/t/orders/${order_id}/transport-order`);
}