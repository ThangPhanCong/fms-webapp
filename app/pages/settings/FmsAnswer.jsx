import React from 'react';
import { Grid, Row, Col, Checkbox } from 'react-bootstrap';

class FmsAnswer extends React.Component {
  render() {
    let self = this;

    return (
        <div className="fms-block">
          <Row className="setting-header">
            <Col>
              Mẫu câu trả lời khách hàng
            </Col>
          </Row>
        </div>
    );
  }
}

module.exports = FmsAnswer;
