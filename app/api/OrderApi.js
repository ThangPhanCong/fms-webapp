import apiSender, {post, put, get} from './ApiSender';
import {toQueryParams} from 'utils/query-utils';
import {delay} from 'utils/timeout-utils';

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

module.exports = {
    ORDER_STATUS: {
        DRAFT: "DRAFT",
        EXPORTED_ORDER: "EXPORTED_ORDER",
        TRANSPORTED_ORDER: "TRANSPORTED_ORDER",
        TRANSPORTING: "TRANSPORTING",
    },
    getTestOrders: () => {
        return delay(1000).then(() => Promise.resolve(mockupOrders));
    },
    getTestOrder: () => {
        return delay(1000).then(() => Promise.resolve(mockupOrders[0]));
    },
    getOrders: (projectAlias, filter = {}) => {
        const queryParams = toQueryParams(filter);
        return get(`/api/projects/${projectAlias}/orders?${queryParams}`);
    },
    createOrder: (projectAlias, order) => {
        return post(`/api/projects/${projectAlias}/orders`, order);
    },
    updateOrder: (projectAlias, order) => {
        return put(`/api/projects/${projectAlias}/orders/${order._id}`, order);
    },
    deleteOrder: (projectAlias, order) => {
        return apiSender.delete(`/api/projects/${projectAlias}/orders/${order._id}`);
    }
};