import React, {Component} from "react";
import {getSuccessOrder} from "../../../api/OrderApi";
import FmsSpin from "../../../commons/FmsSpin/FmsSpin";
import FmsSucessOrderSearchBar from "./FmsSucessOrderSearchBar";
import FmsSuccessOrderTable from "./FmsSuccessOrderTable";

class FmsSuccessOrdersTab extends Component {

    state = {
        orders: [],
        isLoading: true,
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

    updateOrders(project, filter = this.state.filter) {
        //this.setState({isLoading: true});

        getSuccessOrder(project.alias, filter)
            .then(orders => this.setState({orders: orders.reverse(), isLoading: false}));
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
    }

    render() {
        const {orders, isLoading} = this.state;
        const {project} = this.props;

        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="ibox">
                        <FmsSucessOrderSearchBar onChangeFilter={this.onChangeFilter.bind(this)}/>

                        {
                            isLoading ?
                                <FmsSpin size={25} center={true}/> :
                                <FmsSuccessOrderTable 
                                    orders={orders} 
                                    project={project}
                                    updateOrders={this.updateOrders.bind(this, project)}
                                />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default FmsSuccessOrdersTab;