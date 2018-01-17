import React, {Component} from 'react';
import propTypes from 'prop-types';
import uuid from 'uuid';
import {delay} from 'utils/timeout-utils';

class FmsSearchDropdown extends Component {

    state = {
        showMenuItem: false
    };

    onFocusInput() {
        this.setState({showMenuItem: true});
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
        console.log('onSelectItem', index);
        const {onSelectItem} = this.props;

        onSelectItem(index);
    }

    render() {
        const {
            showMenuItem
        } = this.state;

        const {
            query,
            items,
            className,
            placeholder
        } = this.props;

        return (
            <div
                className={`form-group fms-searchdropdown dropdown ${showMenuItem ? 'open' : ''} ${className || ''}`}>
                <div className='input-container'>
                    <input
                        className='form-control'
                        type='text'
                        ref='search'
                        value={query}
                        placeholder={placeholder || ''}
                        onChange={() => this.onChangeInput('search')}
                        onFocus={this.onFocusInput.bind(this)}
                    />
                    {
                        showMenuItem
                            ? <i
                                className='fa fa-times clickable'
                                onClick={() => {
                                    this.setState({showMenuItem: false})
                                }}
                            />
                            : null
                    }
                </div>
                <ul className='dropdown-menu'>
                    {
                        items.length > 0 ? items.map(
                            (item, i) => (
                                <li
                                    key={uuid()}
                                    onClick={() => this.onSelectItem(i)}
                                ><a>{item}</a></li>
                            )
                        ) : <li><a className='none-item'>Không có sản phẩm nào để hiển thị</a></li>
                    }
                </ul>
            </div>
        )
    }
}

FmsSearchDropdown.propTypes = {
    onSearchChange: propTypes.func,
    onSelectItem: propTypes.func,
    items: propTypes.array,
    query: propTypes.string,
    className: propTypes.string,
    placeholder: propTypes.string
};

export default FmsSearchDropdown;