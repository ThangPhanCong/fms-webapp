import React, {Component} from "react";
import {getOrders, ORDER_STATUS} from "../../../api/OrderApi";
import FmsSpin from "../../../commons/FmsSpin/FmsSpin";
import FmsOrderDetailModal from "../../../commons/order-modal/FmsOrderDetailModal";
import FmsExportOrderSearchBar from "./FmsExportOrderSearchBar";
import FmsExportOrderTable from "../../stock/FmsExportOrderTable";
import FmsCreateTransportOrderModal from '../../../commons/transport-order-modal/FmsCreateTransportOrderModal';
import FmsTransportOrderDetailModal from '../../../commons/transport-order-modal/FmsTransportOrderDetailModal';
import {getAllProviders} from '../../../api/TransportProviderApi';

class FmsExportOrderTab extends Component {

    state = {
        orders: [],
        selectedOrder: null,
        selectedOrderId: null,
        isLoading: true,
        isShownDetailModal: false,
        isShownCreateTransportOrderModal: false,
        isShownTransportOrderDetailModal: false,
        providers: [],
        filter: {},
        timeoutKey: null
    };

    onChangeFilter(filter) {
        const {timeoutKey} = this.state;
        const before = 0.5 * 1000; // 0.5s

        if (timeoutKey) clearTimeout(timeoutKey);

        const newTimeoutKey = setTimeout(() => {
            this.updateOrderList(filter);
            this.setState({timeoutKey: null});
        }, before);

        this.setState({filter, timeoutKey: newTimeoutKey});
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

    updateOrderList(filter = this.state.filter) {
        this.setState({isLoading: true});

        getOrders({status: ORDER_STATUS.EXPORTED_ORDER, ...filter})
            .then(res => this.setState({orders: res.orders, isLoading: false}))
            .catch(err => alert(err.message));
    }

    componentDidMount() {
        const {project} = this.props;
        if (project) {
            this.updateOrderList();
            getAllProviders()
                .then(res => this.setState({providers: res}));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.project && nextProps.project !== this.props.project) {
            this.updateOrderList();
            getAllProviders()
                .then(res => this.setState({providers: res}));
        }

        if (nextProps.version !== this.props.version) {
            this.updateOrderList();
        }
    }

    render() {
        const {
            orders,
            isLoading,
            isShownDetailModal,
            isShownCreateTransportOrderModal,
            selectedOrder,
            selectedOrderId,
            isShownTransportOrderDetailModal,
            providers
        } = this.state;
        const {project} = this.props;

        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="ibox">
                        <FmsExportOrderSearchBar onChangeFilter={this.onChangeFilter.bind(this)}/>

                        {
                            isLoading ?
                                <FmsSpin size={25} center={true}/> :
                                <FmsExportOrderTable
                                    orders={orders}
                                    project={project}
                                    onSelectItem={this.onOpenDetailModal.bind(this)}
                                    onSelectCreateTransportOrderModal={this.onOpenCreateTransportOrderModal.bind(this)}
                                    onReloadOrders={this.reloadOrders.bind(this)}
                                    onSelectTransportOrderDetailModal={this.onOpenTransportOrderDetailModal.bind(this)}                                    
                                />
                        }

                        <FmsOrderDetailModal
                            isShown={isShownDetailModal}
                            onClose={this.onCloseDetailModal.bind(this)}
                            order={selectedOrder}
                            typeModalName="EXPORT_ORDER"
                            project={project}
                        />

                        <FmsCreateTransportOrderModal 
                            order={selectedOrder}
                            project={project}
                            onClose={this.onCloseCreateTransportOrderModal.bind(this)}
                            isShown={isShownCreateTransportOrderModal}
                            providers={providers}
                        />

                        <FmsTransportOrderDetailModal
                            order_id={selectedOrderId}
                            onClose={this.onCloseTransportOrderDetailModal.bind(this)}
                            isShown={isShownTransportOrderDetailModal}
                            providers={providers}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default FmsExportOrderTab;