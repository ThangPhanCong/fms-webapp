import React, {Component} from 'react';
import propTypes from 'prop-types';
import FmsAddPaymentMethodModal from '../sub-modals/FmsAddPaymentMethodModal';

class FmsPaymentMethodPanel extends Component {

    state = {
        isShownAddPaymentMethodModal: false
    }

    onChangeInput(refName) {
        const newValue = this.refs[refName].value;
        const {
            onChangeInput
        } = this.props;

        onChangeInput(refName, newValue);
    }

    onOpenModal() {
        this.setState({isShownAddPaymentMethodModal: true});
    }

    onCloseModal() {
        this.setState({isShownAddPaymentMethodModal: false});
    }
 
    onAddPaymentMethod(method) {
        console.log(method);
        this.onCloseModal();
    }

    render() {
        const {isShownAddPaymentMethodModal} = this.state;
        const { disabled} = this.props;

        return (
            <div className="form-group">
                <div className='row'>
                    <div className="col-sm-3">
                        <label className="control-label">Phương thức thanh toán</label>
                    </div>
                    <div className="col-sm-6">
                        <select className='form-control'>
                            <option value=""></option>
                            <option value="1">Thẻ ngân hàng</option>
                            <option value="2">Thanh toán COD</option>
                            <option value="4">Trực tiếp</option>
                        </select>
                    </div>
                    <div className="col-sm-3">
                        <button className='btn btn-success pull-right'
                            onClick={this.onOpenModal.bind(this)}>
                            Thêm phương thức
                        </button>
                    </div>
                </div>

                <FmsAddPaymentMethodModal
                    isShown={isShownAddPaymentMethodModal}
                    onClose={this.onCloseModal.bind(this)}
                    onAddPaymentMethod={this.onAddPaymentMethod.bind(this)}
                />
            </div>
        )
    }
}

FmsPaymentMethodPanel.propTypes = {
    onChangeInput: propTypes.func,
    disabled: propTypes.bool
};

export default FmsPaymentMethodPanel;