import React from 'react';
import propTypes from 'prop-types';
import { Grid, Row, Col, Checkbox, Button, Modal } from 'react-bootstrap';
import uuid from 'uuid';
import {withRouter, Redirect} from 'react-router-dom';

class FmsConfirm extends React.Component {

  render() {
    const { isShown, onClose } = this.props;

    return (
      <Modal
        show={isShown}
        backdrop='static' keyboard={false}
        className="confirm-modal"
        onHide={() => { onClose(false) }}

        >
        <Modal.Body>
          Bạn có chắc chắn xóa dự án không?
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => { onClose(false) }}>Hủy</Button>
          <Button bsStyle="primary" onClick={() => { onClose(true) }}>Xóa</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

FmsConfirm.propTypes = {
  isShown: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired
}

export default FmsConfirm;
