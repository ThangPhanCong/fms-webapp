import React from 'react';
import '../../../assets/js/flotchart/jquery.flot.js';
import '../../../assets/js/flotchart/excanvas.min.js';
import '../../../assets/js/flotchart/jquery.flot.spline.js';
import '../../../assets/js/inspinia.js';
import '../../../assets/js/jquery-2.1.1.js';
import 'jquery-flot/jquery.flot.pie.js';
import 'jquery-flot/jquery.flot.symbol.js';
import 'jquery-flot/jquery.flot.time.js';

class FmsFlotChart extends React.Component {
    componentDidMount() {
      let {data1, data2} = this.props
      $(".flot-dashboard5-chart").length && $.plot($(".flot-dashboard5-chart"), [
          data1,  data2
        ],
        {
          series: {
            lines: {
              show: false,
              fill: true
            },
            splines: {
              show: true,
              tension: 0.4,
              lineWidth: 1,
              fill: 0.4
            },
            points: {
              radius: 0,
              show: true
            },
            shadowSize: 2
          },
          grid: {
            hoverable: true,
            clickable: true,

            borderWidth: 2,
            color: 'transparent'
          },
          colors: ["#1ab394", "#1C84C6"],
          xaxis:{
          },
          yaxis: {
          },
          tooltip: false
        }
      );
    }

    render() {
        return (
          <div className="flot-chart m-b-xl">
            <div className="flot-chart-content flot-dashboard5-chart"></div>
          </div>
        )
    }
}
export default FmsFlotChart;
