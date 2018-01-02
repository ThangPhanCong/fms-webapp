import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';

class FmsOrderDetailModal extends Component {

    onCloseButtonClick() {
        this.props.onClose();
    }

    render() {
        const {
            isShown,
            order
        } = this.props;

        return (
            <Modal show={isShown} bsSize="large" backdrop='static' keyboard={false}>
                <div className='order-detail-modal'>
                    <Modal.Header
                        closeButton={true}
                        onHide={() => {
                            this.props.onClose();
                        }}
                    >
                        <h4>Đơn hàng #{order.id}</h4>

                    </Modal.Header>

                    <Modal.Body>
                        <p>ok men</p>

                    </Modal.Body>

                    <Modal.Footer>
                        <button>ok men</button>
                    </Modal.Footer>
                </div>
            </Modal>
        );
    }
}

FmsOrderDetailModal.propTypes = {
    isShown: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired,
    isLoading: propTypes.bool.isRequired
};

export default FmsOrderDetailModal;
