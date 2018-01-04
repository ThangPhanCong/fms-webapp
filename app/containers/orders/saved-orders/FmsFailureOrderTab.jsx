import React, {Component} from "react";
import {getNewProjectOrders} from "../../../api/OrderApi";
import FmsSpin from "../../../commons/FmsSpin/FmsSpin";
import FmsSuccessOrderTable from "./FmsSuccessOrderTable";
import FmsFailureOrderSearchBar from "./FmsFailureOrderSearchBar";
import FmsFailureOrderTable from "./FmsFailureOrderTable";

class FmsFailureOrderTab extends Component {

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
                        <FmsFailureOrderSearchBar onSearchQueryChange={this.searchItem.bind(this)}/>

                        {
                            isLoading ?
                                <FmsSpin size={25} center={true}/> :
                                <FmsFailureOrderTable orders={orders}/>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default FmsFailureOrderTab;