import React, { Component } from 'react';
import propTypes from 'prop-types';

class GiaoHangTietKiemPanel extends Component {

    onChangeInput(refName) {
        const newValue = this.refs[refName].value;
        const {
            onChangeInput
        } = this.props;

        onChangeInput(refName, newValue);
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    <div className='row'>
                        <div className="col-sm-3">
                            <label className="control-label"></label>
                        </div>
                        <div className="col-sm-9">
                            <input className="form-control"
                                type='text'
                                ref='private_note'
                                value={''}
                                onChange={() => {
                                    this.onChangeInput('private_note')
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

GiaoHangTietKiemPanel.propTypes = {
    
};

export default GiaoHangTietKiemPanel;
