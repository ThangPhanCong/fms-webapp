import React, {Component} from "react";
import FmsProductDetailModal from "./modals/FmsProductDetailModal";

class FmsProductTable extends Component {

    state = {
        isShowDetailModal: false
    };

    onCloseModal(shouldReloadData) {
        if (shouldReloadData) {
            this.props.onReloadProducts();
        }

        this.setState({isShowDetailModal: false});
    }

    onOpenModal(selectedProduct) {
        this.setState({isShowDetailModal: true, selectedProduct});
    }

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
                            <td><a>
                                <span className="badge badge-info"
                                      onClick={() => {
                                          this.onOpenModal(product)
                                      }}
                                >
                                    {product.id}
                                    </span>
                            </a></td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.unit}</td>
                            <td>
                                <i className='fa fa-pencil clickable'
                                   onClick={() => {
                                       this.onOpenModal(product)
                                   }}
                                />
                            </td>
                        </tr>
                    )
                )
            }
            </tbody>
        )
    }

    render() {
        const {
            isShowDetailModal,
            selectedProduct
        } = this.state;

        const {
            project
        } = this.props;

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

                <FmsProductDetailModal
                    isShown={isShowDetailModal}
                    onClose={this.onCloseModal.bind(this)}
                    product={selectedProduct}
                    project={project}
                />
            </div>
        )
    }
}

export default FmsProductTable;