import apiSender, {post, put, get} from './ApiSender';

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

const ORDER_STATUS = {
    DRAFT: "DRAFT",
    EXPORTED_ORDER: "EXPORTED_ORDER",
    TRANSPORTED_ORDER: "TRANSPORTED_ORDER",
    TRANSPORTING: "TRANSPORTING",
    PAY: "PAY_COD",
    REFUND: "REFUND",
    WAIT: "WAIT"
};

module.exports = {
    createOrder: (alias, customer_id, payload) => {
        let route = `/api/projects/${alias}/customers/${customer_id}/orders`;
        return apiSender.post(route, payload);
    },
    getOrders: (alias, customer_id, page_fb_id) => {
        let route = `/api/projects/${alias}/customers/${customer_id}/orders?pageFbId=${page_fb_id}`;
        return apiSender.get(route);
    },
    getNewProjectOrders: (projectAlias) => {
        return get(`/api/projects/${projectAlias}/orders`);
    },
    createNewOrder: (projectAlias, order) => {
        return post(`/api/projects/${projectAlias}/orders`, order);
    },
    updateOrder: (projectAlias, order) => {
        return put(`/api/projects/${projectAlias}/orders/${order._id}`, order);
    },
    deleteOrder: (projectAlias, order) => {
        return apiSender.delete(`/api/projects/${projectAlias}/orders/${order._id}`);
    }
};