import React, {Component} from "react";
import propTypes from 'prop-types';
import {getSuccessOrder} from "../../../api/OrderApi";
import FmsSpin from "../../../commons/FmsSpin/FmsSpin";
import FmsSucessOrderSearchBar from "./FmsSucessOrderSearchBar";
import FmsSuccessOrderTable from "./FmsSuccessOrderTable";
import FmsOrderDetailModal from "../../../commons/order-modal/FmsOrderDetailModal";

class FmsSuccessOrdersTab extends Component {

    state = {
        orders: [],
        isLoading: true,
        search: null,
        isShownModal: false,
        selectedOrder: null
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

    getOrders(project) {
        this.setState({isLoading: true});

        getSuccessOrder(project.alias)
            .then(orders => this.setState({orders, isLoading: false}));
    }

    componentDidMount() {
        const {project} = this.props;

        if (project) this.getOrders(project);
    }

    componentWillReceiveProps(nextProps) {
        const {project} = this.props;
        if (!project || project !== nextProps.project) {
            this.getOrders(nextProps.project);
        }
    }

    render() {
        const {project} = this.props;
        const {
            orders,
            isLoading,
            selectedOrder,
            isShownModal
        } = this.state;

        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="ibox">
                        <FmsSucessOrderSearchBar onSearchQueryChange={this.searchItem.bind(this)}/>

                        {
                            isLoading ?
                                <FmsSpin size={25} center={true}/> :
                                <FmsSuccessOrderTable
                                    orders={orders}
                                    onSelectItem={this.onSelectItem.bind(this)}
                                />
                        }

                        <FmsOrderDetailModal
                            isShown={isShownModal}
                            onClose={this.onCloseModal.bind(this)}
                            order={selectedOrder}
                            project={project}
                        />

                    </div>
                </div>
            </div>
        )
    }
}

FmsSuccessOrdersTab.propTypes = {
    project: propTypes.object
};

export default FmsSuccessOrdersTab;