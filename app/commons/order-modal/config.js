export const typesModal = [
    {
        name: 'Tất cả đơn hàng',
        key: 'ALL_ORDER',
        customer_info: true,
        note_info: true,
        order_tag_info: true,
        source_post_info: true,
        price_calculator: true,
        products_info: true,
        transport_info: true,

        delete_btn: true,
        save_btn: true,
        export_btn: true,
        transporting_btn: false,
        update_btn: true
    },
    {
        name: 'Yêu cầu xuất',
        key: 'EXPORT_ORDER',
        customer_info: true,
        note_info: true,
        order_tag_info: true,
        source_post_info: true,
        price_calculator: true,
        products_info: true,
        transport_info: true,

        delete_btn: true,
        save_btn: true,
        export_btn: false,
        transporting_btn: true,
        update_btn: true
    },
    {
        name: 'Đang vận chuyển',
        key: 'TRANSPORTING_ORDER',
        customer_info: false,
        note_info: true,
        order_tag_info: true,
        source_post_info: false,
        price_calculator: false,
        products_info: false,
        transport_info: false,

        delete_btn: true,
        save_btn: true,
        export_btn: false,
        transporting_btn: false,
        update_btn: true
    },
    {
        name: 'Lưu trữ đơn',
        key: 'SAVED_ORDER',
        customer_info: false,
        note_info: false,
        order_tag_info: false,
        source_post_info: false,
        price_calculator: false,
        products_info: false,
        transport_info: false,

        delete_btn: true,
        save_btn: false,
        export_btn: false,
        transporting_btn: false,
        update_btn: false
    },
];


export function getConfigByName(name) {
    return typesModal.find(t => t.key === name);
}