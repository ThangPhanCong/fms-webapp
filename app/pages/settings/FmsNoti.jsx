import React from 'react';
import {Row, Col, Checkbox} from 'react-bootstrap';

class FmsNoti extends React.Component {
  render() {
    return (
      <div className="fms-block">
        <Row className="setting-header">
          <Col>
            Cài đặt thông báo
          </Col>
        </Row>
        <Row className="noti">
          <Col className="col">
            <Checkbox className='tag-item-wrapper'><span>Âm thanh thông báo</span></Checkbox>
          </Col>
          <Col className="col">
            <Checkbox className='tag-item-wrapper'><span>Hiện thị cuộc hội thoại chưa đọc lên trên đầu</span></Checkbox>
          </Col>
          <Col className="col">
            <Checkbox
              className='tag-item-wrapper'><span>Tự động thích bình luận khi đang trả lời bình luận</span></Checkbox>
          </Col>
          <Col className="col">
            <Checkbox className='tag-item-wrapper'><span>Tự động tạo đơn đặt hàng</span></Checkbox>
          </Col>
          <Col className="col">
            <Checkbox className='tag-item-wrapper'><span>Tự động ẩn bình luận</span></Checkbox>
          </Col>
        </Row>
      </div>
    );
  }
}

module.exports = FmsNoti;
