import React, {Component} from "react";
import propTypes from "prop-types";

class FmsSucessOrderSearchBar extends Component {
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

    render () {
        const {
            id,
            customer_name,
            customer_phone,
            product
        } = this.state.filter;

        return (
            <div className="row">
                <div className="col-sm-2">
                    <div className="form-group">
                        <label className="control-label">Mã đơn</label>
                        <input type="text" className="form-control"
                               ref='id'
                               value={id || ''}
                               onChange={() => this.onChangeInput('id')}
                        />
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="form-group">
                        <label className="control-label">Khách hàng</label>
                        <input type="text" className="form-control"
                               ref='customer_name'
                               value={customer_name || ''}
                               onChange={() => this.onChangeInput('customer_name')}
                        />
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="form-group">
                        <label className="control-label">Điện thoại</label>
                        <input type="text" className="form-control"
                               ref='customer_phone'
                               value={customer_phone || ''}
                               onChange={() => this.onChangeInput('customer_phone')}
                        />
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="form-group">
                        <label className="control-label">Sản phẩm</label>
                        <input type="text" className="form-control"
                               ref='product'
                               value={product || ''}
                               onChange={() => this.onChangeInput('product')}
                        />
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="form-group">
                        <label className="control-label">Ngày tạo</label>
                        <input type="text" id="quantity" name="quantity" value="" placeholder=""
                               className="form-control"/>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="form-group">
                        <label className="control-label" htmlFor="quantity">Ngày giao hàng</label>
                        <input type="text" id="quantity" name="quantity" value="" placeholder=""
                               className="form-control"/>
                    </div>
                </div>
            </div>
        )
    }
}

FmsSucessOrderSearchBar.propTypes = {
    onChangeFilter: propTypes.func.isRequired
};

export default FmsSucessOrderSearchBar;