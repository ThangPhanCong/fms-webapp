export const typesModal = [
    {
        name: 'Tất cả đơn hàng',
        ghiChu: true,
        danhDau: true,
        khachHang: true,
        vanChuyen: true,
        sanPham: true,
        thanhToan: true,
        btnSuccessName: 'Yêu cầu xuất',
        nextStatus: 'EXPORTED_ORDER'
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
        nextStatus: 'TRANSPORTED_ORDER'
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
        nextStatus: 'TRANSPORTING'
    },
    {
        name: 'Đang vận chuyển',
        ghiChu: true,
        danhDau: false,
        khachHang: false,
        vanChuyen: false,
        sanPham: false,
        thanhToan: false,
        btnSuccessName: 'Xong',
        nextStatus: ''
    }
];
