import React, {Component} from 'react';
import propTypes from 'prop-types';

class FmsTransportInfoPanel extends Component {

    onChangeInput(refName) {
        const newValue = this.refs[refName].value;
        const {
            onChangeInput
        } = this.props;

        onChangeInput(refName, newValue);
    }

    render() {
        const {
            transport_address,
            transport_method,
            transport_fee
        } = this.props;

        return (
            <div className="panel panel-success">
                <div className="panel-heading">
                    Thông tin vận chuyển
                </div>
                <div className="panel-body">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-4">
                                <label className="control-label">Địa chỉ nhận</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="text"
                                       className="form-control"
                                       ref='transport_address'
                                       value={transport_address || ''}
                                       onChange={() => {
                                           this.onChangeInput('transport_address')
                                       }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-4">
                                <label className="control-label">Phương thức</label>
                            </div>
                            <div className="col-sm-8">
                                <select className="form-control"
                                        ref='transport_method'
                                        value={transport_method || ''}
                                        onChange={() => {
                                            this.onChangeInput('transport_method')
                                        }}
                                >
                                    <option value="" defaultValue/>
                                    <option value="TONG_BUU_DIEN">Tổng bưu điện</option>
                                    <option value="VIETTEL_POST">Viettel Post</option>
                                    <option value="EMS">EMS</option>
                                    <option value="SHOPEE">Shopee</option>
                                    <option value="SELF">Tự vận chuyển</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-4">
                                <label className="control-label">Phí</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="text"
                                       className="form-control"
                                       ref='transport_fee'
                                       value={transport_fee || ''}
                                       onChange={() => {
                                           this.onChangeInput('transport_fee')
                                       }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

FmsTransportInfoPanel.propTypes = {
    onChangeInput: propTypes.func,
    transport_address: propTypes.string,
    transport_method: propTypes.string,
    transport_fee: propTypes.string,
};

export default FmsTransportInfoPanel;