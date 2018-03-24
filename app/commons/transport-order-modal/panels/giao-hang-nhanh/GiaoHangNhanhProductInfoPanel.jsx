import React, {Component} from 'react';
import propTypes from 'prop-types';

class GiaoHangNhanhProductInfoPanel extends Component {

    onChangeInput(refName, newValue = this.refs[refName].value) {
        const {
            onChangeInput
        } = this.props;

        onChangeInput(refName, newValue);
    }

    render() {

        /**
         check('Weight').exists(),
         check('Length').exists(),
         check('Width').exists(),
         check('Height').exists(),
         */

        const {
            disabled,

            Weight,
            Length,
            Width,
            Height,
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
                                    <label className="control-label required-field">Khối lượng(gram)</label>
                                </div>
                                <div className="col-sm-7">
                                    <input type="number"
                                           className="form-control"
                                           ref='Weight'
                                           value={Weight || ''}
                                           onChange={() => {this.onChangeInput('Weight')}}
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
                                           ref='Length'
                                           value={Length || ''}
                                           onChange={() => {this.onChangeInput('Length')}}
                                           disabled={disabled}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6">

                            <div className="form-group col-sm-12">
                                <div className="col-sm-5">
                                    <label className="control-label required-field">Chiều rộng(cm)</label>
                                </div>
                                <div className="col-sm-7">
                                    <input type="number"
                                           className="form-control"
                                           ref='Width'
                                           value={Width || ''}
                                           onChange={() => {
                                               this.onChangeInput('Width')
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
                                           ref='Height'
                                           value={Height || ''}
                                           onChange={() => {
                                               this.onChangeInput('Height')
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

GiaoHangNhanhProductInfoPanel.propTypes = {
    onChangeInput: propTypes.func,
    disabled: propTypes.bool,

    // PRODUCT_NAME: propTypes.string,
};

export default GiaoHangNhanhProductInfoPanel;