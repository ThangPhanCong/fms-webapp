import React, {Component} from "react";

import ic_viettel from 'images/ic_viettel.png';
import FmsOrderDetailModal from "../../../commons/order-modal/FmsOrderDetailModal";
import {toReadableDatetime} from 'utils/datetime-utils';

class FmsFailureOrderTable extends Component {

    state = {
        isShownModal: false,
        selectedOrder: null
    };

    onCloseModal (updatedOrder) {
        if (updatedOrder) {
            const {project} = this.props;
            this.props.updateOrders(project);
        }
        this.setState({isShownModal: false});
    }

    openModal (order) {
        this.setState({isShownModal: true, selectedOrder: order})
    }

    renderProductIdItem(products) {
        return (
            <td>
                {
                    products.map(
                        (product, i) => [
                            <span key={1}>{product.id}</span>,
                            <br key={2}/>
                        ]
                    )
                }
            </td>
        )
    }

    renderDatetime(datetime) {
        const date = toReadableDatetime(datetime);
        return (
            <td>
                {date.time}
                <br/> 
                {date.date}
            </td>
        );
    }

    renderTableRows() {
        const {orders} = this.props;

        return orders.map(
            (order, i) => (
                <tr key={i}>
                    <td>{i}</td>
                    <td><a>
                        <span
                            className="badge badge-info"
                            onClick={() => {this.openModal(order)}}
                        >{order.id}</span>
                    </a></td>
                    <td>{order.customer_name}</td>
                    <td>{order.customer_phone}</td>
                    <td><img src={ic_viettel}/></td>

                    {
                        this.renderProductIdItem(order.products)
                    }

                    <td>{order.private_note}</td>
                    {
                        this.renderDatetime(order.created_time)
                    }
                    {
                        this.renderDatetime(order.updated_time)
                    }
                </tr>
            )
        );
    }

    renderTableBody() {
        return (
            <tbody>
            {
                this.renderTableRows()
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
                <th>Ngày hủy</th>
            </tr>
            </thead>
        )
    }

    render() {
        const {isShownModal, selectedOrder} = this.state;
        const {project} = this.props; 

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

                <FmsOrderDetailModal
                    isShown={isShownModal}
                    onClose={this.onCloseModal.bind(this)}
                    order={selectedOrder}
                    typeModalName='SAVED_ORDER'
                    project={project}
                />
            </div>
        )
    }


}

export default FmsFailureOrderTable;