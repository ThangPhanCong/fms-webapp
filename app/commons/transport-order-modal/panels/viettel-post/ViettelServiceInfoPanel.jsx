import React, {Component} from 'react';
import {getViettelExtraServices, getViettelServices} from "../../../../api/ViettelPostApi";
import propTypes from "prop-types";
import {toDatetimeLocal} from "../../../../utils/datetime-utils";

class ViettelServiceInfoPanel extends Component {
    state = {
        services: [],
        extraServices: [],
        isLoading: true
    };

    onChangeInput(refName, newValue = this.refs[refName].value) {
        const {
            onChangeInput
        } = this.props;

        onChangeInput(refName, newValue);
    }

    componentDidMount() {
        const loadServicePromise = getViettelServices()
            .then(services => this.setState({services}));

        const loadExtraServicePromise = getViettelExtraServices()
            .then(extraServices => this.setState({extraServices}));

        Promise.all([loadServicePromise, loadExtraServicePromise])
            .then(() => this.setState({isLoading: false}));
    }

    render() {
        const {
            disabled,

            DELIVERY_DATE,
            ORDER_PAYMENT,
            ORDER_SERVICE,
            ORDER_SERVICE_ADD,
            ORDER_NOTE,
            MONEY_COLLECTION
        } = this.props;

        const {
            isLoading,
            services,
            extraServices
        } = this.state;

        return (
            <div className='row'>
                <div className="col-md-6 form-group">
                    <div className="col-sm-5">
                        <label className="control-label required-field">Loại vận đơn</label>
                    </div>
                    <div className="col-sm-7">
                        <select className="form-control required-field"
                                disabled={disabled || isLoading}
                                ref='ORDER_PAYMENT'
                                value={ORDER_PAYMENT || ''}
                                onChange={() => {
                                    this.onChangeInput('ORDER_PAYMENT')
                                }}
                        >
                            <option value=""/>
                            <option value="1">Không thu tiền</option>
                            <option value="2">Thu hộ tiền cước và tiền hàng</option>
                            <option value="3">Thu hộ tiền hàng</option>
                            <option value="4">Thu hộ tiền cước</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-6 form-group">
                    <div className="col-sm-5">
                        <label className="control-label required-field">Dịch vụ</label>
                    </div>
                    <div className="col-sm-7">
                        <select className="form-control"
                                disabled={disabled || isLoading}
                                ref='ORDER_SERVICE'
                                value={ORDER_SERVICE || ''}
                                onChange={() => {
                                    this.onChangeInput('ORDER_SERVICE')
                                }}
                        >
                            <option value=""/>
                            {
                                services.length > 0 && services.map(s => {
                                    return <option value={s.SERVICE_CODE} key={s.SERVICE_CODE}>{s.SERVICE_NAME}</option>
                                })
                            }
                        </select>
                    </div>
                </div>

                <div className="col-md-6 form-group">
                    <div className="col-sm-5">
                        <label className="control-label">Dịch vụ cộng thêm</label>
                    </div>
                    <div className="col-sm-7">
                        <select className="form-control"
                                disabled={disabled || isLoading}
                                ref='ORDER_SERVICE_ADD'
                                value={ORDER_SERVICE_ADD || ''}
                                onChange={() => {
                                    this.onChangeInput('ORDER_SERVICE_ADD')
                                }}
                        >
                            <option value=""/>
                            {
                                extraServices.length > 0 && extraServices.map(s => {
                                    return <option value={s.SERVICE_CODE} key={s.SERVICE_CODE}>{s.SERVICE_NAME}</option>
                                })
                            }
                        </select>
                    </div>
                </div>

                <div className="col-md-6 form-group">
                    <div className="col-sm-5">
                        <label className="control-label required-field">Ghi chú</label>
                    </div>
                    <div className="col-sm-7">
                        <input type='text'
                               className="form-control"
                               disabled={disabled || isLoading}
                               ref='ORDER_NOTE'
                               value={ORDER_NOTE || ''}
                               onChange={() => {
                                   this.onChangeInput('ORDER_NOTE')
                               }}
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="col-sm-5">
                        <label className="control-label required-field">Ngày lấy hàng</label>
                    </div>
                    <div className="col-sm-7">
                        <input type="datetime-local"
                               className="form-control"
                               ref='DELIVERY_DATE'
                               value={toDatetimeLocal(DELIVERY_DATE) || ''}
                               onChange={() => {
                                   this.onChangeInput('DELIVERY_DATE')
                               }}
                               disabled={disabled}
                        />
                    </div>
                </div>

                <div className="col-md-6 form-group">
                    <div className="col-sm-5">
                        <label className="control-label required-field">Tiền thu hộ</label>
                    </div>
                    <div className="col-sm-7">
                        <input type='number'
                               className="form-control"
                               disabled={disabled || isLoading}
                               ref='MONEY_COLLECTION'
                               value={MONEY_COLLECTION || ''}
                               onChange={() => {
                                   this.onChangeInput('MONEY_COLLECTION')
                               }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

ViettelServiceInfoPanel.propTypes = {
    onChangeInput: propTypes.func,
    disabled: propTypes.bool,

    ORDER_PAYMENT: propTypes.string,
    DELIVERY_DATE: propTypes.string,
    ORDER_SERVICE: propTypes.string,
    ORDER_SERVICE_ADD: propTypes.string,
    ORDER_NOTE: propTypes.string,
    MONEY_COLLECTION: propTypes.number
};

export default ViettelServiceInfoPanel;