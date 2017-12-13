import React from 'react';
import {Row, Col} from 'react-bootstrap';

class FmsCustomer extends React.Component {
  render() {
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
