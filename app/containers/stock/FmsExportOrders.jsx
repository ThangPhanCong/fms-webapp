import React, {Component} from 'react';
import FmsPageTitle from "../../commons/page-title/FmsPageTitle";
import FmsSpin from "../../commons/FmsSpin/FmsSpin";
import FmsExportOrderSearchBar from "../orders/all-orders/FmsExportOrderSearchBar";
import FmsExportOrderTable from "./FmsExportOrderTable";
import {getOrders, ORDER_STATUS} from "../../api/OrderApi";
import FmsOrderDetailModal from "../../commons/order-modal/FmsOrderDetailModal";
import FmsCreateTransportOrderModal from './modals/FmsCreateTransportOrderModal';
import FmsTransportOrderDetailModal from './modals/FmsTransportOrderDetailModal';

class FmsExportOrders extends Component {

    state = {
        orders: [],
        selectedOrder: null,
        selectedOrderId: null,
        isLoading: true,
        isShownDetailModal: false,
        isShownCreateTransportOrderModal: false,
        isShownTransportOrderDetailModal: false
    };

    updateOrderList() {
        this.setState({isLoading: true});

        getOrders({status: ORDER_STATUS.EXPORTED_ORDER})
            .then(res => this.setState({orders: res.orders, isLoading: false}));
    }

    reloadOrders() {
        this.updateOrderList();
    }

    onCloseDetailModal(updatedOrder) {
        if (updatedOrder) {
            this.updateOrderList();
        }

        this.setState({isShownDetailModal: false});
    }

    onOpenDetailModal(selectedOrder) {
        this.setState({selectedOrder, isShownDetailModal: true});
    }

    onCloseCreateTransportOrderModal(updatedOrder) {
        if (updatedOrder) {
            this.updateOrderList();
        }

        this.setState({isShownCreateTransportOrderModal: false});
    }

    onOpenCreateTransportOrderModal(selectedOrder) {
        this.setState({selectedOrder, isShownCreateTransportOrderModal: true});
    }

    onOpenTransportOrderDetailModal(order_id) {
        this.setState({selectedOrderId: order_id, isShownTransportOrderDetailModal: true});
    }

    onCloseTransportOrderDetailModal() {
        this.setState({isShownTransportOrderDetailModal: false});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.project) {
            this.updateOrderList();
        }
    }

    componentDidMount() {
        this.updateOrderList();
    }

    render() {
        const {project} = this.props;
        const {
            orders,
            selectedOrder,
            selectedOrderId,
            isLoading,
            isShownDetailModal,
            isShownCreateTransportOrderModal,
            isShownTransportOrderDetailModal
        } = this.state;

        return (
            [
                <FmsPageTitle key={1} title="Yêu cầu xuất hàng"
                              route={`${project.name}/Quản lí đơn hàng/Yêu cầu xuất hàng`}/>,

                <div key={2} className="wrapper wrapper-content">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ibox">
                                <div className="ibox-content">

                                    <FmsExportOrderSearchBar/>

                                    {
                                        isLoading ?
                                            <FmsSpin size={25} center={true}/>
                                            :
                                            <FmsExportOrderTable
                                                orders={orders}
                                                project={project}
                                                onReloadOrders={this.reloadOrders.bind(this)}
                                                onSelectItem={this.onOpenDetailModal.bind(this)}
                                                onSelectCreateTransportOrderModal={this.onOpenCreateTransportOrderModal.bind(this)}
                                                onSelectTransportOrderDetailModal={this.onOpenTransportOrderDetailModal.bind(this)}
                                            />
                                    }

                                    <FmsOrderDetailModal
                                        order={selectedOrder}
                                        project={project}
                                        onClose={this.onCloseDetailModal.bind(this)}
                                        isShown={isShownDetailModal}
                                        typeModalName='EXPORT_ORDER'
                                    />

                                    <FmsCreateTransportOrderModal 
                                        order={selectedOrder}
                                        onClose={this.onCloseCreateTransportOrderModal.bind(this)}
                                        isShown={isShownCreateTransportOrderModal}
                                    />

                                    <FmsTransportOrderDetailModal
                                        order_id={selectedOrderId}
                                        onClose={this.onCloseTransportOrderDetailModal.bind(this)}
                                        isShown={isShownTransportOrderDetailModal}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ]
        )
    }
}


export default FmsExportOrders;