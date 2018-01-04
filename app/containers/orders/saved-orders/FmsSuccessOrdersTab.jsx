import React, {Component} from "react";
import {getNewProjectOrders} from "../../../api/OrderApi";
import FmsSpin from "../../../commons/FmsSpin/FmsSpin";
import FmsSucessOrderSearchBar from "./FmsSucessOrderSearchBar";
import FmsSuccessOrderTable from "./FmsSuccessOrderTable";

class FmsSuccessOrdersTab extends Component {

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
                        <FmsSucessOrderSearchBar onSearchQueryChange={this.searchItem.bind(this)}/>

                        {
                            isLoading ?
                                <FmsSpin size={25} center={true}/> :
                                <FmsSuccessOrderTable orders={orders}/>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default FmsSuccessOrdersTab;