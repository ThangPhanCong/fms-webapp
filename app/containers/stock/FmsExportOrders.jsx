import React, {Component} from 'react';
import FmsPageTitle from "../../commons/page-title/FmsPageTitle";
import FmsSpin from "../../commons/FmsSpin/FmsSpin";
import FmsExportOrderSearchBar from "../orders/all-orders/FmsExportOrderSearchBar";
import FmsExportOrderTable from "./FmsExportOrderTable";
import {getOrders, ORDER_STATUS} from "../../api/OrderApi";
import FmsOrderDetailModal from "../../commons/order-modal/FmsOrderDetailModal";
import FmsCreateTransportOrderModal from './modals/FmsCreateTransportOrderModal';

class FmsExportOrders extends Component {

    state = {
        orders: [],
        selectedOrder: null,
        isLoading: true,
        isShownDetailModal: false,
        isShownCreateTransportOrderModal: false,
    };

    updateOrderList(project) {
        project = project || this.props.project;
        this.setState({isLoading: true});

        if (project) {
            getOrders(project.alias, {status: ORDER_STATUS.EXPORTED_ORDER})
                .then(orders => this.setState({orders, isLoading: false}));
        }
    }

    reloadOrders() {
        const {project} = this.props;
        this.updateOrderList(project);
    }

    onCloseDetailModal(updatedOrder) {
        if (updatedOrder) {
            const {project} = this.state;
            this.updateOrderList(project);
        }

        this.setState({isShownDetailModal: false});
    }

    onOpenDetailModal(selectedOrder) {
        this.setState({selectedOrder, isShownDetailModal: true});
    }

    onCloseCreateTransportOrderModal(updatedOrder) {
        if (updatedOrder) {
            const {project} = this.state;
            this.updateOrderList(project);
        }

        this.setState({isShownCreateTransportOrderModal: false});
    }

    onOpenCreateTransportOrderModal(selectedOrder) {
        this.setState({selectedOrder, isShownCreateTransportOrderModal: true});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.project) {
            this.updateOrderList(nextProps.project);
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
            isLoading,
            isShownDetailModal,
            isShownCreateTransportOrderModal
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
                                        project={project}
                                        onClose={this.onCloseCreateTransportOrderModal.bind(this)}
                                        isShown={isShownCreateTransportOrderModal}
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