import React, {Component} from 'react';
import propTypes from 'prop-types';
import {toReadablePrice} from "../../../utils/price-utils";
import FmsCheckbox from "../../checkbox/FmsCheckbox";

class FmsPriceCalculatorPanel extends Component {

    onChangeInput(refName, newValue = this.refs[refName].value) {
        const {onChangeInput} = this.props;
        onChangeInput(refName, newValue);
    }

    render () {
        const {
            productPrice,
            totalPrice,
            transport_fee,
            is_pay,
            disabled
        } = this.props;

        return (
            <div className="row">
                <div className="col-sm-10">
                    <span className="pull-right">Tổng tiền sản phẩm</span>
                </div>
                <div className="col-sm-2">
                    <label className='pull-right'>{toReadablePrice(productPrice)}</label>
                </div>

                <div className="col-sm-10">
                    <span className="pull-right">Phí vận chuyển</span>
                </div>
                <div className="col-sm-2">
                    <label className='pull-right'>{toReadablePrice(transport_fee || 0)}</label>
                </div>

                <div className="col-sm-10">
                    <span className="pull-right">Tổng cộng</span>
                </div>
                <div className="col-sm-2">
                    <label className='pull-right'>{toReadablePrice(totalPrice)}</label>
                </div>

                <div className="col-sm-10 total-item">
                    <span className="pull-right">Đã thanh toán</span>
                </div>
                <div className="col-sm-2">
                    <FmsCheckbox
                        className='pull-right'
                        ref='is_pay'
                        checked={is_pay}
                        onChange={(value) => {
                            this.onChangeInput('is_pay', value)
                        }}
                        disabled={disabled}
                    />
                </div>

            </div>
        )
    }
}

FmsPriceCalculatorPanel.propTypes = {
    productPrice: propTypes.number,
    totalPrice: propTypes.number,
    transport_fee: propTypes.number,
    is_pay: propTypes.bool,
    onChangeInput: propTypes.func,
    disabled: propTypes.bool
};

export default FmsPriceCalculatorPanel;