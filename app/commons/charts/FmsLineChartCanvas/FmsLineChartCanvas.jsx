import React from 'react';
import $ from 'jquery'
import '../../../assets/js/chartJs/Chart.min.js';

class FmsLineChartCanvas extends React.Component {
    componentDidMount() {
        let {lineData} = this.props

        let lineOptions = {
            responsive: true
        };


        let ctx = document.getElementById("lineChart").getContext("2d");
        new Chart(ctx, {type: 'line', data: lineData, options:lineOptions});
    }

    render(){
        return(
            <div className="row">
                <div className="col-lg-12">
                    <div>
                        <canvas id="lineChart" height="70" ></canvas>
                    </div>
                </div>
            </div>
        );
    }
}
export default FmsLineChartCanvas;
