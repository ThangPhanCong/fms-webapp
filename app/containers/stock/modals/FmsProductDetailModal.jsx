import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';
import {deleteProduct, updateProduct} from "../../../api/ProductApi";

class FmsProductDetailModal extends Component {

    state = {
        originalId: '',
        product: {},
        isLoading: false
    };

    onUpdateProduct() {
        const {project} = this.props;
        const {product} = this.state;

        this.setState({isLoading: true});

        updateProduct(project.alias, product)
            .then(product => {
                const shouldUpdate = true;
                this.closeModal(shouldUpdate);
            })
            .catch(err => {
                alert(err.message);
                this.setState({isLoading: false});
            })
    }

    onDeleteProduct() {
        const {project} = this.props;
        const {product} = this.state;

        this.setState({isLoading: true});

        deleteProduct(project.alias, product)
            .then(product => {
                const shouldUpdate = true;
                this.closeModal(shouldUpdate);
            })
    }

    onCloseButtonClick() {
        this.closeModal();
    }

    closeModal(shouldUpdate) {
        this.setState({product: {}, isLoading: false});
        this.props.onClose(shouldUpdate);
    }

    onChangeInput(refName) {
        const newValue = this.refs[refName].value;
        const newProduct = {...this.state.product};
        newProduct[refName] = newValue;

        this.setState({product: newProduct});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.product) {
            this.setState({product: nextProps.product, originalId: nextProps.product.id});
        }
    }

    render() {
        const {
            isShown
        } = this.props;

        const {
            isLoading,
            product,
            originalId
        } = this.state;

        return (
            <Modal show={isShown} backdrop='static' keyboard={false}>
                <div className='inmodal'>
                    <Modal.Header
                        closeButton={true}
                        onHide={this.onCloseButtonClick.bind(this)}
                    >
                        <h4 className='modal-title'>Sản phẩm #{originalId}</h4>

                    </Modal.Header>

                    <Modal.Body>
                        <div className="form-group row">
                            <div className="col-sm-3">
                                <label className="control-label">Mã</label>
                            </div>
                            <div className="col-sm-9">
                                <input type="text"
                                       className="form-control"
                                       ref='id'
                                       value={product.id || ''}
                                       onChange={() => {
                                           this.onChangeInput('id')
                                       }}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-3">
                                <label className="control-label">Tên</label>
                            </div>
                            <div className="col-sm-9">
                                <input type="text"
                                       className="form-control"
                                       ref='name'
                                       value={product.name || ''}
                                       onChange={() => {
                                           this.onChangeInput('name')
                                       }}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-3">
                                <label className="control-label">Giá bán ra</label>
                            </div>
                            <div className="col-sm-9">
                                <input type="text"
                                       className="form-control"
                                       ref='price'
                                       value={product.price || ''}
                                       onChange={() => {
                                           this.onChangeInput('price')
                                       }}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-3">
                                <label className="control-label">Số lượng</label>
                            </div>
                            <div className="col-sm-9">
                                <input type="text"
                                       className="form-control"
                                       ref='quantity'
                                       value={product.quantity || ''}
                                       onChange={() => {
                                           this.onChangeInput('quantity')
                                       }}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-3">
                                <label className="control-label">Đơn vị tính</label>
                            </div>
                            <div className="col-sm-9">
                                <input type="text"
                                       className="form-control"
                                       ref='unit'
                                       value={product.unit || ''}
                                       onChange={() => {
                                           this.onChangeInput('unit')
                                       }}
                                />
                            </div>
                        </div>

                    </Modal.Body>

                    <Modal.Footer>
                        <button
                            className='btn btn-danger pull-left btn-outline'
                            onClick={this.onDeleteProduct.bind(this)}
                            disabled={isLoading}>Xóa
                        </button>

                        <button
                            className='btn btn-white'
                            onClick={this.onCloseButtonClick.bind(this)}
                            disabled={isLoading}>Hủy
                        </button>

                        <button
                            className='btn btn-primary'
                            onClick={this.onUpdateProduct.bind(this)}
                            disabled={isLoading}>Cập nhật
                        </button>
                    </Modal.Footer>
                </div>
            </Modal>
        );
    }
}

FmsProductDetailModal.propTypes = {
    isShown: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired
};

export default FmsProductDetailModal;
