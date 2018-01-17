import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';
import {toReadablePrice} from "../../../utils/price-utils";
import FmsProductDetailModal from "../sub-modals/FmsProductDetailModal";
import FmsSearchDropdown from "../../search-dropdown/FmsSearchDropdown";
import {getProducts} from "../../../api/ProductApi";

class FmsProductsInfoPanel extends Component {

    state = {
        isProductDetailModalShown: false,
        selectedProduct: null,
        productsInStock: [],
        searchQuery: '',
        searchProducts: []
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

    addProduct(product) {
        const {
            products,
            onChangeInput
        } = this.props;

        const newProducts = products.concat([product]);

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

    filterSearchProducts(query = this.state.searchQuery, productsInStock = this.state.productsInStock) {
        const nomalizeQuery = query.toLowerCase().split(' ').join('');

        const searchProducts = productsInStock.filter(
            p => {
                const toSearchable = `${p.id.toLowerCase()}${p.name.toLowerCase().split(' ').join('')}`;
                return toSearchable.indexOf(nomalizeQuery) !== -1;
            }
        );

        this.setState({searchProducts});
    }

    onSearchChange(query) {
        this.filterSearchProducts(query);

        this.setState({searchQuery: query})
    }

    onSelectItem(index) {
        const {
            productsInStock,
            searchProducts,
            searchQuery
        } = this.state;
        const selectedProduct = searchProducts[index];
        selectedProduct.discount = 0;
        selectedProduct.quantity = 1;
        this.addProduct(selectedProduct);

        const newProductsInStock = productsInStock.filter(
            p => p.id !== selectedProduct.id
        );

        this.setState({
            productsInStock: newProductsInStock
        });

        this.filterSearchProducts(searchQuery, newProductsInStock);
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

    getProductsInStock(project) {
        const {products} = this.props;

        getProducts(project.alias)
            .then(ps => {
                const productsInStock = ps.filter(
                    p => !products.find(_p => _p.id === p.id)
                );

                this.setState({
                    productsInStock,
                    searchProducts: productsInStock,
                })
            })
            .catch(err => alert(err.message));
    }

    componentDidMount() {
        const {project} = this.props;
        if (project) this.getProductsInStock(project);
    }

    componentWillReceiveProps(nextProps) {
        const {project} = this.props;
        if (!project || project !== nextProps.project) this.getProductsInStock(nextProps.project);
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
            selectedProduct,
            productsInStock,
            searchProducts
        } = this.state;

        const searchableProducts = searchProducts.map(
            p => (`${p.id} - ${p.name}`)
        );

        return (
            <div className="panel panel-success">
                <div className="panel-heading">
                    Thông tin sản phẩm
                </div>

                <div className="panel-body">
                    <div className="ibox none-margin-bottom">
                        <div className="row">
                            <div className="col-sm-12">
                                <FmsSearchDropdown
                                    className='product-search-dropdown'
                                    placeholder='Tìm và thêm sản phẩm'
                                    items={searchableProducts}
                                    onSearchChange={this.onSearchChange.bind(this)}
                                    onSelectItem={this.onSelectItem.bind(this)}
                                />
                            </div>

                            {/*<div className="col-sm-3">*/}
                                {/*<div className="form-group">*/}
                                    {/*<button className="btn btn-primary full-width">*/}
                                        {/*Thêm sản phẩm*/}
                                    {/*</button>*/}
                                {/*</div>*/}
                            {/*</div>*/}
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
    onChangeInput: propTypes.func,
    project: propTypes.object
};

export default FmsProductsInfoPanel;