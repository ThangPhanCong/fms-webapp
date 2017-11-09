import React from 'react';
import { Grid, Row, Col, Checkbox } from 'react-bootstrap';

class FmsPay extends React.Component {
  render() {
    let self = this;

    return (
        <div className="fms-block">
          <Row className="setting-header">
            <Col>
              Thông tin thanh toán
            </Col>
          </Row>
        </div>
    );
  }
}

module.exports = FmsPay;
