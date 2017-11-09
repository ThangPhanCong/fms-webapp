import React from 'react';
import { Grid, Row, Col, Checkbox } from 'react-bootstrap';

class FmsNoti extends React.Component {
  render() {
    let self = this;

    return (
        <div className="fms-block">
          <Row className="setting-header">
            <Col>
              Cài đặt thông báo
            </Col>
          </Row>
          <Row>
            <Col>
              <Checkbox className='tag-item-wrapper'>Âm thanh thông báo</Checkbox>
            </Col>
            <Col>
              <Checkbox className='tag-item-wrapper'>Hiện thị cuộc hội thoại chưa đọc lên trên đầu</Checkbox>
            </Col>
            <Col>
              <Checkbox className='tag-item-wrapper'>Tự động thích bình luận khi đang trả lời bình luận</Checkbox>
            </Col>
            <Col>
              <Checkbox className='tag-item-wrapper'>Tự động tạo đơn đặt hàng</Checkbox>
            </Col>
            <Col>
              <Checkbox className='tag-item-wrapper'>Tự động ẩn bình luận</Checkbox>
            </Col>
          </Row>
        </div>
    );
  }
}

module.exports = FmsNoti;
