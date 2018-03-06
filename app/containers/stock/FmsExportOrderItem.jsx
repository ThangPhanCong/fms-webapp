import React, { Component } from 'react';
import propTypes from "prop-types";
import {getTransportOrderInfo} from "../../api/TransportProviderApi";
import ic_viettel from 'images/ic_viettel.png';
import ic_mobi from 'images/ic_mobi.png';
import ic_vina from 'images/ic_vina.png';
import {toReadableDatetime} from "utils/datetime-utils";
import {toReadablePrice} from "utils/price-utils";
import {extract} from "utils/phone-extract-utils";

class FmsExportOrderItem extends Component {
    state = {
        order: {},
        haveTransportOrder: false
    };

    getPhoneProviderImage(phone) {
        if (!phone || phone.length < 10 || phone.length > 11) return null;
        switch (extract(phone)) {
            case 'viettel':
                return ic_viettel;
            case 'mobi':
                return ic_mobi;
            case 'vina':
                return ic_vina;
        }

        return null;
    }

    calculateProductsPrice(products) {
        if (Array.isArray(products) && products.length > 0) {
            return products.reduce((totalPrice, product) => {
                return totalPrice + (product.price * product.quantity - product.discount);
            }, 0)
        } else {
            return 0;
        }
    }

    calculateTotalPrice(order) {
        if (order) {
            const transport_fee = order.transport_fee || 0;
            const productsFee = this.calculateProductsPrice(order.products) || 0;

            return parseInt(transport_fee) + productsFee;
        } else {
            return 0;
        }
    }

    renderDatetime(datetime) {
        const date = toReadableDatetime(datetime);
        return (
            <td>
                {date.time}
                <br/>
                {date.date}
            </td>
        );
    }

    renderProductIdItem(products) {
        return (
            <td>
                {
                    products && products.map(
                        (product, i) => [
                            <span key={1}>{product.id}</span>,
                            <br key={2}/>
                        ]
                    )
                }
            </td>
        )
    }

    getTransportOrderInfo(order_id) {
        getTransportOrderInfo(order_id)
            .then(res => {
                if (res.is_not_created) {
                    this.setState({haveTransportOrder: false});
                } else {
                    this.setState({haveTransportOrder: true});
                }
            });
    }

    componentDidMount() {
        const {order} = this.props;
        if (order) {
            this.getTransportOrderInfo(order._id);
            this.setState({order});
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.order) {
            this.getTransportOrderInfo(nextProps.order._id);
        }
    } 

    render() {
        const {
            index,
            onSelectItem,
            onSelectCreateTransportOrderModal,
            onSelectTransportOrderDetailModal
        } = this.props;

        const {haveTransportOrder, order} = this.state;

        if (order) {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td><a>
                        <span
                            className="badge badge-info"
                            onClick={() => {
                                onSelectItem(order)
                            }}
                        >{order.id}</span>
                    </a></td>
                    <td>{order.customer_name}</td>
                    <td>{order.customer_phone}</td>
                    <td><img src={this.getPhoneProviderImage(order.customer_phone)}/></td>
    
                    {
                        this.renderProductIdItem(order.products)
                    }
    
                    <td>{order.private_note}</td>
                    {
                        this.renderDatetime(order.created_time)
                    }
                    <td>{toReadablePrice(this.calculateTotalPrice(order))}</td>
                    <td className='text-center'>
                        {
                            order.is_pay
                                ? <i className='fa fa-check clickable text-navy'/>
                                : null
                        }
                    </td>
                    <td className="color-tag">
                        {
                            order.order_tag ?
                                <span className="label tag-label"
                                        style={{
                                            backgroundColor: order.order_tag.color,
                                            color: 'white'
                                        }}
                                >{order.order_tag.name}</span>
                                : null
                        }
                    </td>
                    <td>
                        {
                            haveTransportOrder ?
                            <button
                                className='btn btn-sm btn-primary'
                                onClick={() => onSelectTransportOrderDetailModal(order._id)}
                            > Xem vận đơn
                            </button>
                            :
                            <button
                                className='btn btn-outline btn-sm btn-primary'
                                onClick={() => onSelectCreateTransportOrderModal(order)}
                            > Tạo vận đơn
                            </button>
                        }
                    </td>
                </tr>
            );
        }
        return null;
    }
}

FmsExportOrderItem.propTypes = {
    order: propTypes.object,
    index: propTypes.number,
    onSelectItem: propTypes.func,
    onSelectCreateTransportOrderModal: propTypes.func,
    onSelectTransportOrderDetailModal: propTypes.func
};

export default FmsExportOrderItem;
