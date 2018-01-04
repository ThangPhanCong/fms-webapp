import React from "react"
import {Col, Row, Table} from "react-bootstrap";

class FmsTitleLineChart extends React.Component {
  render() {
    return(
      <span>
        <h1 className="m-b-xs">
          {this.props.countSales}
        </h1>
        <small>
          {this.props.title}
        </small>
      </span>
    )
  }
}

export default FmsTitleLineChart;