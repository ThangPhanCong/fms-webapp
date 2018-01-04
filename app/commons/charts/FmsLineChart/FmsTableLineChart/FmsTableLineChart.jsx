import React from "react"
import {Col, Row, Table} from "react-bootstrap";

class FmsTableLineChart extends React.Component {
  render() {
    return(
      <Row className="m-t-xs">
        <Col xs={6}>
          <h5 className="m-b-xs">Income last month</h5>
          <h1 className="no-margins">160,000</h1>
          <div className="font-bold text-navy">98% <i className="fa fa-bolt"></i></div>
        </Col>
        <Col xs={6}>
          <h5 className="m-b-xs">Sals current year</h5>
          <h1 className="no-margins">42,120</h1>
          <div className="font-bold text-navy">98% <i className="fa fa-bolt"></i></div>
        </Col>

      </Row>
    )
  }
}

export default FmsTableLineChart;


