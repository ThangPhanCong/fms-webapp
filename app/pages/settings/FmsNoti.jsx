import React from 'react';
import { Grid, Row, Col, Checkbox } from 'react-bootstrap';

class FmsNoti extends React.Component {
  render() {
    let self = this;

    return (
        <div className="fms-block">
          <Row className="fms-block-header">
            <Col>
              General settings
            </Col>
          </Row>
          <Row>
            <Col>
              <Checkbox className='tag-item-wrapper'>Notification sound</Checkbox>
            </Col>
            <Col>
              <Checkbox className='tag-item-wrapper'>Show unread conversation on top</Checkbox>
            </Col>
            <Col>
              <Checkbox className='tag-item-wrapper'>Auto like comment when replying</Checkbox>
            </Col>
            <Col>
              <Checkbox className='tag-item-wrapper'>Auto create new order</Checkbox>
            </Col>
            <Col>
              <Checkbox className='tag-item-wrapper'>Auto hide comment</Checkbox>
            </Col>
          </Row>
        </div>
    );
  }
}

module.exports = FmsNoti;
