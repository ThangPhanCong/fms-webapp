import React, {Component} from "react";
import FmsNewOrderSearchBar from "./FmsNewOrderSearchBar";
import FmsNewOrderTable from "./FmsNewOrderTable";
import {getNewProjectOrders} from "../../../api/OrderApi";
import FmsSpin from "../../../commons/FmsSpin/FmsSpin";

class FmsNewOrderTab extends Component {

    state = {
        orders: [],
        isLoading: true
    };

    searchItem(searchQuery) {
        console.log('searchQuery', searchQuery);
    }

    updateOrders(project) {
        this.setState({isLoading: true});

        getNewProjectOrders(project.alias)
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
        const {orders, isLoading} = this.state;
        const {project} = this.props;

        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="ibox">
                        <FmsNewOrderSearchBar onSearchQueryChange={this.searchItem.bind(this)}/>

                        {
                            isLoading ?
                                <FmsSpin size={25} center={true}/> :
                                <FmsNewOrderTable orders={orders} project={project}/>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default FmsNewOrderTab;