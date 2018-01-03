import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';
import {createNewProduct, getDefaultProductId} from "../../../api/ProductApi";
import {noti} from "../../notification/NotificationService";

class FmsCreateNewProductModal extends Component {

    state = {
        product: {},
        isLoading: false
    };

    onCreateProduct() {
        const {project} = this.props;
        const {product} = this.state;
        this.setState({isLoading: true});

        createNewProduct(project.alias, product)
            .then(product => {
                const shouldUpdate = true;
                this.closeModal(shouldUpdate);
            })
            .catch(err => {
                alert(err.message);
                this.setState({isLoading: false});
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

    updateDefaultProductId() {
        const {project} = this.props;

        getDefaultProductId(project.alias)
            .then(({id}) => {
                this.setState({product: {id}});
            })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isShown) {
            this.updateDefaultProductId();
        }
    }

    render() {
        const {
            isShown
        } = this.props;

        const {
            isLoading,
            product
        } = this.state;

        return (
            <Modal show={isShown} backdrop='static' keyboard={false}>
                <div className='inmodal'>
                    <Modal.Header
                        closeButton={true}
                        onHide={this.onCloseButtonClick.bind(this)}
                    >
                        <h4 className='modal-title'>Sản phẩm mới</h4>

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
                            className='btn btn-white'
                            onClick={this.onCloseButtonClick.bind(this)}
                            disabled={isLoading}>Hủy
                        </button>

                        <button
                            className='btn btn-primary'
                            onClick={this.onCreateProduct.bind(this)}
                            disabled={isLoading}>Thêm mới
                        </button>
                    </Modal.Footer>
                </div>
            </Modal>
        );
    }
}

FmsCreateNewProductModal.propTypes = {
    isShown: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired
};

export default FmsCreateNewProductModal;
