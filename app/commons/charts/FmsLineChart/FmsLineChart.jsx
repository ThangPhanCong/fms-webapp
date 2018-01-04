import React from 'react';
import $ from 'jquery'
import '../../../assets/js/linechart/jquery.sparkline';

class FmsLineChart extends React.Component {
  componentDidUpdate() {
    let {data, uuid} =this.props
      var sparklineCharts = function(){
          $(`.${uuid}`).sparkline(data, {
              type: 'line',
              width: '100%',
              height: '50',
              lineColor: '#1ab394',
              fillColor: "transparent"
          });
      }
      var sparkResize;
      $(window).resize(function(e) {
          clearTimeout(sparkResize);
          sparkResize = setTimeout(sparklineCharts, 500);
      });
      sparklineCharts();
  }
  render(){
    return(
      <div className={this.props.uuid}></div>
    );
  }
}
export default FmsLineChart;
