import React, {Component} from "react";
import FmsNewOrderTable from "./FmsNewOrderTable";
import {getNewProjectOrders} from "../../../api/OrderApi";
import FmsSpin from "../../../commons/FmsSpin/FmsSpin";
import FmsExportOrderSearchBar from "./FmsExportOrderSearchBar";

class FmsExportOrderTab extends Component {

    state = {
        orders: [],
        isLoading: true,
        search: null
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
        this.updateOrders(project);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.project) {
            this.updateOrders(nextProps.project);
        }
    }

    render() {
        const {orders, isLoading} = this.state;

        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="ibox">
                        <FmsExportOrderSearchBar onSearchQueryChange={this.searchItem.bind(this)}/>

                        {
                            isLoading ?
                                <FmsSpin size={25} center={true}/> : null

                        }
                        {/*<FmsNewOrderTable orders={orders}/>*/}
                    </div>
                </div>
            </div>
        )
    }
}

export default FmsExportOrderTab;