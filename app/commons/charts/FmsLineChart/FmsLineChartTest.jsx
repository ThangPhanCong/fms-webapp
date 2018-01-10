import React from "react"
import FmsLineChart from "./FmsLineChart";
import uuid from "uuid";

class FmsLineChartTest extends React.Component {
    render() {
        return (
            <div>
                <FmsLineChart data={[34, 43, 43, 35, 44, 32, 44, 52]} id={uuid()}/>
                <FmsLineChart data={[34, 43, 43, 35, 44, 32, 44, 52]} id={uuid()}/>
                <FmsLineChart data={[34, 43, 43, 35, 44, 32, 44, 52]} id={uuid()}/>
            </div>

        )
    }
}

export default FmsLineChartTest;