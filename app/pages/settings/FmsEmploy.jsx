import React from 'react';
import {Row, Col} from 'react-bootstrap';

class FmsEmploy extends React.Component {
  render() {
    return (
      <div className="fms-block">
        <Row className="setting-header">
          <Col>
            Danh sách nhân viên
          </Col>
        </Row>
      </div>
    );
  }
}

module.exports = FmsEmploy;
