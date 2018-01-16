import React, {Component} from 'react';
import propTypes from 'prop-types';
import {toReadablePrice} from "../../../utils/price-utils";

class FmsProductsInfoPanel extends Component {

    renderProducts() {
        const {products} = this.props;

        return Array.isArray(products) ?
            products.map(
                (product, i) => (
                    <tr key={i}>
                        <td>{i}</td>
                        <td><a><span className="badge badge-info">{product.id}</span></a></td>
                        <td>{product.name}</td>
                        <td>{toReadablePrice(product.quantity)}</td>
                        <td>{toReadablePrice(product.price)}</td>
                        <td>{toReadablePrice(product.discount)}</td>
                        <td>{toReadablePrice(product.price * product.quantity - product.discount)}</td>
                        <td><i className="fa fa-trash-o clickable"/></td>
                        <td><i className="fa fa-pencil clickable"/></td>
                    </tr>
                )
            )
            : null;
    }

    render() {
        return (
            <div className="panel panel-success">
                <div className="panel-heading">
                    Thông tin sản phẩm
                </div>

                <div className="panel-body row">
                    <div className="col-lg-12">
                        <div className="ibox none-margin-bottom">
                            <div className="row">
                                <div className="col-sm-9">
                                    <div className="form-group">
                                        <input type="text"
                                               value=""
                                               placeholder="Tìm và thêm sản phẩm"
                                               className="form-control"/>
                                    </div>
                                </div>

                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <button className="btn btn-primary full-width">
                                            Thêm sản phẩm
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="table-responsive">
                                <table className="table table-striped">

                                    <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã sản phẩm</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Số lượng</th>
                                        <th>Giá</th>
                                        <th>Giảm giá</th>
                                        <th>Tổng</th>
                                    </tr>
                                    </thead>

                                    <tbody>

                                    {
                                        this.renderProducts()
                                    }


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

FmsProductsInfoPanel.propTypes = {
    products: propTypes.array
};

export default FmsProductsInfoPanel;