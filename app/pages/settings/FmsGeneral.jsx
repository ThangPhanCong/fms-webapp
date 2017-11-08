import React from 'react';
import { Grid, Row, Col, Checkbox } from 'react-bootstrap';

class FmsGeneral extends React.Component {
  render() {
    let self = this;

    return (
        <div className="fms-block">
          <Row className="fms-block-header">
            <Col>
              Thông tin chung
            </Col>
          </Row>
        </div>
    );
  }
}

module.exports = FmsGeneral;
