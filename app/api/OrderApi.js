import apiSender, {post, put, get} from './ApiSender';
import {toQueryParams} from '../utils/query-utils';
import {delay} from '../utils/timeout-utils';
import {getByProjectId} from "../helpers/token-getter";

export const ORDER_STATUS = {
    DRAFT: "DRAFT",
    EXPORTED_ORDER: "EXPORTED_ORDER",
    TRANSPORTED_ORDER: "TRANSPORTED_ORDER",
    TRANSPORTING: "TRANSPORTING",

    // luu tru don hang
    DON_HANG_THANH_CONG: "DON_HANG_THANH_CONG",
    DON_HANG_THAT_BAI: "DON_HANG_THAT_BAI",
};

export function getOrders(projectAlias, filter = {}) {
    const queryParams = toQueryParams(filter);
    return get(`/api/o/orders?${queryParams}`);
}

export function countOrders(project_id, filter = {}) {
    const queryParams = toQueryParams(filter);
    return get(`/api/o/orders/count?${queryParams}`, getByProjectId(project_id));
}

export function createOrder(projectAlias, order) {
    return post(`/api/o/orders`, order);
}

export function updateOrder(projectAlias, order) {
    return put(`/api/o/orders/${order._id}`, order);
}

export function deleteOrder(projectAlias, order) {
    return apiSender.delete(`/api/o/orders/${order._id}`);
}

export function saveSuccessOrder(projectAlias, order) {
    const payload = {
        ...order,
        status: ORDER_STATUS.DON_HANG_THANH_CONG
    };
    return put(`/api/o/orders/${order._id}`, payload);
}

export function saveFailureOrder(projectAlias, order) {
    const payload = {
        ...order,
        status: ORDER_STATUS.DON_HANG_THAT_BAI
    };
    return put(`/api/o/orders/${order._id}`, payload);
}

export function getSuccessOrder(projectAlias, filter = {}) {
    const successOrderFilter = {
        ...filter,
        status: ORDER_STATUS.DON_HANG_THANH_CONG
    };
    const queryParams = toQueryParams(successOrderFilter);
    return get(`/api/o/orders?${queryParams}`);
}

export function getFailureOrder(projectAlias, filter = {}) {
    const successOrderFilter = {
        ...filter,
        status: ORDER_STATUS.DON_HANG_THAT_BAI
    };
    const queryParams = toQueryParams(successOrderFilter);
    return get(`/api/o/orders?${queryParams}`);
}


//// for test only
const mockupOrders = [
    {
        id: 'DH12501',
        private_note: 'a đang họp. lát gọi lại, anh chọn rồi anh alo cho',
        customer_name: 'a Vinh',
        customer_phone: '0986284919',
        customer_facebook: 'fb.com/hoanghong',
        transport_address: 'Số 5s, Khu Phố 2, Phường Quyết Thắng, Biên Hòa, Đồng Nai',
        transport_method: 'TONG_BUU_DIEN',
        transport_fee: '10000',
        products: [
            {
                id: 'SP12501',
                name: 'Kính Mắt Cao Cấp C2',
                quantity: '2',
                price: '40000',
                discount: '10000'
            },
            {
                id: 'SP12502',
                name: 'Kính Mắt Cao Cấp C3',
                quantity: '1',
                price: '80000',
                discount: '10000'
            }
        ],
        order_tag: {
            name: 'Chờ quyết định',
            color: '#black'
        }
    },
    {
        id: 'DH12501',
        private_note: 'a đang họp. lát gọi lại, anh chọn rồi anh alo cho',
        customer_name: 'a Vinh',
        customer_phone: '0986284919',
        customer_facebook: 'fb.com/hoanghong',
        transport_address: 'Số 5s, Khu Phố 2, Phường Quyết Thắng, Biên Hòa, Đồng Nai',
        transport_method: 'TONG_BUU_DIEN',
        transport_fee: '10000',
        products: [
            {
                id: 'SP12501',
                name: 'Kính Mắt Cao Cấp C2',
                quantity: '2',
                price: '40000',
                discount: '10000'
            },
            {
                id: 'SP12502',
                name: 'Kính Mắt Cao Cấp C3',
                quantity: '1',
                price: '80000',
                discount: '10000'
            }
        ],
        order_tag: {
            name: 'Chờ quyết định',
            color: '#black'
        }
    },
];

export function getTestOrders() {
    return delay(1000).then(() => Promise.resolve(mockupOrders));
}

export function getTestOrder() {
    return delay(1000).then(() => Promise.resolve(mockupOrders[0]));
}