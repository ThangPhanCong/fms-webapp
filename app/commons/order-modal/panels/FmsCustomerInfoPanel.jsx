import React, {Component} from 'react';
import propTypes from 'prop-types';
import FmsEditableDropdown from '../../../commons/editable-dropdown/FmsEditableDropdown';

class FmsCustomerInfoPanel extends Component {

    onChangeInput(refName) {
        const newValue = this.refs[refName].value;
        const {
            onChangeInput
        } = this.props;

        onChangeInput(refName, newValue);
    }

    onPhoneChange(newPhone) {
        this.props.onChangeInput('customer_phone', newPhone);
    }

    onSelectPhone(index) {
        if (this.props.customer && Array.isArray(this.props.customer.phone)) {
            this.props.onChangeInput('customer_phone', this.props.customer.phone[index]);
        }
    }

    render() {
        const {
            customer_name,
            customer_phone,
            customer_facebook,
            disabled
        } = this.props;
        let customer = this.props.customer || {};

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
                                <FmsEditableDropdown items={customer.phone}
                                                     value={customer_phone || ''}
                                                     onSearchChange={this.onPhoneChange.bind(this)}
                                                     noItemNoti="Không tìm thấy số điện thoại nào"
                                                     disabled={disabled}
                                                     onSelectItem={this.onSelectPhone.bind(this)}/>
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