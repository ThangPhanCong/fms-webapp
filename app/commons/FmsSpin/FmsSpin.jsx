import React from 'react';

import spinnerImg from '../../assets/images/spinner.png';

class FmsSpin extends React.Component {
    render() {
        const {size, center} = this.props;
        const centerStl = {
            paddingLeft: '50%',
            marginLeft: `-${parseInt(size)/2}px`
        };

        return (
            <div className="fms-spin" style={center ? centerStl : null}>
                <img className="spinner" src={spinnerImg} height={size + 'px'} width={size + 'px'}/>
            </div>
        );
    }
}

FmsSpin.defaultProps = {
    size: 35
};

export default FmsSpin;
