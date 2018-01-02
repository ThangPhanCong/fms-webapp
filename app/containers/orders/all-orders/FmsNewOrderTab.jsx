import React, {Component} from "react";
import FmsNewOrderSearchBar from "./FmsNewOrderSearchBar";
import FmsNewOrderTable from "./FmsNewOrderTable";

class FmsNewOrderTab extends Component {

    state = {
        orders: [],
        search: null
    };

    searchItem(searchQuery) {
        console.log('searchQuery', searchQuery);
    }

    render() {
        const {orders} = this.state;

        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="ibox">
                        <FmsNewOrderSearchBar onSearchQueryChange={this.searchItem.bind(this)}/>

                        <FmsNewOrderTable orders={orders}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default FmsNewOrderTab;