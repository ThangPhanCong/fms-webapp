import React from 'react';
import '../../../assets/js/chart/Chart.min.js';

class FmsLineChartCanvas extends React.Component {

    draw() {
        const {
            lineData
        } = this.props;

        const lineOptions = {
            responsive: true
        };

        const ctx = document.getElementById("lineChart").getContext("2d");
        new Chart(ctx, {type: 'line', data: lineData, options: lineOptions});
    }

    componentDidMount() {
        this.draw();
    }

    render() {
        return (
            <div className='fms-line-chart-canvas'>
                <canvas id="lineChart" height="70"/>
            </div>
        );
    }
}

export default FmsLineChartCanvas;
