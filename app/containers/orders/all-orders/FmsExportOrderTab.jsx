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

    componentDidMount() {
        getNewProjectOrders()
            .then(orders => this.setState({orders, isLoading: false}));
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
                                <FmsSpin size={25} center={true}/> :
                                <FmsNewOrderTable orders={orders}/>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default FmsExportOrderTab;