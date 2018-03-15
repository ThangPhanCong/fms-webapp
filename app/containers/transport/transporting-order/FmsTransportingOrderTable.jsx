import React, {Component} from "react";
import propTypes from "prop-types";
import FmsTransportingOrderItem from "./FmsTransportingOrderItem";

class FmsTransportingOrderTable extends Component {

    renderTableBody() {
        const {
            orders,
            onSelectItem,
            onSelectCreateTransportOrderModal,
            onSelectTransportOrderDetailModal
        } = this.props;

        return (
            <tbody>
            {
                orders.map(
                    (order, i) => (
                        <FmsTransportingOrderItem
                            key={order._id}
                            index={i}
                            order={order}
                            onSelectItem={onSelectItem}
                            onSelectCreateTransportOrderModal={onSelectCreateTransportOrderModal}
                            onSelectTransportOrderDetailModal={onSelectTransportOrderDetailModal}
                        />
                    )
                )
            }
            </tbody>
        )
    }

    renderTableHeader() {
        return (
            <thead>
            <tr>
                <th>STT</th>
                <th>Mã đơn</th>
                <th>Khách hàng</th>
                <th>Điện thoại</th>
                <th>Nhà mạng</th>
                <th>Sản phẩm</th>
                <th>Ghi chú</th>
                <th>Ngày tạo</th>
                <th>Thành tiền</th>
                <th className='text-center'>Đã thanh toán</th>
                <th>Đánh dấu</th>
                <th>Vận đơn</th>
            </tr>
            </thead>
        )
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table table-striped">
                    {
                        this.renderTableHeader()
                    }

                    {
                        this.renderTableBody()
                    }
                </table>

            </div>
        )
    }


}

FmsTransportingOrderTable.propTypes = {
    orders: propTypes.array,
    onSelectItem: propTypes.func,
    onSelectCreateTransportOrderModal: propTypes.func,
    onSelectTransportOrderDetailModal: propTypes.func
};

export default FmsTransportingOrderTable;