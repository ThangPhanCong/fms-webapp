import React from 'react';
import { Grid, Row, Col, Checkbox } from 'react-bootstrap';

class FmsPost extends React.Component {
  render() {
    let self = this;

    return (
        <div className="fms-block">
          <Row className="fms-block-header">
            <Col>
              Danh sách bài đăng
            </Col>
          </Row>
        </div>
    );
  }
}

module.exports = FmsPost;
