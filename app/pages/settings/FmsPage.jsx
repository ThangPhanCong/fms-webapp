import React from 'react';
import { Grid, Row, Col, Checkbox } from 'react-bootstrap';

class FmsPage extends React.Component {
  render() {
    let self = this;

    return (
        <div className="fms-block">
          <Row className="fms-block-header">
            <Col>
              FmsPage
            </Col>
          </Row>
        </div>
    );
  }
}

module.exports = FmsPage;
