import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';
import {toReadablePrice} from "../../../utils/price-utils";

class FmsProductDetailModal extends Component {

    state = {
        updatedProduct: null
    };

    onDeleteProduct() {
        const allowDelete = confirm('Bạn có chắc chắn muốn xóa sản phẩm này?');
        if (!allowDelete) return;
        const action = 'delete';
        const {onClose} = this.props;
        const {updatedProduct} = this.state;

        onClose(action, updatedProduct);
    }

    onUpdateProduct() {
        const action = 'update';
        const {onClose} = this.props;
        const {updatedProduct} = this.state;

        onClose(action, updatedProduct);
    }

    onChangeInput(refName, newValue = this.refs[refName].value) {
        const {updatedProduct} = this.state;
        const newProduct = {
            ...updatedProduct,
            [refName]: newValue
        };

        this.setState({updatedProduct: newProduct});
    }

    calculateTotalPrice() {
        const {updatedProduct} = this.state;
        const {
            quantity = 0,
            price = 0,
            discount = 0
        } = updatedProduct;

        return (quantity * price) - discount;
    }

    componentDidMount() {
        const {product} = this.props;

        if (product) {
            this.setState({updatedProduct: product});
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.product) {
            this.setState({updatedProduct: nextProps.product});
        }
    }

    renderModalBody() {
        const {updatedProduct} = this.state;

        return (
            <Modal.Body>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="control-label">Mã</label>
                        </div>
                        <div className="col-sm-9">
                            <input type="text"
                                   className="form-control"
                                   disabled
                                   ref='id'
                                   value={updatedProduct.id}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="control-label">Tên</label>
                        </div>
                        <div className="col-sm-9">
                            <input type="text"
                                   className="form-control"
                                   disabled
                                   ref='name'
                                   value={updatedProduct.name}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="control-label">Giá</label>
                        </div>
                        <div className="col-sm-9">
                            <input type="text"
                                   className="form-control"
                                   ref='price'
                                   disabled
                                   value={toReadablePrice(updatedProduct.price)}
                                   onChange={
                                       () => this.onChangeInput('price')
                                   }
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="control-label">Số lượng</label>
                        </div>
                        <div className="col-sm-9">
                            <input type="number"
                                   className="form-control"
                                   ref='quantity'
                                   value={updatedProduct.quantity}
                                   onChange={
                                       () => this.onChangeInput('quantity')
                                   }
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="control-label">Giảm giá</label>
                        </div>
                        <div className="col-sm-9">
                            <input type="number"
                                   className="form-control"
                                   ref='discount'
                                   value={updatedProduct.discount}
                                   onChange={
                                       () => this.onChangeInput('discount')
                                   }
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="control-label">Tổng cộng</label>
                        </div>
                        <div className="col-sm-9">
                            <input type="text"
                                   className="form-control"
                                   disabled
                                   value={toReadablePrice(this.calculateTotalPrice())}
                            />
                        </div>
                    </div>
                </div>

            </Modal.Body>
        )
    }

    renderModalHeader() {
        const {updatedProduct} = this.state;

        return (
            <Modal.Header
                closeButton={true}
                onHide={() => this.props.onClose()}
            >
                <h4 className='header-title'>Sản phẩm #{updatedProduct.id}</h4>
            </Modal.Header>
        )
    }

    renderModalFooter() {
        return (
            <Modal.Footer>
                <button
                    className='btn btn-outline btn-danger pull-left'
                    onClick={this.onDeleteProduct.bind(this)}
                >
                    Xóa
                </button>

                <button
                    className='btn btn-white'
                    onClick={() => this.props.onClose()}
                >
                    Hủy
                </button>

                <button
                    className='btn btn-primary'
                    onClick={this.onUpdateProduct.bind(this)}
                >
                    Cập nhật
                </button>
            </Modal.Footer>
        )
    }

    render() {
        const {isShown} = this.props;
        const {updatedProduct} = this.state;

        if (!updatedProduct) return null;

        return (
            <Modal
                bsClass='sub-modal-1'
                show={isShown}
                backdrop='static' keyboard={false}>
                <div className="inmodal order-detail-modal">
                    {
                        this.renderModalHeader()
                    }

                    {
                        this.renderModalBody()
                    }

                    {
                        this.renderModalFooter()
                    }
                </div>
            </Modal>
        )
    }
}

FmsProductDetailModal.propTypes = {
    isShown: propTypes.bool,
    onClose: propTypes.func,
    product: propTypes.object
};

export default FmsProductDetailModal;