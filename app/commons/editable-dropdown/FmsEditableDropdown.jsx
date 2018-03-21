import React, {Component} from 'react';
import propTypes from 'prop-types';
import uuid from 'uuid';
import * as timeoutUtil from "../../utils/timeout-utils";

class FmsEditableDropdown extends Component {

    state = {
        showMenuItem: false
    };

    onFocusInput() {
        this.setState({showMenuItem: true});
    }

    onBlurInput(e) {
        timeoutUtil.delay(300)
            .then(() => {
                const {showMenuItem} = this.state;

                if (showMenuItem) this.setState({showMenuItem: false});
            })
    }

    onChangeInput(refName, newValue = this.refs[refName].value) {
        const {onSearchChange} = this.props;
        const {showMenuItem} = this.state;
        onSearchChange(newValue);

        if (!showMenuItem) {
            this.setState({showMenuItem: true})
        }
    }

    onSelectItem(index) {
        const {onSelectItem} = this.props;
        this.setState({showMenuItem: false});
        onSelectItem(index);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({showMenuItem: false});
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside.bind(this));
    }

    render() {
        const {
            showMenuItem
        } = this.state;

        const {
            value,
            items,
            className,
            placeholder,
            disabled
        } = this.props;

        return (
            <div ref={this.setWrapperRef.bind(this)}
                 className={`fms-searchdropdown dropdown ${showMenuItem ? 'open' : ''} ${className || ''}`}>
                <div className='input-container'>
                    <input
                        className='form-control'
                        type='text'
                        ref='search'
                        value={value}
                        placeholder={placeholder || ''}
                        onChange={() => this.onChangeInput('search')}
                        onFocus={this.onFocusInput.bind(this)}
                        onBlur={this.onBlurInput.bind(this)}
                        disabled={disabled}
                    />
                </div>
                <ul className='dropdown-menu'>
                    {
                        items && items.length > 0 ? items.map(
                            (item, i) => (
                                <li
                                    key={uuid()}
                                    onClick={() => this.onSelectItem(i)}
                                ><a>{item}</a></li>
                            )
                        ) : <li><a className='none-item' style={{cursor: "not-allowed"}}>{this.props.noItemNoti ? this.props.noItemNoti : ''}</a></li>
                    }
                </ul>
            </div>
        )
    }
}

FmsEditableDropdown.propTypes = {
    value: propTypes.string,
    onSearchChange: propTypes.func,
    onSelectItem: propTypes.func,
    items: propTypes.array,
    className: propTypes.string,
    placeholder: propTypes.string,
    noItemNoti: propTypes.string,
    disabled: propTypes.bool
};

export default FmsEditableDropdown;