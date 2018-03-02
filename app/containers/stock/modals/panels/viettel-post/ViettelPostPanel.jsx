import React, { Component } from 'react';
import propTypes from 'prop-types';
import ViettelTransportInfoPanel from './ViettelTransportInfoPanel';
import ViettelProductInfoPanel from './ViettelProductInfoPanel';
import {getViettelServices, getViettelExtraServices} from '../../../../../api/ViettelPostApi';

class ViettelPostPanel extends Component {
    state = {
        services: [],
        extraServices: []
    }

    onChangeInput(refName, newValue = this.refs[refName].value) {
        const {
            onChangeInput
        } = this.props;

        onChangeInput(refName, newValue);
    }

    componentDidMount() {
        getViettelServices()
            .then(services => this.setState({services}));
        
        getViettelExtraServices()
            .then(extraServices => this.setState({extraServices}));
    }

    render() {
        const {
            disabled,
            transportOrder
        } = this.props;
        const {
            services,
            extraServices
        } = this.state;
        
        return (
            <div className='row'>
                <ViettelTransportInfoPanel 
                    RECEIVER_FULLNAME={transportOrder.RECEIVER_FULLNAME}
                    RECEIVER_PHONE={transportOrder.RECEIVER_PHONE}
                    RECEIVER_EMAIL={transportOrder.RECEIVER_EMAIL}
                    RECEIVER_PROVINCE={transportOrder.RECEIVER_PROVINCE}
                    RECEIVER_DISTRICT={transportOrder.RECEIVER_DISTRICT}
                    RECEIVER_WARD={transportOrder.RECEIVER_WARD}
                    RECEIVER_ADDRESS={transportOrder.RECEIVER_ADDRESS}
                    DELIVERY_DATE={transportOrder.DELIVERY_DATE}
                    onChangeInput={this.onChangeInput.bind(this)}
                    disabled={disabled}
                />

                <ViettelProductInfoPanel 
                    PRODUCT_NAME={transportOrder.PRODUCT_NAME}
                    PRODUCT_DESCRIPTION={transportOrder.PRODUCT_DESCRIPTION}
                    PRODUCT_QUANTITY={transportOrder.PRODUCT_QUANTITY}
                    PRODUCT_PRICE={transportOrder.PRODUCT_PRICE}
                    PRODUCT_WEIGHT={transportOrder.PRODUCT_WEIGHT}
                    PRODUCT_LENGTH={transportOrder.PRODUCT_LENGTH}
                    PRODUCT_WIDTH={transportOrder.PRODUCT_WIDTH}
                    PRODUCT_HEIGHT={transportOrder.PRODUCT_HEIGHT}
                    onChangeInput={this.onChangeInput.bind(this)}
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
                                    value={transportOrder.ORDER_PAYMENT || ''}
                                    onChange={() => {this.onChangeInput('ORDER_PAYMENT')}}
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
                                    value={transportOrder.ORDER_SERVICE || ''}
                                    onChange={() => {this.onChangeInput('ORDER_SERVICE')}}
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
                                    value={transportOrder.ORDER_SERVICE_ADD || ''}
                                    onChange={() => {this.onChangeInput('ORDER_SERVICE_ADD')}}
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
                                    value={transportOrder.ORDER_NOTE || ''}
                                    onChange={() => {this.onChangeInput('ORDER_NOTE')}}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-md-6">
                        <div className="col-sm-4">
                            <label className="control-label">Tiền thu hộ</label>
                        </div>
                        <div className="col-sm-8">
                            <input type='number'
                                    className="form-control"
                                    disabled={disabled}
                                    ref='MONEY_COLLECTION'
                                    value={transportOrder.MONEY_COLLECTION || ''}
                                    onChange={() => {this.onChangeInput('MONEY_COLLECTION')}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ViettelPostPanel.propTypes = {
    transportOrder: propTypes.object,
    onChangeInput: propTypes.func,
    disabled: propTypes.bool
};

export default ViettelPostPanel;
