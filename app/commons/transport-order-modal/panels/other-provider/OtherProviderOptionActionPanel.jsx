import React, {Component} from "react";
import propTypes from 'prop-types';
import * as otherProviderTransportOrder from '../../../../api/OtherProviderTransportOrder';
import {toDatetimeLocal, toReadableDatetime} from "../../../../utils/datetime-utils";

class OtherProviderOptionActionPanel extends Component {

    state = {
        transportOrderStatus: {},
        isLoading: false
    };

    createTransportOrderStatus() {
        const {transportOrderStatus} = this.state;
        const {
            transportOrder,
            onUpdateTransportOrder
        } = this.props;
        const {order_id, transport_provider} = transportOrder;

        this.setState({isLoading: true});

        //call api
        otherProviderTransportOrder.createTransportOrderStatus(transportOrderStatus, transport_provider.provider_name, order_id)
            .then(
                res => {
                    onUpdateTransportOrder();

                    this.setState({transportOrderStatus: {}});
                },
                err => {
                    alert(err.message);
                }
            )
            .then(() => this.setState({isLoading: false}));
    }


    onTransportOrderStatusChange(refName, newValue = this.refs[refName].value) {
        const newStatus = {
            ...this.state.transportOrderStatus,
            [refName]: newValue
        };

        if (refName === 'date') {
            const datetime = toReadableDatetime(newValue);
            newStatus.date = datetime.date + ' ' + datetime.time + ':00';
        }

        this.setState({transportOrderStatus: newStatus});
    }

    render() {
        const {
            transportOrder,
            disabled
        } = this.props;

        const {
            transportOrderStatus,
            isLoading
        } = this.state;

        const transportStatus = [
            'Tiếp nhận đơn hàng từ đối tác',
            'Đơn hàng chờ xử lý',
            'Giao cho bưu cục',
            'Giao cho Bưu tá đi nhận',
            'Bưu tá đã nhận hàng'
        ];

        return (
            <div>
                <a
                    className='btn btn-success'
                    data-toggle="collapse"
                    href={'#toogle'}>Cập nhật trạng thái
                </a>
                <br/>
                <div id='toogle' className='collapse' style={{marginTop: '20px'}}>
                    <div className="row form-group">
                        <div className="col-sm-2">
                            <label className="control-label">Nội dung</label>
                        </div>
                        <div className="col-sm-4">
                            <select className="form-control"
                                    ref='content'
                                    value={transportOrderStatus && transportOrderStatus.content || ''}
                                    onChange={() => {
                                        this.onTransportOrderStatusChange('content')
                                    }}
                                    disabled={disabled || isLoading}
                            >
                                <option value=""/>
                                {
                                    transportStatus.map(
                                        t => <option key={t} value={t}>{t}</option>
                                    )
                                }
                            </select>
                        </div>

                        <div className="col-sm-2">
                            <label className="control-label">Ngày tháng</label>
                        </div>
                        <div className="col-sm-4">
                            <input type='datetime-local'
                                   className="form-control"
                                   ref='date'
                                   value={toDatetimeLocal(transportOrderStatus && transportOrderStatus.date) || ''}
                                   onChange={() => {
                                       this.onTransportOrderStatusChange('date')
                                   }}
                                   disabled={disabled || isLoading}
                            />
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-sm-2">
                            <label className="control-label">Ghi chú</label>
                        </div>
                        <div className="col-sm-10">
                            <textarea
                                className="form-control"
                                ref='note'
                                value={transportOrderStatus && transportOrderStatus.note || ''}
                                onChange={() => {
                                    this.onTransportOrderStatusChange('note')
                                }}
                                rows='2'
                                disabled={disabled || isLoading}
                            />
                        </div>
                    </div>

                    <button
                        className='btn btn-primary pull-right'
                        onClick={() => this.createTransportOrderStatus()}
                        disabled={disabled || isLoading}>Cập nhật
                    </button>
                    <br/>
                </div>
            </div>
        )
    }
}

OtherProviderOptionActionPanel.propTypes = {
    transportOrder: propTypes.object,
    onUpdateTransportOrder: propTypes.func,

    disabled: propTypes.bool
};

export default OtherProviderOptionActionPanel;