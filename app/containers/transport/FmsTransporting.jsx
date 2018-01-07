import React, {Component} from 'react';
import FmsPageTitle from "../../commons/page-title/FmsPageTitle";
import FmsSpin from "../../commons/FmsSpin/FmsSpin";
import {getTransportingOrders, getTransportOrders} from "../../api/OrderApi";
import FmsTransportOrderSearchBar from "./transport-orders/FmsTransportOrderSearchBar";
import FmsTransportOrderTable from "./transport-orders/FmsTransportOrderTable";
import FmsTransportedOrderDetailModal from "./modals/FmsTransportedOrderDetailModal";
import FmsTransportingSearchBar from "./transporting/FmsTransportingSearchBar";
import FmsTransportingTable from "./transporting/FmsTransportingTable";
import FmsTransportingDetailModal from "./modals/FmsTransportingDetailModal";

class FmsTransporting extends Component {

    state = {
        orders: [],
        selectedOrder: null,
        isLoading: true,
        isShownDetailModal: false
    };

    onCloseDetailModal(updatedOrder) {
        if (updatedOrder) {
            const {project} = this.props;
            this.updateOrderList(project);
        }

        this.setState({isShownDetailModal: false});
    }

    onOpenDetailModal(selectedOrder) {
        console.log('onOpenDetailModal', selectedOrder)
        this.setState({selectedOrder, isShownDetailModal: true});
    }

    reloadOrders() {
        const {project} = this.props;
        this.updateOrderList(project);
    }

    updateOrderList(project) {
        this.setState({isLoading: true});

        getTransportingOrders(project.alias)
            .then(orders => this.setState({
                orders,
                isLoading: false
            }));
    }

    componentDidMount() {
        const {project} = this.props;
        if (project) {
            this.updateOrderList(project);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.project !== this.props.project) {
            this.updateOrderList(nextProps.project);
        }
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
                <FmsPageTitle key={1} title="Đang vận chuyển"
                              route={`${projectName}/Quản lí vận chuyển/Đang vận chuyển`}/>,

                <div key={2} className="wrapper wrapper-content">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ibox">
                                <div className="ibox-content">

                                    <FmsTransportingSearchBar/>

                                    {
                                        isLoading ?
                                            <FmsSpin size={25} center={true}/>
                                            :
                                            <FmsTransportingTable
                                                orders={orders}
                                                project={project}
                                                onReloadOrders={this.reloadOrders.bind(this)}
                                                onSelectItem={this.onOpenDetailModal.bind(this)}
                                            />
                                    }

                                    <FmsTransportingDetailModal
                                        order={selectedOrder}
                                        project={project}
                                        onClose={this.onCloseDetailModal.bind(this)}
                                        isShown={isShownDetailModal}/>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ]
        )
    }
}


export default FmsTransporting;