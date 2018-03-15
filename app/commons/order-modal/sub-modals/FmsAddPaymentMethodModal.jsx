import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';

class FmsAddPaymentMethodModal extends Component {
    state = {
        paymentMethod: null
    }

    onClose() {
        this.setState({paymentMethod: null})
        this.props.onClose();
    }

    onAddPaymentMethod() {
        const {paymentMethod} = this.state;
        this.props.onAddPaymentMethod(paymentMethod);
    }
    
    render() {
        const {isShown} = this.props;

        return (
            <div>
                <Modal 
                    show={isShown}
                    bsClass='sub-modal-1'
                    backdrop='static' 
                    keyboard={false}
                >
                    <div className="inmodal order-detail-modal">
                        <Modal.Header 
                            closeButton
                            onHide={this.onClose.bind(this)}
                        >
                            <Modal.Title>Thêm phương thức thanh toán</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <label className="control-label">Tên phương thức</label>
                                    </div>
                                    <div className="col-sm-8">
                                        <input type="text"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <label className="control-label">Hướng dẫn thanh toán</label>
                                    </div>
                                    <div className="col-sm-8">
                                        <textarea
                                            className="form-control"
                                            rows='3'
                                        >
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <button
                                className='btn btn-white'
                                onClick={this.onClose.bind(this)}
                            >
                                Hủy
                            </button>

                            <button
                                className='btn btn-primary'
                                onClick={this.onAddPaymentMethod.bind(this)}
                            >
                                Thêm mới
                            </button>
                        </Modal.Footer>
                    </div>
                </Modal>
            </div>
        );
    }
}

FmsAddPaymentMethodModal.propTypes = {
    isShown: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired,
    onAddPaymentMethod: propTypes.func
};

export default FmsAddPaymentMethodModal;
