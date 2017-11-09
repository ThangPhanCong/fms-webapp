import React from 'react';
import { Grid, Row, Col, Checkbox } from 'react-bootstrap';

class FmsCustomer extends React.Component {
  render() {
    let self = this;

    return (
        <div className="fms-block">
          <Row className="setting-header">
            <Col>
              Danh sách khách hàng
            </Col>
          </Row>
        </div>
    );
  }
}

module.exports = FmsCustomer;
