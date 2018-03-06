import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';
import {getTransportOrderInfo} from '../../../api/TransportProviderApi';
import ViettelTransportInfoPanel from './panels/viettel-post/ViettelTransportInfoPanel';
import ViettelProductInfoPanel from './panels/viettel-post/ViettelProductInfoPanel';
import {toReadableDatetime} from 'utils/datetime-utils.js';
import {getViettelServices, getViettelExtraServices} from '../../../api/ViettelPostApi';

class FmsTransportOrderDetailModal extends Component {
    state = {
        transportOrder: null,
        isLoading: false,
        transportProvider: '',
        services: [],
        extraServices: []
    };

    onUpdateTransportOrder() {
        
    }

    onCloseButtonClick() {
        this.setState({transportOrder: null});
        this.closeModal();
    }

    closeModal(shouldUpdate) {
        this.props.onClose(shouldUpdate);
    }

    componentDidMount() {
        getViettelServices()
            .then(services => this.setState({services}));
        
        getViettelExtraServices()
            .then(extraServices => this.setState({extraServices}));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isShown) {
            getTransportOrderInfo(nextProps.order_id)
                .then(res => {
                    this.setState({transportOrder: res});
                    if (nextProps.providers) {
                        const findProvider = nextProps.providers.find(p => p._id === res.transport_provider);
                        this.setState({transportProvider: findProvider.provider_display_name});
                    }
                });
        }
    }

    render() {
        const {isShown, providers} = this.props;
        const {
            transportOrder, 
            isLoading, 
            transportProvider,
            services,
            extraServices
        } = this.state;

        const disabled = true;
        let created_time = '';
        let transportProviderInfo = null;
        if (transportOrder) {
            created_time = toReadableDatetime(transportOrder.created_time);
            transportProviderInfo = transportOrder.transport_provider_info;
        }

        return (
            <Modal show={isShown} backdrop='static' keyboard={false} bsSize='large'>
                <div className='inmodal'>
                    <Modal.Header
                        closeButton={true}
                        onHide={this.onCloseButtonClick.bind(this)}
                    >
                        <h4 className='modal-title'>Thông tin vận đơn đơn hàng {transportProvider}</h4>
                        <small className="font-bold">Ngày tạo:
                            <strong> {created_time.date + ' ' + created_time.time}</strong>
                        </small>
                    </Modal.Header>

                    <Modal.Body>
                        {
                            transportProviderInfo ? (
                                <div className='row'>
                                    <ViettelTransportInfoPanel 
                                        RECEIVER_FULLNAME={transportProviderInfo.RECEIVER_FULLNAME}
                                        RECEIVER_PHONE={transportProviderInfo.RECEIVER_PHONE}
                                        RECEIVER_EMAIL={transportProviderInfo.RECEIVER_EMAIL}
                                        RECEIVER_PROVINCE={transportProviderInfo.RECEIVER_PROVINCE}
                                        RECEIVER_DISTRICT={transportProviderInfo.RECEIVER_DISTRICT}
                                        RECEIVER_WARD={transportProviderInfo.RECEIVER_WARD}
                                        RECEIVER_ADDRESS={transportProviderInfo.RECEIVER_ADDRESS}
                                        DELIVERY_DATE={transportProviderInfo.DELIVERY_DATE}
                                        disabled={disabled}
                                    />

                                    <ViettelProductInfoPanel 
                                        PRODUCT_NAME={transportProviderInfo.PRODUCT_NAME}
                                        PRODUCT_DESCRIPTION={transportProviderInfo.PRODUCT_DESCRIPTION}
                                        PRODUCT_QUANTITY={transportProviderInfo.PRODUCT_QUANTITY}
                                        PRODUCT_PRICE={transportProviderInfo.PRODUCT_PRICE}
                                        PRODUCT_WEIGHT={transportProviderInfo.PRODUCT_WEIGHT}
                                        PRODUCT_LENGTH={transportProviderInfo.PRODUCT_LENGTH}
                                        PRODUCT_WIDTH={transportProviderInfo.PRODUCT_WIDTH}
                                        PRODUCT_HEIGHT={transportProviderInfo.PRODUCT_HEIGHT}
                                        disabled={disabled}
                                    />

                                    <div className="form-group row">
                                        <div className="col-md-6">
                                            <div className="col-sm-4">
                                                <label className="control-label">Loại vận đơn</label>
                                            </div>
                                            <div className="col-sm-8">
                                                <select className="form-control"
                                                        disabled={disabled}
                                                        ref='ORDER_PAYMENT'
                                                        value={transportProviderInfo.ORDER_PAYMENT || ''}
                                                >
                                                    <option value=""></option>
                                                    <option value="1">Không thu tiền</option>
                                                    <option value="2">Thu hộ tiền cước và tiền hàng</option>
                                                    <option value="3">Thu hộ tiền hàng</option>
                                                    <option value="4">Thu hộ tiền cước</option>
                                                </select>
                                            </div>
                                        </div>   
                                        <div className="col-md-6">
                                            <div className="col-sm-4">
                                                <label className="control-label">Dịch vụ</label>
                                            </div>
                                            <div className="col-sm-8">
                                                <select className="form-control"
                                                        disabled={disabled}
                                                        ref='ORDER_SERVICE'
                                                        value={transportProviderInfo.ORDER_SERVICE || ''}
                                                >
                                                    <option value=""></option>
                                                    {
                                                        services.length > 0 && services.map(s => {
                                                            return <option value={s.SERVICE_CODE} key={s.SERVICE_CODE}>{s.SERVICE_NAME}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group row"> 
                                        <div className="col-md-6">
                                            <div className="col-sm-4">
                                                <label className="control-label">Dịch vụ cộng thêm</label>
                                            </div>
                                            <div className="col-sm-8">
                                                <select className="form-control"
                                                        disabled={disabled}
                                                        ref='ORDER_SERVICE_ADD'
                                                        value={transportProviderInfo.ORDER_SERVICE_ADD || ''}
                                                >
                                                    <option value=""></option>
                                                    {
                                                        extraServices.length > 0 && extraServices.map(s => {
                                                            return <option value={s.SERVICE_CODE} key={s.SERVICE_CODE}>{s.SERVICE_NAME}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="col-sm-4">
                                                <label className="control-label">Ghi chú</label>
                                            </div>
                                            <div className="col-sm-8">
                                                <input type='text'
                                                        className="form-control"
                                                        disabled={disabled}
                                                        ref='ORDER_NOTE'
                                                        value={transportProviderInfo.ORDER_NOTE || ''}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-md-6">
                                            <div className="col-sm-4">
                                                <label className="control-label">Phí vận chuyển</label>
                                            </div>
                                            <div className="col-sm-8">
                                                <input type='number'
                                                        className="form-control"
                                                        disabled={disabled}
                                                        ref='MONEY_TRANSPORT'
                                                        value={transportProviderInfo.MONEY_TRANSPORT || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="col-sm-4">
                                                <label className="control-label">Tiền thu hộ</label>
                                            </div>
                                            <div className="col-sm-8">
                                                <input type='number'
                                                        className="form-control"
                                                        disabled={disabled}
                                                        ref='MONEY_COLLECTION'
                                                        value={transportProviderInfo.MONEY_COLLECTION || ''}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }
                        

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
    order_id: propTypes.string,
    providers: propTypes.array
};

export default FmsTransportOrderDetailModal;
