import React, {Component} from "react";
import FmsStatisticSearchBar from "../table/FmsStatisticSearchBar";
import FmsStatisticTableBody from "./FmsStatisticTableBody";

class FmsStatisticTable extends Component {
    render() {
        return (
            <div className="ibox fms-statistic-table">
                <div className="ibox-content">
                    <FmsStatisticSearchBar />

                    <FmsStatisticTableBody />
                </div>
            </div>
        );
    }
}

export default FmsStatisticTable;