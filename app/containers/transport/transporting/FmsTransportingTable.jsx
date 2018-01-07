import React, {Component} from "react";
import {extract} from "utils/phone-extract-utils";

import ic_viettel from 'images/ic_viettel.png';
import ic_mobi from 'images/ic_mobi.png';
import ic_vina from 'images/ic_vina.png';

class FmsTransportingTable extends Component {

    getPhoneProviderImage (phone) {
        if (!phone || phone.length < 10 || phone.length > 11) return null;
        switch(extract(phone)) {
            case 'viettel':
                return ic_viettel;
            case 'mobi':
                return ic_mobi;
            case 'vina':
                return ic_vina;
        }

        return null;
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
        const {orders, onSelectItem} = this.props;

        return orders.map(
            (order, i) => (
                <tr key={i}>
                    <td>{i}</td>
                    <td><a>
                        <span
                            className="badge badge-info"
                            onClick={() => {onSelectItem(order)}}
                        >{order.id}</span>
                    </a></td>
                    <td>{order.customer_name}</td>
                    <td>{order.customer_phone}</td>
                    <td><img src={this.getPhoneProviderImage(order.customer_phone)}/></td>

                    {
                        this.renderProductIdItem(order.products)
                    }

                    <td>{order.private_note}</td>
                    <td>14:53 <br/> 29-11</td>
                    <td>14:53 <br/> 29-11</td>
                    <td>Tới bưu cục</td>

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
                <th>Ngày xuất</th>
                <th>Trạng thái</th>
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

export default FmsTransportingTable;