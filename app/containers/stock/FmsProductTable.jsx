import React, {Component} from "react";

class FmsProductTable extends Component {

    renderTableHeader() {
        return (
            <thead>
            <tr>
                <th>STT</th>
                <th>Mã sản phẩm</th>
                <th>Tên sản phẩm</th>
                <th>Giá bán ra</th>
                <th>Số lượng</th>
                <th>Đơn vị tính</th>
            </tr>
            </thead>
        )
    }

    renderTableBody() {
        const {products} = this.props;

        return (
            <tbody>
            {
                products.map(
                    (product, i) => (
                        <tr key={i}>
                            <td>{i}</td>
                            <td><a><span className="badge badge-info">{product.id}</span></a></td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.unit}</td>
                            <td><i className='fa fa-pencil clickable'/></td>
                        </tr>
                    )
                )
            }
            </tbody>
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

export default FmsProductTable;