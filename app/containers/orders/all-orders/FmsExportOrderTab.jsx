import React, {Component} from "react";
import {getOrders, ORDER_STATUS} from "../../../api/OrderApi";
import FmsSpin from "../../../commons/FmsSpin/FmsSpin";
import FmsOrderDetailModal from "../../../commons/order-modal/FmsOrderDetailModal";
import FmsExportOrderSearchBar from "./FmsExportOrderSearchBar";
import FmsExportOrderTable from "../../stock/FmsExportOrderTable";

class FmsExportOrderTab extends Component {

    state = {
        orders: [],
        selectedOrder: null,
        isLoading: true,
        isShownModal: false
    };

    searchItem(searchQuery) {
        console.log('searchQuery', searchQuery);
    }

    onCloseModal(updatedOrder) {
        if (updatedOrder) {
            const {project} = this.props;
            this.updateOrders(project);
        }

        this.setState({isShownModal: false});
    }

    openModal(order) {
        this.setState({
            selectedOrder: order,
            isShownModal: true,
        })
    }

    onSelectItem(order) {
        this.openModal(order);
    }

    updateOrders(project) {
        this.setState({isLoading: true});

        getOrders(project.alias, {status: ORDER_STATUS.EXPORTED_ORDER})
            .then(orders => this.setState({orders, isLoading: false}));
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
            isShownModal,
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
                                    onSelectItem={this.onSelectItem.bind(this)}
                                />
                        }

                        <FmsOrderDetailModal
                            isShown={isShownModal}
                            onClose={this.onCloseModal.bind(this)}
                            order={selectedOrder}
                            typeModalName="EXPORT_ORDER"
                            project={project}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default FmsExportOrderTab;