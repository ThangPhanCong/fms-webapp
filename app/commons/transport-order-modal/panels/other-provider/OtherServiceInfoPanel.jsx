import React, {Component} from 'react';
import propTypes from 'prop-types';
import {toDatetimeLocal} from 'utils/datetime-utils';
import {convert_case} from 'utils/location-string-utils';

class OtherServiceInfoPanel extends Component {
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
            tracking_id,
            money_transport,
            money_collection
        } = this.props;

        return (
            <div className="row">
                <div className="col-sm-6 form-group">
                    <div className="col-sm-4">
                        <label className="control-label">Mã vận đơn</label>
                    </div>
                    <div className="col-sm-8">
                        <input type="text"
                               className="form-control"
                               ref='tracking_id'
                               value={tracking_id || ''}
                               onChange={() => {this.onChangeInput('tracking_id')}}
                               disabled={disabled}
                        />
                    </div>
                </div>

                <div className="col-sm-6 form-group">
                    <div className="col-sm-4">
                        <label className="control-label">Phí vận chuyển</label>
                    </div>
                    <div className="col-sm-8">
                        <input type="text"
                               className="form-control"
                               ref='money_transport'
                               value={money_transport || ''}
                               onChange={() => {this.onChangeInput('money_transport')}}
                               disabled={disabled}
                        />
                    </div>
                </div>

                <div className="col-sm-6 form-group">
                    <div className="col-sm-4">
                        <label className="control-label">Tiền thu hộ</label>
                    </div>
                    <div className="col-sm-8">
                        <input type="text"
                               className="form-control"
                               ref='money_collection'
                               value={money_collection || ''}
                               onChange={() => {this.onChangeInput('money_collection')}}
                               disabled={disabled}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

OtherServiceInfoPanel.propTypes = {
    onChangeInput: propTypes.func,
    disabled: propTypes.bool,

    tracking_id: propTypes.string,
    money_transport: propTypes.string,
    money_collection: propTypes.string,
};

export default OtherServiceInfoPanel;