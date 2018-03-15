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
            PRODUCT_WEIGHT,
            PRODUCT_WIDTH,
            PRODUCT_HEIGHT,
            PRODUCT_LENGTH
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
                                           ref='PRODUCT_NAME'
                                           value={PRODUCT_NAME || ''}
                                           onChange={() => {
                                               this.onChangeInput('PRODUCT_NAME')
                                           }}
                                           disabled={disabled}
                                    />
                                </div>
                            </div>

                            <div className="form-group col-sm-12">
                                <div className="col-sm-5">
                                    <label className="control-label required-field">Miêu tả</label>
                                </div>
                                <div className="col-sm-7">
                                    <input type="text"
                                           className="form-control"
                                           ref='PRODUCT_DESCRIPTION'
                                           value={PRODUCT_DESCRIPTION || ''}
                                           onChange={() => {
                                               this.onChangeInput('PRODUCT_DESCRIPTION')
                                           }}
                                           disabled={disabled}
                                    />
                                </div>
                            </div>

                            <div className="form-group col-sm-12">
                                <div className="col-sm-5">
                                    <label className="control-label required-field">Số lượng</label>
                                </div>
                                <div className="col-sm-7">
                                    <input type="number"
                                           className="form-control"
                                           ref='PRODUCT_QUANTITY'
                                           value={PRODUCT_QUANTITY || ''}
                                           onChange={() => {
                                               this.onChangeInput('PRODUCT_QUANTITY')
                                           }}
                                           disabled={disabled}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-sm-12">
                                <div className="col-sm-5">
                                    <label className="control-label required-field">Giá(VND)</label>
                                </div>
                                <div className="col-sm-7">
                                    <input type="number"
                                           className="form-control"
                                           ref='PRODUCT_PRICE'
                                           value={PRODUCT_PRICE || ''}
                                           onChange={() => {
                                               this.onChangeInput('PRODUCT_PRICE')
                                           }}
                                           disabled={disabled}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6">

                            <div className="form-group col-sm-12">
                                <div className="col-sm-5">
                                    <label className="control-label required-field">Khối lượng(gram)</label>
                                </div>
                                <div className="col-sm-7">
                                    <input type="number"
                                           className="form-control"
                                           ref='PRODUCT_WEIGHT'
                                           value={PRODUCT_WEIGHT || ''}
                                           onChange={() => {this.onChangeInput('PRODUCT_WEIGHT')}}
                                           disabled={disabled}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-sm-12">
                                <div className="col-sm-5">
                                    <label className="control-label required-field">Chiều dài(cm)</label>
                                </div>
                                <div className="col-sm-7">
                                    <input type="number"
                                           className="form-control"
                                           ref='PRODUCT_LENGTH'
                                           value={PRODUCT_LENGTH || ''}
                                           onChange={() => {this.onChangeInput('PRODUCT_LENGTH')}}
                                           disabled={disabled}
                                    />
                                </div>
                            </div>

                            <div className="form-group col-sm-12">
                                <div className="col-sm-5">
                                    <label className="control-label required-field">Chiều rộng(cm)</label>
                                </div>
                                <div className="col-sm-7">
                                    <input type="number"
                                           className="form-control"
                                           ref='PRODUCT_WIDTH'
                                           value={PRODUCT_WIDTH || ''}
                                           onChange={() => {
                                               this.onChangeInput('PRODUCT_WIDTH')
                                           }}
                                           disabled={disabled}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-sm-12">
                                <div className="col-sm-5">
                                    <label className="control-label required-field">Chiều cao(cm)</label>
                                </div>
                                <div className="col-sm-7">
                                    <input type="number"
                                           className="form-control"
                                           ref='PRODUCT_HEIGHT'
                                           value={PRODUCT_HEIGHT || ''}
                                           onChange={() => {
                                               this.onChangeInput('PRODUCT_HEIGHT')
                                           }}
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

ViettelProductInfoPanel.propTypes = {
    onChangeInput: propTypes.func,
    disabled: propTypes.bool,

    PRODUCT_NAME: propTypes.string,
    PRODUCT_DESCRIPTION: propTypes.string,
    PRODUCT_QUANTITY: propTypes.number,
    PRODUCT_PRICE: propTypes.number,
    PRODUCT_WEIGHT: propTypes.string,
    PRODUCT_WIDTH: propTypes.string,
    PRODUCT_HEIGHT: propTypes.string,
    PRODUCT_LENGTH: propTypes.string
};

export default ViettelProductInfoPanel;