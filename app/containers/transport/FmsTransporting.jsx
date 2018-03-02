import React, {Component} from 'react';
import FmsPageTitle from "../../commons/page-title/FmsPageTitle";
import FmsSpin from "../../commons/FmsSpin/FmsSpin";
import {getOrders, ORDER_STATUS} from "../../api/OrderApi";
import FmsTransportOrderSearchBar from "./transport-orders/FmsTransportOrderSearchBar";
import FmsTransportOrderTable from "./transport-orders/FmsTransportOrderTable";
import FmsTransportingSearchBar from "./transporting/FmsTransportingSearchBar";
import FmsTransportingTable from "./transporting/FmsTransportingTable";
import FmsOrderDetailModal from "../../commons/order-modal/FmsOrderDetailModal";

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

        getOrders(project.alias, {status: ORDER_STATUS.TRANSPORTING})
            .then(res => this.setState({
                orders: res.orders,
                isLoading: false
            }))
            .catch(err => alert(err.message));
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

        return (
            [
                <FmsPageTitle key={1} title="Đang vận chuyển"
                              route={`${project.name}/Quản lí vận chuyển/Đang vận chuyển`}/>,

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

                                    <FmsOrderDetailModal
                                        order={selectedOrder}
                                        project={project}
                                        onClose={this.onCloseDetailModal.bind(this)}
                                        isShown={isShownDetailModal}
                                        typeModalName='TRANSPORTING'
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


export default FmsTransporting;