import React from 'react';
import { Grid, Row, Col, Checkbox } from 'react-bootstrap';
import uuid from 'uuid';
import {connect} from 'react-redux';

class FmsPage extends React.Component {
  render() {
    return (
        <div className="fms-block">
          <Row className="fms-block-header">
            <Col>
              Danh sách trang của dự án
            </Col>
          </Row>
        </div>
    );
  }
}
const mapStateToProps = state => {
  return {}
}
export default connect(mapStateToProps)(FmsPage);
