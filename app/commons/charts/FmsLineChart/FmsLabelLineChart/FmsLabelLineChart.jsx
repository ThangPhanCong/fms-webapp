import React from "react"
import {Col, Row} from "react-bootstrap";

class FmsLabelLineChart extends React.Component {
  render() {
    return(
      <Row className="row">
        <Col sm ={4}>
        <small className="stats-label">Pages / Visit</small>
        <h4>236 321.80</h4>
        </Col>

        <Col sm={4}>
          <small className="stats-label">% New Visits</small>
          <h4>46.11%</h4>
        </Col>
        <Col sm={4}>
          <small className="stats-label">Last week</small>
        <h4>432.021</h4>
        </Col>
      </Row>
    )
  }
}

export default FmsLabelLineChart;