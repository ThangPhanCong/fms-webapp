import {delay} from '../utils/timeout-utils';

export function getProducts(projectAlias) {
    const products = [
        {
            id: 'SP12501',
            name: 'ĐỒNG HỒ NAM CHÍNH HÃNG BINGER BG01',
            quantity: '200',
            price: '40000',
            unit: 'chiếc'
        },
        {
            id: 'SP12502',
            name: 'ĐỒNG HỒ NAM DÂY DA CAO CẤP CHÍNH HÃNG BINGER BG02 AUTOMATIC',
            quantity: '135',
            price: '80000',
            unit: 'chiếc'
        }
    ];

    return delay(1000).then(() => Promise.resolve(products));
}