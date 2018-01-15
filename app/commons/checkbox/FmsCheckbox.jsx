import React from 'react';
import propTypes from 'prop-types';
import uuid from 'uuid';

class FmsCheckbox extends React.Component {

    state = {
        id: uuid(),
        isFocus: false,
        isHover: false
    };

    onChange() {
        const {onChange, checked, disabled} = this.props;

        if (disabled) return;
        onChange(!checked);
    }

    registerOnHover() {
        const {id} = this.state;

        console.log('id', id);

        $(`#${id}`)
            .mouseover(() => {
                this.setState({isHover: true});
            })
            .mouseout(() => {
                this.setState({isHover: false});
            })
    }

    componentDidMount() {
        this.registerOnHover();
    }

    render() {
        const {
            checked,
            className,
            disabled
        } = this.props;

        const {
            id,
            isHover
        } = this.state;

        return (
            <div
                id={id}
                className={
                    `icheckbox_square-green fms-checkbox
                    ${className ? className : ''}
                    ${checked ? 'checked' : ''}
                    ${isHover ? 'hover' : ''}
                    ${disabled ? 'disabled' : ''}
                    `
                }
                onClick={this.onChange.bind(this)}
            >
                <input type="checkbox"/>
            </div>
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
