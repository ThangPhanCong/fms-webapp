import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    handleChange: PropTypes.func.isRequired
};

const defaultProps = {
    className: ''
};

class FmsCheckbox extends React.Component {
    render() {
        const {checked, className, label, disabled, handleChange} = this.props;
        const classes = ['checkbox', className].join(' ');
        return (
            <div className={classes}>
                <input
                    type='checkbox'
                    ref='checkbox'
                    checked={checked}
                    disabled={disabled}
                    onChange={handleChange}
                />
                <label onClick={(e) => disabled ? {} : handleChange(e)}>{label}</label>
            </div>
        )
    }
}

FmsCheckbox.propTypes = propTypes;
FmsCheckbox.defaultProps = defaultProps;

export default FmsCheckbox
