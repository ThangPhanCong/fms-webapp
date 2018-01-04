import React, {Component} from "react";
import FmsProductDetailModal from "./modals/FmsProductDetailModal";
import ic_viettel from 'images/ic_viettel.png';

class FmsExportOrderTable extends Component {

    state = {
        isShowDetailModal: false
    };

    onCloseModal(shouldReloadData) {
        if (shouldReloadData) {
            this.props.onReloadOrders();
        }

        this.setState({isShowDetailModal: false});
    }

    onOpenModal(selectedOrder) {
        this.setState({isShowDetailModal: true, selectedOrder});
    }

    renderTableHeader() {
        return (
            <thead>
            <tr>
                <th>STT</th>
                <th>Mã đơn</th>
                <th>Khách hàng</th>
                <th>Điện thoại</th>
                <th>Địa chỉ</th>
                <th>Sản phẩm</th>
                <th>Thành tiền</th>
                <th>Ngày yêu cầu xuất</th>
            </tr>
            </thead>
        )
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

    renderTableRows() {
        const {orders} = this.props;

        return orders.map(
            (order, i) => (
                <tr key={i}>
                    <td>{i}</td>
                    <td><a>
                        <span
                            className="badge badge-info"
                            onClick={() => {
                                this.openModal(order)
                            }}
                        >{order.id}</span>
                    </a></td>
                    <td>{order.customer.name}</td>
                    <td>{order.customer.phone}</td>
                    <td>{order.transport.address}</td>

                    {
                        this.renderProductIdItem(order.products)
                    }

                    <td>1.000.000</td>
                    <td>14:53 <br/> 29-11</td>
                </tr>
            )
        );
    }

    renderTableBody () {
        return (
            <tbody>
            {
                this.renderTableRows()
            }
            </tbody>
        )
    }

    render() {
        const {
            isShowDetailModal,
            selectedProduct
        } = this.state;

        const {
            project
        } = this.props;

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

                <FmsProductDetailModal
                    isShown={isShowDetailModal}
                    onClose={this.onCloseModal.bind(this)}
                    product={selectedProduct}
                    project={project}
                />
            </div>
        )
    }
}

export default FmsExportOrderTable;