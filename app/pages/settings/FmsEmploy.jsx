import React from 'react';
import { Grid, Row, Col, Checkbox } from 'react-bootstrap';

class FmsEmploy extends React.Component {
  render() {
    let self = this;

    return (
        <div className="fms-block">
          <Row className="fms-block-header">
            <Col>
              FmsEmploy
            </Col>
          </Row>
        </div>
    );
  }
}

module.exports = FmsEmploy;
