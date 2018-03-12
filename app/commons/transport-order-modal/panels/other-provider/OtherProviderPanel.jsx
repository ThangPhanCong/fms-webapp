import React, { Component } from 'react';
import propTypes from 'prop-types';
import ViettelTransportInfoPanel from '../viettel-post/ViettelTransportInfoPanel';
import OtherProviderProductInfoPanel from './OtherProviderProductInfoPanel';
import {getViettelServices} from '../../../../api/ViettelPostApi';

class OtherProviderPanel extends Component {
    state = {
        services: []
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
    }

    render() {
        const {
            disabled,
            transportOrder
        } = this.props;
        const {services} = this.state;

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

                <OtherProviderProductInfoPanel 
                    PRODUCT_NAME={transportOrder.PRODUCT_NAME}
                    PRODUCT_DESCRIPTION={transportOrder.PRODUCT_DESCRIPTION}
                    PRODUCT_QUANTITY={transportOrder.PRODUCT_QUANTITY}
                    PRODUCT_PRICE={transportOrder.PRODUCT_PRICE}
                    PRODUCT_WEIGHT={transportOrder.PRODUCT_WEIGHT}
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
                    <div className="col-md-6">
                        <div className="col-sm-4">
                            <label className="control-label">Phí vận chuyển</label>
                        </div>
                        <div className="col-sm-8">
                            <input type='number'
                                    className="form-control"
                                    disabled={disabled}
                                    ref='MONEY_TRANSPORT'
                                    value={transportOrder.MONEY_TRANSPORT || ''}
                                    onChange={() => {this.onChangeInput('MONEY_TRANSPORT')}}
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

OtherProviderPanel.propTypes = {
    transportOrder: propTypes.object,
    onChangeInput: propTypes.func,
    disabled: propTypes.bool
};

export default OtherProviderPanel;
