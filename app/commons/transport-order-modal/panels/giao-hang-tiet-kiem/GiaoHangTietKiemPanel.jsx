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
                <p>Giao hàng tiết kiệm</p>
            </div>
        )
    }
}

GiaoHangTietKiemPanel.propTypes = {
    
};

export default GiaoHangTietKiemPanel;
