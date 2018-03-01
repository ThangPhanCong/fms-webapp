import React, {Component} from "react";
import propTypes from "prop-types";
import {extract} from "utils/phone-extract-utils";

import ic_viettel from 'images/ic_viettel.png';
import ic_mobi from 'images/ic_mobi.png';
import ic_vina from 'images/ic_vina.png';
import {toReadablePrice} from "../../utils/price-utils";
import {toReadableDatetime} from "../../utils/datetime-utils";

class FmsExportOrderTable extends Component {

    state = {};

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
                    products.map(
                        (product, i) => [
                            <span key={1}>{product.id}</span>,
                            <br key={2}/>
                        ]
                    )
                }
            </td>
        )
    }

    renderTableRows() {
        const {
            orders,
            onSelectItem,
            onSelectCreateTransportOrderModal
        } = this.props;

        return orders.map(
            (order, i) => (
                <tr key={order.id}>
                    <td>{i}</td>
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
                        <button
                            className='btn btn-outline btn-sm btn-primary'
                            onClick={() => onSelectCreateTransportOrderModal(order)}
                        >Tạo vận đơn
                        </button>
                    </td>
                </tr>
            )
        );
    }

    renderTableBody() {
        return (
            <tbody>
            {
                this.renderTableRows()
            }
            </tbody>
        )
    }

    renderTableHeader() {
        return (
            <thead>
            <tr>
                <th>STT</th>
                <th>Mã đơn</th>
                <th>Khách hàng</th>
                <th>Điện thoại</th>
                <th>Nhà mạng</th>
                <th>Sản phẩm</th>
                <th>Ghi chú</th>
                <th>Ngày tạo</th>
                <th>Thành tiền</th>
                <th className='text-center'>Đã thanh toán</th>
                <th>Đánh dấu</th>
                <th>Vận đơn</th>
            </tr>
            </thead>
        )
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table table-striped">
                    {
                        this.renderTableHeader()
                    }

                    {
                        this.renderTableBody()
                    }
                </table>

            </div>
        )
    }


}

FmsExportOrderTable.propTypes = {
    orders: propTypes.array,
    onSelectItem: propTypes.func,
    onSelectCreateTransportOrderModal: propTypes.func,
};

export default FmsExportOrderTable;