import React from 'react';
import propTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

class FmsConfirm extends React.Component {

  render() {
    const { isShown, onClose, content } = this.props;

    return (
      <Modal
        show={isShown}
        backdrop='static' keyboard={false}
        className="confirm-modal"
        onHide={() => { onClose(false) }}

        >
        <Modal.Body>
          {content}
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
};

export default FmsConfirm;
