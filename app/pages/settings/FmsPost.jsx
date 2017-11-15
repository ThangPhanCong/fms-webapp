import React from 'react';
import { Grid, Row, Col, Checkbox } from 'react-bootstrap';

class FmsPost extends React.Component {
  render() {
    let self = this;

    return (
        <div className="fms-block">
          <Row className="setting-header">
            <Col>
              Danh sách bài đăng
            </Col>
          </Row>
          <Row className="noti">
            <Col className="col">
              <Checkbox className='tag-item-wrapper'><span>Tự động ẩn bình luận</span></Checkbox>
            </Col>
          </Row>
        </div>
    );
  }
}

module.exports = FmsPost;
