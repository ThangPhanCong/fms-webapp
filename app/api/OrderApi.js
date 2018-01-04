const apiSender = require('./ApiSender');
import {delay} from '../utils/timeout-utils';

module.exports = {
    createNote: (alias, conv_id, customer_id, page_id, content) => {
        let route = `/api/projects/${alias}/conversations/${conv_id}/notes`;
        let payload = {
            customer_id: customer_id,
            page_id: page_id,
            content: content
        };
        return apiSender.post(route, payload);
    },
    getNotes: (alias, conv_id) => {
        let route = `/api/projects/${alias}/conversations/${conv_id}/notes`;
        return apiSender.get(route);
    },
    updateNote: (alias, conv_id, note_id, content) => {
        let route = `/api/projects/${alias}/conversations/${conv_id}/notes/${note_id}`;
        let payload = {content};
        return apiSender.put(route, payload);
    },
    deleteNote: (alias, conv_id, note_id) => {
        let route = `/api/projects/${alias}/conversations/${conv_id}/notes/${note_id}`;
        return apiSender.delete(route);
    },
    createOrder: (alias, customer_id, payload) => {
        let route = `/api/projects/${alias}/customers/${customer_id}/orders`;
        return apiSender.post(route, payload);
    },
    getOrders: (alias, customer_id, page_fb_id) => {
        let route = `/api/projects/${alias}/customers/${customer_id}/orders?pageFbId=${page_fb_id}`;
        return apiSender.get(route);
    },
    getNewProjectOrders: (projectAlias) => {
        // let route = `/api/projects/${alias}/customers/${customer_id}/orders?pageFbId=${page_fb_id}`;
        // return apiSender.get(route);

        const orders = [
            {
                id: 'DH12501',
                private_note: 'a đang họp. lát gọi lại, anh chọn rồi anh alo cho',
                customer: {
                    name: 'a Vinh',
                    phone: '0986284919',
                    fb: 'fb.com/hoanghong'
                },
                transport: {
                    address: 'Số 5s, Khu Phố 2, Phường Quyết Thắng, Biên Hòa, Đồng Nai',
                    method: 'TONG_BUU_DIEN',
                    fee: '10000'
                },
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
                tag: {
                    name: 'Chờ quyết định',
                    color: '#black'
                }
            },
            {
                id: 'DH12502',
                private_note: 'a đang họp. lát gọi lại, anh chọn rồi anh alo cho',
                customer: {
                    name: 'a Bat',
                    phone: '0986284919',
                    fb: 'fb.com/hoanghong'
                },
                transport: {
                    address: 'Số 5s, Khu Phố 2, Phường Quyết Thắng, Biên Hòa, Đồng Nai',
                    method: 'TONG_BUU_DIEN',
                    fee: '10000'
                },
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
                tag: {
                    name: 'Chờ quyết định',
                    color: '#black'
                }
            }
        ];

        return delay(1000).then(() => Promise.resolve(orders));
    },
    getDefaultOrderId: () => {
        return delay(1000).then(() => Promise.resolve("DH12394"));
    },
    exportOrder: (order) => {
        console.log(order);
        return delay(1000).then(() => Promise.resolve(order));
    },
    createNewOrder: (order) => {
        console.log(order);
        return delay(1000).then(() => Promise.resolve(order));
    },
    getExportOrders: (projectAlias) => {
        const orders = [
            {
                id: 'DH12501',
                private_note: 'a đang họp. lát gọi lại, anh chọn rồi anh alo cho',
                customer: {
                    name: 'a Vinh',
                    phone: '0986284919',
                    fb: 'fb.com/hoanghong'
                },
                transport: {
                    address: 'Số 5s, Khu Phố 2, Phường Quyết Thắng, Biên Hòa, Đồng Nai',
                    method: 'TONG_BUU_DIEN',
                    fee: '10000'
                },
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
                tag: {
                    name: 'Chờ quyết định',
                    color: '#black'
                }
            },
            {
                id: 'DH12502',
                private_note: 'a đang họp. lát gọi lại, anh chọn rồi anh alo cho',
                customer: {
                    name: 'a Bat',
                    phone: '0986284919',
                    fb: 'fb.com/hoanghong'
                },
                transport: {
                    address: 'Số 5s, Khu Phố 2, Phường Quyết Thắng, Biên Hòa, Đồng Nai',
                    method: 'TONG_BUU_DIEN',
                    fee: '10000'
                },
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
                tag: {
                    name: 'Chờ quyết định',
                    color: '#black'
                }
            }
        ];

        return delay(1000).then(() => Promise.resolve(orders));
    }
};