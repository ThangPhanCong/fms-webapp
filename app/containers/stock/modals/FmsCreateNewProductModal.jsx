import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';

class FmsCreateNewProductModal extends Component {

    onCloseButtonClick() {
        this.props.onClose();
    }

    render() {
        const {
            isShown
        } = this.props;

        return (
            <Modal show={isShown} bsSize="large" backdrop='static' keyboard={false}>
                <div className='order-detail-modal inmodal'>
                    <Modal.Header
                        closeButton={true}
                        onHide={this.onCloseButtonClick.bind(this)}
                    >
                        <h4>Thêm sản phẩm</h4>

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

FmsCreateNewProductModal.propTypes = {
    isShown: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired
};

export default FmsCreateNewProductModal;
