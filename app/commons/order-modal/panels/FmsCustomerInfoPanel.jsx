import React, {Component} from 'react';
import propTypes from 'prop-types';

class FmsCustomerInfoPanel extends Component {

    onChangeInput(refName) {
        const newValue = this.refs[refName].value;
        const {
            onChangeInput
        } = this.props;

        onChangeInput(refName, newValue);
    }

    render () {
        const {
            customer_name,
            customer_phone,
            customer_facebook,
            disabled
        } = this.props;

        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    Thông tin khách hàng
                </div>
                <div className="panel-body">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-3">
                                <label className="control-label">Tên</label>
                            </div>
                            <div className="col-sm-9">
                                <input type="text"
                                       className="form-control"
                                       ref='customer_name'
                                       value={customer_name || ''}
                                       onChange={() => {
                                           this.onChangeInput('customer_name')
                                       }}
                                       disabled={disabled}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-3">
                                <label className="control-label">Điện thoại</label>
                            </div>
                            <div className="col-sm-9">
                                <input type="text"
                                       className="form-control"
                                       ref='customer_phone'
                                       value={customer_phone || ''}
                                       onChange={() => {
                                           this.onChangeInput('customer_phone')
                                       }}
                                       disabled={disabled}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-3">
                                <label className="control-label">Facebook</label>
                            </div>
                            <div className="col-sm-9">
                                <input type="text"
                                       className="form-control"
                                       ref='customer_facebook'
                                       value={customer_facebook || ''}
                                       onChange={() => {
                                           this.onChangeInput('customer_facebook')
                                       }}
                                       disabled={disabled}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

FmsCustomerInfoPanel.propTypes = {
    onChangeInput: propTypes.func,
    customer_name: propTypes.string,
    customer_phone: propTypes.string,
    customer_facebook: propTypes.string,
    disabled: propTypes.bool
};

export default FmsCustomerInfoPanel;