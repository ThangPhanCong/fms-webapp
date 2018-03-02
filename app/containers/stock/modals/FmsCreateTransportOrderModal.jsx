import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';
import {providers} from '../../../constants/transporting-provider';
import ViettelPostPanel from './panels/ViettelPostPanel';
import GiaoHangTietKiemPanel from './panels/GiaoHangTietKiemPanel';

import {getViettelInventories} from '../../../api/ViettelPostApi';

class FmsCreateTransportOrderModal extends Component {

    state = {
        transportOrder: {},
        isLoading: false,
        transportingProvider: ''
    };

    onCreateTransportOrder() {
        
    }

    onCloseButtonClick() {
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

    async onChangeTransportingProvider(e) {
        this.setState({transportingProvider: e.target.value});

        if (e.target.value === 'viettel-post') {
            const {order} = this.props;
            let transportOrder = this.state.transportOrder;

            transportOrder.RECEIVER_FULLNAME = order.customer_name || '';
            transportOrder.RECEIVER_PHONE = order.customer_phone || '';
            transportOrder.RECEIVER_ADDRESS = order.full_address || '';
            transportOrder.RECEIVER_EMAIL = order.customer_email || '';

            await getViettelInventories()
            .then(res => {
                transportOrder.CUS_ID = res[0].CUS_ID;
                transportOrder.GROUPADDRESS_ID = res[0].GROUPADDRESS_ID;
            })
            
            this.setState({transportOrder});
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isShown) {
            this.setState({transportOrder: {}, isLoading: false});
        }
    }

    render() {
        const {
            isShown,
            order
        } = this.props;

        const {
            isLoading,
            transportOrder,
            transportingProvider
        } = this.state;

        let panel = null;
        switch(transportingProvider) {
            case 'viettel-post':
                panel = <ViettelPostPanel onChangeInput={this.onChangeInput.bind(this)} 
                                            transportOrder={transportOrder} order={order} />;
                break;
            case 'giao-hang-tiet-kiem':
                panel = <GiaoHangTietKiemPanel onChangeInput={this.onChangeInput.bind(this)}
                                                transportOrder={transportOrder} order={order} />;
                break;
            default:
                break;
        }
        return (
            <Modal show={isShown} backdrop='static' keyboard={false}bsSize='large'>
                <div className='inmodal'>
                    <Modal.Header
                        closeButton={true}
                        onHide={this.onCloseButtonClick.bind(this)}
                    >
                        <h4 className='modal-title'>Tạo vận đơn {order ? order.id : ''}</h4>

                    </Modal.Header>

                    <Modal.Body>
                        <div className="form-group row">
                            <div className="col-sm-3">
                                <label className="control-label">Đơn vị vận chuyển</label>
                            </div>
                            <div className="col-sm-9">
                                <select
                                       className="form-control"
                                       disabled={isLoading}
                                       value={transportingProvider}
                                       onChange={this.onChangeTransportingProvider.bind(this)}
                                >
                                    <option value=""></option>
                                    {
                                        providers.map(p => {
                                            if (p.status === 'active')
                                            return <option value={p.name_slug} key={p.id} >{p.name}</option>;
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        {panel}
                    </Modal.Body>

                    <Modal.Footer>
                        <button
                            className='btn btn-white'
                            onClick={this.onCloseButtonClick.bind(this)}
                            disabled={isLoading}>Hủy
                        </button>

                        <button
                            className='btn btn-primary'
                            onClick={this.onCreateTransportOrder.bind(this)}
                            disabled={isLoading}>Thêm mới
                        </button>
                    </Modal.Footer>
                </div>
            </Modal>
        );
    }
}

FmsCreateTransportOrderModal.propTypes = {
    isShown: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired
};

export default FmsCreateTransportOrderModal;
