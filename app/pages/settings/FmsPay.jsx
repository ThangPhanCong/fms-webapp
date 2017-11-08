import React from 'react';
import { Grid, Row, Col, Checkbox } from 'react-bootstrap';

class FmsPay extends React.Component {
  render() {
    let self = this;

    return (
        <div className="fms-block">
          <Row className="fms-block-header">
            <Col>
              FmsPay
            </Col>
          </Row>
        </div>
    );
  }
}

module.exports = FmsPay;
