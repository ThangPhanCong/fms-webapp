import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';

class FmsConfirmSaveOrderModal extends Component {

    state = {
        statusSaveOrder: null
    };

    setSatusSaveOrder(e) {
        this.setState({statusSaveOrder: e.target.value});
    }
    
    componentDidMount() {
        this.setState({statusSaveOrder: 'success'});
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
                            onHide={() => this.props.onClose()}
                        >
                            <Modal.Title>Lưu trữ đơn hàng</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <h4>Trạng thái đơn hàng</h4>
                            <label className="radio-inline" onClick={this.setSatusSaveOrder.bind(this)}>
                                <input type="radio" name="status" value="success" defaultChecked/>Thành công
                            </label>
                            <label className="radio-inline" onClick={this.setSatusSaveOrder.bind(this)}>
                                <input type="radio" name="status" value="failure"/>Thất bại
                            </label>
                        </Modal.Body>

                        <Modal.Footer>
                            <button
                                className='btn btn-white'
                                onClick={() => this.props.onClose()}
                            >
                                Hủy
                            </button>

                            <button
                                className='btn btn-primary'
                                onClick={() => this.props.onSaveOrder(this.state.statusSaveOrder)}
                            >
                                Lưu trữ
                            </button>
                        </Modal.Footer>
                    </div>
                </Modal>
            </div>
        );
    }
}

FmsConfirmSaveOrderModal.propTypes = {
    isShown: propTypes.bool.isRequired,
    onClose: propTypes.func,
    onSaveOrder: propTypes.func
};

export default FmsConfirmSaveOrderModal;
