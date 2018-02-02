import React, {Component} from 'react';
import FmsPageTitle from "../../commons/page-title/FmsPageTitle";
import FmsSpin from "../../commons/FmsSpin/FmsSpin";
import {getOrders, ORDER_STATUS} from "../../api/OrderApi";
import FmsTransportOrderSearchBar from "./transport-orders/FmsTransportOrderSearchBar";
import FmsTransportOrderTable from "./transport-orders/FmsTransportOrderTable";
import FmsOrderDetailModal from "../../commons/order-modal/FmsOrderDetailModal";

class FmsTransportOrders extends Component {

    state = {
        project: null,
        orders: [],
        selectedOrder: null,
        isLoading: true,
        isShownDetailModal: false
    };

    onCloseDetailModal(updatedOrder) {
        if (updatedOrder) {
            const {project} = this.state;
            this.updateOrderList(project);
        }

        this.setState({isShownDetailModal: false});
    }

    onOpenDetailModal(selectedOrder) {
        console.log('ok men', selectedOrder)
        this.setState({selectedOrder, isShownDetailModal: true});
    }

    componentWillReceiveProps(nextProps) {
        const {project} = this.state;
        if (!project || (nextProps.project && nextProps.project.alias !== project.alias)) {
            this.setState({project: nextProps.project});
            this.updateOrderList(nextProps.project);
        }
    }

    updateOrderList(project) {
        project = project || this.props.project;
        this.setState({isLoading: true});

        if (project) {
            getOrders(project.alias, {status: ORDER_STATUS.TRANSPORTED_ORDER})
                .then(orders => this.setState({orders, isLoading: false}));
        }
    }

    reloadOrders() {
        const {project} = this.props;
        this.updateOrderList(project);
    }

    render() {
        const {project} = this.props;
        const {
            orders,
            selectedOrder,
            isLoading,
            isShownDetailModal
        } = this.state;

        let projectName = 'Cửa hàng';
        if (project) {
            projectName = project.name;
        }

        return (
            [
                <FmsPageTitle key={1} title="Yêu cầu vận chuyển"
                              route={`${projectName}/Quản lí vận chuyển/Yêu cầu vận chuyển`}/>,

                <div key={2} className="wrapper wrapper-content">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ibox">
                                <div className="ibox-content">

                                    <FmsTransportOrderSearchBar />

                                    {
                                        isLoading ?
                                            <FmsSpin size={25} center={true}/>
                                            :
                                            <FmsTransportOrderTable
                                                orders={orders}
                                                project={project}
                                                onReloadOrders={this.reloadOrders.bind(this)}
                                                onSelectItem={this.onOpenDetailModal.bind(this)}
                                            />
                                    }

                                    <FmsOrderDetailModal
                                        order={selectedOrder}
                                        project={project}
                                        onClose={this.onCloseDetailModal.bind(this)}
                                        isShown={isShownDetailModal}
                                        typeModal={1}
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


export default FmsTransportOrders;