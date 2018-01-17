import React, {Component} from 'react';
import propTypes from 'prop-types';
import uuid from 'uuid';
import {delay} from 'utils/timeout-utils';

class FmsSearchDropdown extends Component {

    state = {
        showMenuItem: false
    };

    onChangeInput(refName, newValue = this.refs[refName].value) {
        const {onSearchChange} = this.props;
        const {showMenuItem} = this.state;
        onSearchChange(newValue);

        if (!newValue) {
            this.setState({showMenuItem: false})
        } else if (!showMenuItem) {
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
            className
        } = this.props;

        return (
            <div
                className={`form-group dropdown ${showMenuItem ? 'open' : ''} ${className || ''}`}>
                <input
                    className='form-control'
                    type='text'
                    ref='search'
                    value={query}
                    onChange={() => this.onChangeInput('search')}
                />
                <ul className='dropdown-menu'>
                    {
                        items.map(
                            (item, i) => (
                                <li
                                    key={uuid()}
                                    onClick={() => this.onSelectItem(i)}
                                ><a>{item}</a></li>
                            )
                        )
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
};

export default FmsSearchDropdown;