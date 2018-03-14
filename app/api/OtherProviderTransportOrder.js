import apiSender, {get, post, put} from './ApiSender';

export function createTransportOrderStatus(statusInfo, provider_name, order_id) {
    return post(`/api/t/orders/${order_id}/transport-order/other/${provider_name}/transport-order-status`, statusInfo);
}