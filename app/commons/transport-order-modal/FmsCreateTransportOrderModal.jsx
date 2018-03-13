import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';
import ViettelPostPanel from './panels/viettel-post/ViettelPostPanel';
import OtherProviderPanel from './panels/other-provider/OtherProviderPanel';
import {createTransportOrder} from '../../api/TransportProviderApi';
import {createViettelTransportOrder} from '../../api/ViettelPostApi';
import * as ghtkApi from '../../api/GiaoHangTietKiemApi';
import {toReadableDatetime} from 'utils/datetime-utils.js';
import GiaoHangTietKiemPanel from "./panels/giao-hang-tiet-kiem/GiaoHangTietKiemPanel";

class FmsCreateTransportOrderModal extends Component {

    state = {
        transportOrder: {},
        transportingProvider: '',
        isLoading: false
    };

    onCreateTransportOrder() {
        const {transportingProvider} = this.state;

        switch (transportingProvider) {
            case 'VIETTEL':
                this.createViettelPostTransportOrder();
                break;
            case 'GHTK':
                this.createGhtkTransportOrder();
                break;
            default:
                this.createOtherTransportOrder();
                break;
        }
    }

    createViettelPostTransportOrder() {
        const order_id = this.props.order._id;
        const {transportOrder} = this.state;

        this.setState({isLoading: true});

        createViettelTransportOrder(transportOrder, order_id)
            .then(res => {
                let shouldUpdate = true;
                this.closeModal(shouldUpdate);
            })
            .catch(err => alert(err))
            .then(() => this.setState({isLoading: false}));
    }

    createGhtkTransportOrder() {
        const order_id = this.props.order._id;
        const {transportOrder} = this.state;

        this.setState({isLoading: true});

        ghtkApi.createTransportOrder(transportOrder, order_id)
            .then(res => {
                let shouldUpdate = true;
                this.closeModal(shouldUpdate);
            })
            .catch(err => alert(err))
            .then(() => this.setState({isLoading: false}));
    }

    createOtherTransportOrder() {
        const {order} = this.props;
        const order_id = order._id;
        const {transportOrder, transportingProvider} = this.state;

        this.setState({isLoading: true});

        if (!transportOrder.tracking_id) transportOrder.tracking_id = order.id;

        createTransportOrder(transportOrder, order_id, transportingProvider)
            .then(res => {
                let shouldUpdate = true;
                this.closeModal(shouldUpdate);
            })
            .catch(err => alert(err))
            .then(() => this.setState({isLoading: false}));
    }

    onCloseButtonClick() {
        this.closeModal();
    }

    closeModal(shouldUpdate) {
        this.props.onClose(shouldUpdate);
    }

    onChangeInput(refName, newValue = this.refs[refName].value) {
        const newState = {...this.state};
        newState[refName] = newValue;

        this.setState(newState);
    }

    onChangeTransportOrderInfo(TOrderInfo) {
        this.setState({transportOrder: TOrderInfo});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isShown) {
            this.setState({transportingProvider: '', transportOrder: {}, isLoading: false});
        }
    }

    render() {
        const {
            isShown,
            order,
            providers
        } = this.props;

        const {
            isLoading,
            transportingProvider
        } = this.state;

        let panel = null;
        switch (transportingProvider) {
            case 'VIETTEL':
                panel = (
                    <ViettelPostPanel
                        onChangeTransportOrderInfo={this.onChangeTransportOrderInfo.bind(this)}
                        order={order}
                        disabled={isLoading}
                    />
                );
                break;
            case 'GHTK':
                panel = (
                    <GiaoHangTietKiemPanel
                        onChangeTransportOrderInfo={this.onChangeTransportOrderInfo.bind(this)}
                        order={order}
                        disabled={isLoading}
                    />
                );
                break;
            case '':
                break;
            default:
                panel = (
                    <OtherProviderPanel
                        onChangeTransportOrderInfo={this.onChangeTransportOrderInfo.bind(this)}
                        order={order}
                        disabled={isLoading}
                    />
                );
                break;
        }


        return (
            <Modal show={isShown} backdrop='static' keyboard={false} bsSize='large'>
                <div className='inmodal'>
                    <Modal.Header
                        closeButton={true}
                        onHide={this.onCloseButtonClick.bind(this)}
                    >
                        <h4 className='modal-title'>Tạo vận đơn</h4>

                    </Modal.Header>

                    <Modal.Body>
                        <div className="form-group row">
                            <div className="col-sm-3">
                                <label className='control-label'>Mã đơn hàng</label>
                            </div>
                            <div className="col-sm-9">
                                <input className='form-control' type="text" disabled={true}
                                       value={order ? order.id : ''}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-3">
                                <label className="control-label">Đơn vị vận chuyển</label>
                            </div>
                            <div className="col-sm-9">
                                <select
                                    className="form-control"
                                    ref='transportingProvider'
                                    disabled={isLoading}
                                    value={transportingProvider}
                                    onChange={() => this.onChangeInput('transportingProvider')}
                                >
                                    <option value=""/>
                                    {
                                        Array.isArray(providers) && providers.map(p => (
                                            <option key={p._id}
                                                    value={p.provider_name}
                                            >{p.provider_display_name}</option>
                                        ))
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
                            disabled={isLoading}>Tạo mới
                        </button>
                    </Modal.Footer>
                </div>
            </Modal>
        );
    }
}

FmsCreateTransportOrderModal.propTypes = {
    isShown: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired,

    order: propTypes.object,
    providers: propTypes.array
};

export default FmsCreateTransportOrderModal;
