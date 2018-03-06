import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';
import {getTransportOrderInfo} from '../../../api/TransportProviderApi';
import {toReadableDatetime} from 'utils/datetime-utils.js';

class FmsTransportOrderDetailModal extends Component {
    state = {
        transportOrder: {},
        isLoading: false
    };

    onUpdateTransportOrder() {
        
    }

    onCloseButtonClick() {
        this.setState({transportOrder: {}});
        this.closeModal();
    }

    closeModal(shouldUpdate) {
        this.props.onClose(shouldUpdate);
    }

    onChangeInput(refName, newValue) {
        const newTransportOrder = {...this.state.transportOrder};
        newTransportOrder[refName] = newValue;

        this.setState({transportOrder: newTransportOrder});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isShown) {
            getTransportOrderInfo(nextProps.order_id)
                .then(res => console.log(res));
        }
    }

    render() {
        const {isShown} = this.props;
        const {transportOrder, isLoading} = this.state;

        return (
            <Modal show={isShown} backdrop='static' keyboard={false} bsSize='large'>
                <div className='inmodal'>
                    <Modal.Header
                        closeButton={true}
                        onHide={this.onCloseButtonClick.bind(this)}
                    >
                        <h4 className='modal-title'>Thông tin vận đơn đơn hàng</h4>
                    </Modal.Header>

                    <Modal.Body>

                    </Modal.Body>

                    <Modal.Footer>
                        <button
                            className='btn btn-white'
                            onClick={this.onCloseButtonClick.bind(this)}
                            disabled={isLoading}>Hủy
                        </button>

                        <button
                            className='btn btn-primary'
                            onClick={this.onUpdateTransportOrder.bind(this)}
                            disabled={isLoading}>Cập nhật
                        </button>
                    </Modal.Footer>
                </div>
            </Modal>
        );
    }
}

FmsTransportOrderDetailModal.propTypes = {
    isShown: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired,
    order_id: propTypes.string
};

export default FmsTransportOrderDetailModal;
