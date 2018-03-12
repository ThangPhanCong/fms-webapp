import React, {Component} from 'react';
import propTypes from 'prop-types';
import * as ghtkApi from '../../../../api/GiaoHangTietKiemApi';
import {toDatetimeLocal} from 'utils/datetime-utils';
import {convert_case} from 'utils/location-string-utils';

class GhtkServiceInfoPanel extends Component {
    onChangeInput(refName) {
        const newValue = this.refs[refName].value;
        const {
            onChangeInput
        } = this.props;

        onChangeInput(refName, newValue);
    }

    render() {
        const {
            disabled,
            note,
            value,
            pick_money
        } = this.props;

        return (
            <div className="row form-group">
                <div className="col-md-6">
                    <div className="col-sm-4">
                        <label className="control-label">Ghi chú</label>
                    </div>
                    <div className="col-sm-8">
                        <input type="text"
                               className="form-control"
                               ref='note'
                               value={note || ''}
                               onChange={() => {this.onChangeInput('note')}}
                               disabled={disabled}
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="col-sm-4">
                        <label className="control-label">Giá trị đơn hàng</label>
                    </div>
                    <div className="col-sm-8">
                        <input type="text"
                               className="form-control"
                               ref='value'
                               value={value || ''}
                               onChange={() => {this.onChangeInput('value')}}
                               disabled={disabled}
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="col-sm-4">
                        <label className="control-label">Tiền thu hộ</label>
                    </div>
                    <div className="col-sm-8">
                        <input type="text"
                               className="form-control"
                               ref='pick_money'
                               value={pick_money || ''}
                               onChange={() => {this.onChangeInput('pick_money')}}
                               disabled={disabled}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

GhtkServiceInfoPanel.propTypes = {
    onChangeInput: propTypes.func,
    disabled: propTypes.bool,

    note: propTypes.string,
    value: propTypes.string,
};

export default GhtkServiceInfoPanel;