import React, {Component} from "react";
import {getOrderTags} from "../../../api/OrderTagApi";

class FmsNewOrderSearchBar extends Component {
    state = {
        filter: {},
        orderTags: []
    };

    onChangeInput(refName) {
        const newValue = this.refs[refName].value;
        let newFilter;
        if (refName === 'order_tag' && newValue === 'none') {
            newFilter = this.state.filter;
            delete newFilter.order_tag;
            console.log(newFilter);
        } else {
            newFilter = {
                ...this.state.filter,
                [refName]: newValue
            };
        }

        this.setState({filter: newFilter});

        this.props.onChangeFilter(newFilter);
    }

    getOrderTags(project) {
        getOrderTags(project.alias)
            .then(
                orderTags => {
                    const noneTag = {_id: 'none', name: ''};
                    orderTags.unshift(noneTag);
                    this.setState({orderTags});
                },
                err => {
                    alert(err.message)
                }
            )
            .catch(err => alert(err.message));
    }

    componentDidMount() {
        const {project} = this.props;

        if (project) {
            this.getOrderTags(project);
        }
    }

    render() {
        const {
            id,
            customer_name,
            customer_phone,
            product,
            order_tag
        } = this.state.filter;

        const {orderTags} = this.state;

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
                        <label className="control-label" htmlFor="quantity">Ngày tạo</label>
                        <input type="text" id="quantity" name="quantity" value="" placeholder=""
                               className="form-control"/>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="form-group">
                        <label className="control-label">Đánh dấu</label>
                        <select className="form-control"
                                ref='order_tag'
                                value={order_tag || ''}
                                onChange={() => {
                                    this.onChangeInput('order_tag')
                                }}
                        >
                            {
                                orderTags.map(
                                    (tag, i) => (
                                        <option key={i} value={tag._id}>{tag.name}</option>
                                    )
                                )
                            }
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

export default FmsNewOrderSearchBar;