import React from 'react';
import {Row, Col} from 'react-bootstrap';

class FmsAnswer extends React.Component {
  render() {
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
