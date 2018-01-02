import React, {Component} from "react";

class FmsNewOrderTable extends Component {

    renderTabelBody() {
        return (
            <tbody>
            <tr>
                <td>1</td>
                <td><a href="#"><span className="badge badge-info">DH12501</span></a></td>
                <td>A Vinh</td>
                <td>0983380972</td>
                <td><img src="./img/ic-viettel.png"/></td>
                <td>HB40123 <br/> YH40231</td>
                <td>a đang họp. lát gọi lại, anh chọn rồi anh alo cho</td>
                <td>14:53 <br/> 29-11</td>
                <td className="color-tag">
                    <span className="label label-gray tag-label">Chờ quyết định</span>
                </td>
            </tr>
            </tbody>
        )
    }

    renderTabelHeader() {
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
                <th>Đánh dấu</th>
            </tr>
            </thead>
        )
    }

    render () {
        return (
            <div className="table-responsive">
                <table className="table table-striped">
                    {
                        this.renderTabelHeader()
                    }

                    {
                        this.renderTabelBody()
                    }
                </table>
            </div>
        )
    }
}

export default FmsNewOrderTable;