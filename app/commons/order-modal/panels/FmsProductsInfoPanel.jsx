import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';
import {toReadablePrice} from "../../../utils/price-utils";
import FmsProductDetailModal from "../sub-modals/FmsProductDetailModal";

class FmsProductsInfoPanel extends Component {

    state = {
        isProductDetailModalShown: false,
        selectedProduct: null
    };

    updateProducts(product) {
        const {
            products,
            onChangeInput
        } = this.props;

        const newProducts = products.map(
            p => (
                p.id === product.id
                    ? product
                    : p
            )
        );

        onChangeInput('products', newProducts);
    }

    deleteProduct(product) {
        const {
            products,
            onChangeInput
        } = this.props;

        const filteredProducts = products.filter(
            p => (p.id !== product.id)
        );

        onChangeInput('products', filteredProducts);
    }

    onDeleteProductClick(product) {
        const allowDelete = confirm('Bạn có chắc chắn muốn xóa sản phẩm này?');
        if (allowDelete) this.deleteProduct(product);
    }

    onOpenProductDetailModal(selectedProduct) {
        this.setState({
            isProductDetailModalShown: true,
            selectedProduct
        });
    }

    onCloseProductDetailModal(action = '', updatedProduct) {
        switch (action) {
            case 'update':
                this.updateProducts(updatedProduct);
                break;
            case 'delete':
                this.deleteProduct(updatedProduct);
                break;
        }

        this.setState({isProductDetailModalShown: false});
    }

    renderProducts() {
        const {products} = this.props;

        return Array.isArray(products) ?
            products.map(
                (product, i) => (
                    <tr key={product.id}>
                        <td>{i}</td>
                        <td><a><span
                            className="badge badge-info"
                            onClick={() => this.onOpenProductDetailModal(product)}
                        >{product.id}</span></a></td>
                        <td>{product.name}</td>
                        <td>{toReadablePrice(product.quantity)}</td>
                        <td>{toReadablePrice(product.price)}</td>
                        <td>{toReadablePrice(product.discount)}</td>
                        <td>{toReadablePrice(product.price * product.quantity - product.discount)}</td>
                        <td><i
                            className="fa fa-trash-o clickable"
                            onClick={() => this.onDeleteProductClick(product)}
                        /></td>
                        <td><i
                            className="fa fa-pencil clickable"
                            onClick={() => this.onOpenProductDetailModal(product)}
                        /></td>
                    </tr>
                )
            )
            : null;
    }

    render() {
        const {
            isProductDetailModalShown,
            selectedProduct
        } = this.state;

        return (
            <div className="panel panel-success">
                <div className="panel-heading">
                    Thông tin sản phẩm
                </div>

                <div className="panel-body">
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

                <FmsProductDetailModal
                    isShown={isProductDetailModalShown}
                    onClose={this.onCloseProductDetailModal.bind(this)}
                    product={selectedProduct}
                />
            </div>
        )
    }
}

FmsProductsInfoPanel.propTypes = {
    products: propTypes.array,
    onChangeInput: propTypes.func
};

export default FmsProductsInfoPanel;