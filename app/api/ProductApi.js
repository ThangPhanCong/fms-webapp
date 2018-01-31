import apiSender, {get, post, put} from './ApiSender';
import {toQueryParams} from 'utils/query-utils';

export function getProducts(projectAlias, filter = {}) {
    const queryParams = toQueryParams(filter);

    return get(`/api/o/products?${queryParams}`);
}

export function createNewProduct(projectAlias, product) {
    const payload = {...product};

    return post(`/api/o/products`, payload);
}

export function updateProduct(projectAlias, product) {
    const payload = {...product};

    return put(`/api/o/products/${product._id}`, payload);
}

export function getDefaultProductId(projectAlias) {
    return get(`/api/o/product-id-default`);
}

export function deleteProduct(projectAlias, product) {
    return apiSender.delete(`/api/o/products/${product._id}`);
}