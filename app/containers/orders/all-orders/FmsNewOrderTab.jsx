import React, {Component} from "react";
import FmsNewOrderSearchBar from "./FmsNewOrderSearchBar";
import FmsNewOrderTable from "./FmsNewOrderTable";
import {getOrders} from "../../../api/OrderApi";
import FmsSpin from "../../../commons/FmsSpin/FmsSpin";
import FmsOrderDetailModal from "../../../commons/order-modal/FmsOrderDetailModal";

class FmsNewOrderTab extends Component {

    state = {
        orders: [],
        selectedOrder: null,
        isLoading: true,
        isShownModal: false,
        search: null,
        filter: {},
        timeoutKey: null
    };

    onChangeFilter(filter) {
        const {project} = this.props;
        const {timeoutKey} = this.state;
        const before = 0.5 * 1000; // 0.5s

        if (timeoutKey) clearTimeout(timeoutKey);

        const newTimeoutKey = setTimeout(() => {
            this.updateOrders(project, filter);
            this.setState({timeoutKey: null});
        }, before);

        this.setState({filter, timeoutKey: newTimeoutKey});
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

    updateOrders(project, filter = this.state.filter) {
        this.setState({isLoading: true});

        getOrders(filter)
            .then(response => this.setState({orders: response.orders.reverse(), isLoading: false}));
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
                        <FmsNewOrderSearchBar onChangeFilter={this.onChangeFilter.bind(this)} project={project}/>

                        {
                            isLoading ?
                                <FmsSpin size={25} center={true}/> :
                                <FmsNewOrderTable
                                    orders={orders}
                                    project={project}
                                    onSelectItem={this.onSelectItem.bind(this)}
                                />
                        }

                        <FmsOrderDetailModal
                            isShown={isShownModal}
                            onClose={this.onCloseModal.bind(this)}
                            order={selectedOrder}
                            typeModalName='ALL_ORDER'
                            project={project}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default FmsNewOrderTab;