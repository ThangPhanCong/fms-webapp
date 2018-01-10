import React from "react"
import FmsLineChartCanvas from "./FmsLineChartCanvas";

const lineData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "Example dataset",
            backgroundColor: "rgba(26,179,148,0.5)",
            borderColor: "rgba(26,179,148,0.7)",
            pointBackgroundColor: "rgba(26,179,148,1)",
            pointBorderColor: "#fff",
            data: [28, 48, 40, 19, 86, 27, 90]
        },
        {
            label: "Example dataset",
            backgroundColor: "rgba(220,220,220,0.5)",
            borderColor: "rgba(220,220,220,1)",
            pointBackgroundColor: "rgba(220,220,220,1)",
            pointBorderColor: "#fff",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "Example dataset",
            backgroundColor: "rgba(220,220,220,0.5)",
            borderColor: "rgba(220,220,220,1)",
            pointBackgroundColor: "rgba(220,220,220,1)",
            pointBorderColor: "#fff",
            data: [90, 19, 80, 61, 56, 95, 10]
        }
    ]
};

class FmsLineChartCanvasTest extends React.Component {
    render() {
        return (
            <div>
                <FmsLineChartCanvas lineData={lineData}/>
            </div>
        )
    }
}

export default FmsLineChartCanvasTest;