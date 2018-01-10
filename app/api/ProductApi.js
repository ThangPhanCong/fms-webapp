import {delay} from '../utils/timeout-utils';
import apiSender, {get, post, put} from './ApiSender';
import {toQueryParams} from 'utils/query-utils';

// const mockProducts = [
//     {
//         id: 'SP12501',
//         name: 'ĐỒNG HỒ NAM CHÍNH HÃNG BINGER BG01',
//         quantity: '200',
//         price: '40000',
//         unit: 'chiếc'
//     },
//     {
//         id: 'SP12502',
//         name: 'ĐỒNG HỒ NAM DÂY DA CAO CẤP CHÍNH HÃNG BINGER BG02 AUTOMATIC',
//         quantity: '135',
//         price: '80000',
//         unit: 'chiếc'
//     }
// ];

export function getProducts(projectAlias, filter = {}) {
    const queryParams = toQueryParams(filter);

    return get(`/api/projects/${projectAlias}/products?${queryParams}`);
}

export function createNewProduct(projectAlias, product) {
    const payload = {...product};

    return post(`/api/projects/${projectAlias}/products`, payload);
}

export function updateProduct(projectAlias, product) {
    const payload = {...product};
    console.log('product', product);

    return put(`/api/projects/${projectAlias}/products/${product._id}`, payload);
}

export function getDefaultProductId(projectAlias) {
    return get(`/api/projects/${projectAlias}/product-id-default`);
}

export function deleteProduct(projectAlias, product) {
    return apiSender.delete(`/api/projects/${projectAlias}/products/${product._id}`);
}