import React, {Component} from 'react';
import propTypes from 'prop-types';
import FmsEditableDropdown from '../../../commons/editable-dropdown/FmsEditableDropdown';

class FmsCustomerInfoPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCustomer: null
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.customer && nextProps.customer.length > 0 && nextProps.customer[0] !== this.state.selectedCustomer) {
            this.setState({selectedCustomer: nextProps.customer[0]});
        }
    }

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

    onNameChange(newName) {
        this.props.onChangeInput('customer_name', newName);
    }

    onSelectPhone(index) {
        if (this.state.selectedCustomer && Array.isArray(this.state.selectedCustomer.phone)) {
            this.props.onChangeInput('customer_phone', this.state.selectedCustomer.phone[index]);
        }
    }

    onSelectName(index) {
        let customer = this.props.customer[index];
        this.props.onChangeInput(['customer_name', 'customer_phone', 'customer_facebook'],
            [customer.name, customer.phone.length > 0 ? customer.phone[0] : " ",
                `facebook.com/${customer.fb_id}`], true);
        this.setState({selectedCustomer: customer})
    }

    render() {
        const {
            customer_name,
            customer_phone,
            customer_facebook,
            customer_email,
            disabled
        } = this.props;
        let customer = this.props.customer || [];
        let names = customer.map(c => c.name);
        let phones = this.state.selectedCustomer ? this.state.selectedCustomer.phone : [];

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
                                <FmsEditableDropdown items={names}
                                                     value={customer_name || ''}
                                                     onSearchChange={this.onNameChange.bind(this)}
                                                     noItemNoti="Không tìm thấy khách hàng nào"
                                                     disabled={disabled}
                                                     onSelectItem={this.onSelectName.bind(this)}/>
                                {/*<input type="text"*/}
                                       {/*className="form-control"*/}
                                       {/*ref='customer_name'*/}
                                       {/*value={customer_name || ''}*/}
                                       {/*onChange={() => {*/}
                                           {/*this.onChangeInput('customer_name')*/}
                                       {/*}}*/}
                                       {/*disabled={disabled}*/}
                                {/*/>*/}
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-3">
                                <label className="control-label">Điện thoại</label>
                            </div>
                            <div className="col-sm-9">
                                <FmsEditableDropdown items={phones}
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

                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-3">
                                <label className="control-label">Email</label>
                            </div>
                            <div className="col-sm-9">
                                <input type="text"
                                       className="form-control"
                                       ref='customer_email'
                                       value={customer_email || ''}
                                       onChange={() => {
                                           this.onChangeInput('customer_email')
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
    customer_email: propTypes.string,
    disabled: propTypes.bool
};

export default FmsCustomerInfoPanel;