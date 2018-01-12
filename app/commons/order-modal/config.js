import {ORDER_STATUS} from '../../api/OrderApi';

export const typesModal = [
    {
        name: 'Tạo mới đơn hàng',
        ghiChu: true,
        danhDau: true,
        khachHang: true,
        vanChuyen: true,
        sanPham: true,
        thanhToan: true,
        btnSuccessName: 'Tạo mới',
        btnDelete: false,
        btnUpdate: false,
        nextStatus: ORDER_STATUS.DRAFT,
        createNewOrder: true
    },
    {
        name: 'Tất cả đơn hàng',
        ghiChu: true,
        danhDau: true,
        khachHang: true,
        vanChuyen: true,
        sanPham: true,
        thanhToan: true,
        btnSuccessName: 'Yêu cầu xuất',
        btnDelete: true,
        btnUpdate: true,
        nextStatus: ORDER_STATUS.EXPORTED_ORDER
    },
    {
        name: 'Yêu cầu xuất hàng',
        ghiChu: true,
        danhDau: false,
        khachHang: false,
        vanChuyen: true,
        sanPham: false,
        thanhToan: true,
        btnSuccessName: 'Yêu cầu vận chuyển',
        btnDelete: true,
        btnUpdate: true,        
        nextStatus: ORDER_STATUS.TRANSPORTED_ORDER
    },
    {
        name: 'Yêu cầu vận chuyển',
        ghiChu: true,
        danhDau: false,
        khachHang: false,
        vanChuyen: true,
        sanPham: false,
        thanhToan: false,
        btnSuccessName: 'Đang vận chuyển',
        btnDelete: true,
        btnUpdate: true,        
        nextStatus: ORDER_STATUS.TRANSPORTING
    },
    {
        name: 'Đang vận chuyển',
        ghiChu: true,
        danhDau: false,
        khachHang: false,
        vanChuyen: false,
        sanPham: false,
        thanhToan: false,
        btnSuccessName: 'Lưu trữ đơn',
        btnDelete: false,
        btnUpdate: true,        
        nextStatus: ORDER_STATUS.SAVED_ORDER
    }
];
