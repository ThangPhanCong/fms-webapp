import React, {Component} from 'react';
import propTypes from 'prop-types';

class ViettelProductInfoPanel extends Component {

    onChangeInput(refName, newValue = this.refs[refName].value) {
        const {
            onChangeInput
        } = this.props;

        onChangeInput(refName, newValue);
    }

    render() {
        const {
            disabled,
            PRODUCT_NAME,
            PRODUCT_DESCRIPTION,
            PRODUCT_QUANTITY,
            PRODUCT_PRICE,
            PRODUCT_WEIGHT
        } = this.props;

        return (
            <div className="panel panel-success">
                <div className="panel-heading">
                    Thông tin sản phẩm
                </div>
                <div className="panel-body">
                    <div className="row form-group">
                        <div className="col-md-6">
                            <div className="col-sm-4">
                                <label className="control-label">Tên sản phẩm</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="text"
                                    className="form-control"
                                    ref='PRODUCT_NAME'
                                    value={PRODUCT_NAME || ''}
                                    onChange={() => {this.onChangeInput('PRODUCT_NAME')}}
                                    disabled={disabled}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="col-sm-4">
                                <label className="control-label">Miêu tả sản phẩm</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="text"
                                    className="form-control"
                                    ref='PRODUCT_DESCRIPTION'
                                    value={PRODUCT_DESCRIPTION || ''}
                                    onChange={() => {this.onChangeInput('PRODUCT_DESCRIPTION')}}
                                    disabled={disabled}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-md-6">
                            <div className="col-sm-4">
                                <label className="control-label">Số lượng</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="number"
                                    className="form-control"
                                    ref='PRODUCT_QUANTITY'
                                    value={PRODUCT_QUANTITY || ''}
                                    onChange={() => {this.onChangeInput('PRODUCT_QUANTITY')}}
                                    disabled={disabled}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="col-sm-4">
                                <label className="control-label">Giá sản phẩm</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="number"
                                    className="form-control"
                                    ref='PRODUCT_PRICE'
                                    value={PRODUCT_PRICE || ''}
                                    onChange={() => {this.onChangeInput('PRODUCT_PRICE')}}
                                    disabled={disabled}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-md-6">
                            <div className="col-sm-4">
                                <label className="control-label">Khối lượng</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="number"
                                    className="form-control"
                                    ref='PRODUCT_WEIGHT'
                                    value={PRODUCT_WEIGHT || ''}
                                    onChange={() => {this.onChangeInput('PRODUCT_WEIGHT')}}
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

ViettelProductInfoPanel.propTypes = {
    onChangeInput: propTypes.func,
    disabled: propTypes.bool,
    PRODUCT_NAME: propTypes.string,
    PRODUCT_DESCRIPTION: propTypes.string,
    PRODUCT_QUANTITY: propTypes.string,
    PRODUCT_PRICE: propTypes.string,
    PRODUCT_WEIGHT: propTypes.string
};

export default ViettelProductInfoPanel;