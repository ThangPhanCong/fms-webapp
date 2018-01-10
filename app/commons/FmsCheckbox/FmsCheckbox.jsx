import React from 'react';

class FmsCheckbox extends React.Component {
    state = {
        checked: this.props.checked || false
    }
    onChange() {
        if (!this.props.disabled) {
            this.setState({checked: !this.state.checked});
        }
    }

    render() {
        const {checked, className, label, disabled} = this.props;
        return (
            <div className={'checkbox ' + className}>
                <input
                    type='checkbox'
                    ref='checkbox'
                    checked={this.state.checked}
                    disabled={disabled}
                    onChange={this.onChange.bind(this)}
                />
                <label onClick={this.onChange.bind(this)}>{label}</label>
            </div>
        )
    }
}

export default FmsCheckbox
