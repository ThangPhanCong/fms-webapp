import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';

class FmsCreateTransportOrderModal extends Component {

    state = {
        transportOrder: {},
        isLoading: false,
    };

    onChangeInput(refName, newValue = this.refs[refName].value) {
        const newTOrder = {...this.state.transportOrder};

        switch (refName) {
            default:
                newTOrder[refName] = newValue;
        }

        this.setState({transportOrder: newTOrder});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.order) {
            this.setState({transportOrder: {}, isLoading: false});
        }
    }

    renderModalBody() {
        const {transportOrder} = this.state;

        return (
            <Modal.Body>
                <div className='row'>
                    <p>create transport order</p>

                </div>

            </Modal.Body>
        )
    }

    renderModalHeader() {
        const {order} = this.state;

        return (
            <Modal.Header
                closeButton={true}
                onHide={() => {
                    this.props.onClose();
                }}
            >
                <h4>Tạo vận đơn cho đơn hàng #{order.id}</h4>
            </Modal.Header>
        )
    }

    renderModalFooter() {
        const {
            isLoading,
            transportOrder
        } = this.state;

        return (
            <Modal.Footer>

                <button className="btn btn-white"
                        onClick={this.onCloseButtonClick.bind(this)}
                        disabled={isLoading}>Hủy
                </button>
                <button className="btn btn-primary"
                        onClick={}
                        disabled={isLoading}>Tạo vận đơn
                </button>
            </Modal.Footer>
        )
    }

    render() {
        const {isShown} = this.props;

        return (
            <Modal show={isShown} bsSize="large" backdrop='static' keyboard={false}>
                <div className='create-transport-order-modal inmodal'>
                    {
                        this.renderModalHeader()
                    }

                    {
                        this.renderModalBody()
                    }

                    {
                        this.renderModalFooter()
                    }
                </div>
            </Modal>
        );
    }
}

FmsCreateTransportOrderModal.propTypes = {
    isShown: propTypes.bool.isRequired,
    typeModal: propTypes.number.isRequired,
    onClose: propTypes.func.isRequired,
    project: propTypes.object,
    order: propTypes.object
};

export default FmsCreateTransportOrderModal;
