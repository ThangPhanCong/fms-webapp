import React, {Component} from 'react';
import propTypes from 'prop-types';

class ShipChungProductInfoPanel extends Component {

    onChangeInput(refName, newValue = this.refs[refName].value) {
        const {
            onChangeInput
        } = this.props;

        onChangeInput(refName, newValue);
    }

    render() {

        /**
         Order_ProductName={transportOrder.Order_ProductName}
         Order_Amount={transportOrder.Order_Amount}
         Order_Weight={transportOrder.Order_Weight}
         Order_Quantity={transportOrder.Order_Quantity}
         */

        const {
            disabled,

            Order_ProductName,
            Order_Weight,
            Order_Quantity

        } = this.props;

        return (
            <div className="panel panel-success">
                <div className="panel-heading">
                    Thông tin sản phẩm
                </div>
                <div className="panel-body">
                    <div className="row">

                        <div className="col-sm-6">
                            <div className="form-group col-sm-12">
                                <div className="col-sm-5">
                                    <label className="control-label required-field">Tên sản phẩm</label>
                                </div>
                                <div className="col-sm-7">
                                    <input type="text"
                                           className="form-control"
                                           ref='Order_ProductName'
                                           value={Order_ProductName || ''}
                                           onChange={() => {this.onChangeInput('Order_ProductName')}}
                                           disabled={disabled}
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="col-sm-6">
                            <div className="form-group col-sm-12">
                                <div className="col-sm-5">
                                    <label className="control-label required-field">Số lượng</label>
                                </div>
                                <div className="col-sm-7">
                                    <input type="number"
                                           className="form-control"
                                           ref='Order_Quantity'
                                           value={Order_Quantity || ''}
                                           onChange={() => {this.onChangeInput('Order_Quantity')}}
                                           disabled={disabled}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-sm-12">
                                <div className="col-sm-5">
                                    <label className="control-label required-field">Khối lượng(gram)</label>
                                </div>
                                <div className="col-sm-7">
                                    <input type="number"
                                           className="form-control"
                                           ref='Order_Weight'
                                           value={Order_Weight || ''}
                                           onChange={() => {this.onChangeInput('Order_Weight')}}
                                           disabled={disabled}
                                    />
                                </div>
                            </div>

                        </div>


                    </div>


                </div>
            </div>
        )
    }
}

ShipChungProductInfoPanel.propTypes = {
    onChangeInput: propTypes.func,
    disabled: propTypes.bool,

    // PRODUCT_NAME: propTypes.string,
};

export default ShipChungProductInfoPanel;