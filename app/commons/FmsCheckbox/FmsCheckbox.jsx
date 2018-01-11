import React from 'react';
import propTypes from 'prop-types';

class FmsCheckbox extends React.Component {
    onChange() {
        this.props.onChange(
            this.refs['checkbox'].checked
        );
    }

    render() {
        const {checked, className, disabled} = this.props;

        return (
            <input
                className={className}
                type='checkbox'
                ref='checkbox'
                checked={checked}
                onChange={this.onChange.bind(this)}
                disabled={disabled}
            />
        )
    }
}

FmsCheckbox.propTypes = {
    onChange: propTypes.func,
    checked: propTypes.bool,
    className: propTypes.string,
    disabled: propTypes.bool
};

export default FmsCheckbox;
