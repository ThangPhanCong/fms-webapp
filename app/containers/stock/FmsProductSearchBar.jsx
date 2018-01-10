import React, {Component} from "react";
import propTypes from "prop-types";

class FmsProductSearchBar extends Component {

    state = {
        filter: {}
    };

    onChangeInput(refName) {
        const newValue = this.refs[refName].value;
        const newFilter = {
            ...this.state.filter,
            [refName]: newValue
        };

        this.setState({filter: newFilter});

        this.props.onChangeFilter(newFilter);
    }

    render() {
        const {
            id,
            name,
            price,
            quantity
        } = this.state.filter;

        return (
            <div className="row">
                <div className="col-sm-2">
                    <div className="form-group">
                        <label className="control-label">Mã sản phẩm</label>

                        <input type="text" className="form-control"
                               ref='id'
                               value={id || ''}
                               onChange={() => this.onChangeInput('id')}
                        />

                    </div>
                </div>

                <div className="col-sm-4">
                    <div className="form-group">
                        <label className="control-label">Tên sản phẩm</label>

                        <input type="text" className="form-control"
                               ref='name'
                               value={name || ''}
                               onChange={() => this.onChangeInput('name')}
                        />
                    </div>
                </div>

                <div className="col-sm-3">
                    <div className="form-group">
                        <label className="control-label">Giá bán ra</label>

                        <input type="text" className="form-control"
                               ref='price'
                               value={price || ''}
                               onChange={() => this.onChangeInput('price')}
                        />
                    </div>
                </div>

                <div className="col-sm-3">
                    <div className="form-group">
                        <label className="control-label">Số lượng</label>

                        <input type="text" className="form-control"
                               ref='quantity'
                               value={quantity || ''}
                               onChange={() => this.onChangeInput('quantity')}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

FmsProductSearchBar.propTypes = {
    onChangeFilter: propTypes.func.isRequired
};

export default FmsProductSearchBar;