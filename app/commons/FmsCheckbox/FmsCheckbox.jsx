import React from 'react';

class FmsCheckbox extends React.Component {
    onChange() {
        this.props.onChange(
            this.refs['checkbox'].checked
        );
    }

    render() {
        const {checked, className} = this.props;

        return (
            <input
                className={className}
                type='checkbox'
                ref='checkbox'
                checked={checked}
                onChange={this.onChange.bind(this)}
            />
        )
    }
}

export default FmsCheckbox
