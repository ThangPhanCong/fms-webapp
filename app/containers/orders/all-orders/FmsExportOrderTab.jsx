import React, {Component} from "react";
import {getOrders, ORDER_STATUS} from "../../../api/OrderApi";
import FmsSpin from "../../../commons/FmsSpin/FmsSpin";
import FmsOrderDetailModal from "../../../commons/order-modal/FmsOrderDetailModal";
import FmsExportOrderSearchBar from "./FmsExportOrderSearchBar";
import FmsExportOrderTable from "../../stock/FmsExportOrderTable";
import FmsCreateTransportOrderModal from '../../stock/modals/FmsCreateTransportOrderModal';

class FmsExportOrderTab extends Component {

    state = {
        orders: [],
        selectedOrder: null,
        isLoading: true,
        isShownDetailModal: false,
        isShownCreateTransportOrderModal: false
    };

    searchItem(searchQuery) {
        console.log('searchQuery', searchQuery);
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

    updateOrders(project) {
        this.setState({isLoading: true});

        getOrders({status: ORDER_STATUS.EXPORTED_ORDER})
            .then(res => this.setState({orders: res.orders, isLoading: false}))
            .catch(err => alert(err.message));
    }

    componentDidMount() {
        const {project} = this.props;
        if (project) {
            this.updateOrders(project);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.project && nextProps.project !== this.props.project) {
            this.updateOrders(nextProps.project);
        }

        if (nextProps.version !== this.props.version) {
            this.updateOrders(this.props.project);
        }
    }

    render() {
        const {
            orders,
            isLoading,
            isShownDetailModal,
            isShownCreateTransportOrderModal,
            selectedOrder
        } = this.state;
        const {project} = this.props;

        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="ibox">
                        <FmsExportOrderSearchBar onSearchQueryChange={this.searchItem.bind(this)}/>

                        {
                            isLoading ?
                                <FmsSpin size={25} center={true}/> :
                                <FmsExportOrderTable
                                    orders={orders}
                                    project={project}
                                    onSelectItem={this.onOpenDetailModal.bind(this)}
                                    onSelectCreateTransportOrderModal={this.onOpenCreateTransportOrderModal.bind(this)}
                                    onReloadOrders={this.reloadOrders.bind(this)}
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
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default FmsExportOrderTab;