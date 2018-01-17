import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';
import {deleteOrder, updateOrder, createOrder} from "api/OrderApi";
import {cloneDiff} from "utils/object-utils";
import {getOrderTags} from "api/OrderTagApi";
import {toReadablePrice} from "utils/price-utils";
import {typesModal} from "./config";
import FmsTransportInfoPanel from "./panels/FmsTransportInfoPanel";
import FmsCustomerInfoPanel from "./panels/FmsCustomerInfoPanel";
import FmsProductsInfoPanel from "./panels/FmsProductsInfoPanel";
import FmsNoteInfoPanel from "./panels/FmsNoteInfoPanel";
import FmsOrderTagInfoPanel from "./panels/FmsOrderTagInfoPanel";
import FmsPriceCalculatorPanel from "./panels/FmsPriceCalculatorPanel";

class FmsOrderDetailModal extends Component {

    state = {
        order: {},
        orderTags: [],
        isLoading: false,
        config: {}
    };

    updateOrder() {
        const {project} = this.props;
        const diffOrder = cloneDiff({...this.props.order}, {...this.state.order});
        diffOrder._id = this.props.order._id;

        // if has no different => do nothing
        if (Object.keys(diffOrder).length === 1) {
            console.log('order has no different');
            this.props.onClose();
            return;
        }

        console.log('order diff', diffOrder);

        this.setState({isLoading: true});

        updateOrder(project.alias, diffOrder)
            .then(order => {
                this.props.onClose(order);
            })
            .catch(err => {
                alert(err.message);
                this.setState({isLoading: false})
            })
    }

    changeStatusOrder() {
        const allowExport = confirm('Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng này?');
        if (!allowExport) return;

        const {project} = this.props;
        const diffOrder = cloneDiff({...this.props.order}, {...this.state.order});
        diffOrder._id = this.props.order._id;
        if (this.state.config.nextStatus !== '') {
            diffOrder.status = this.state.config.nextStatus;
        }

        console.log('order diff', diffOrder);

        this.setState({isLoading: true});

        updateOrder(project.alias, diffOrder)
            .then(order => {
                this.props.onClose(order);
            })
            .catch(err => {
                alert(err.message);
                this.setState({isLoading: false})
            })
    }

    onDeleteOrder() {
        const allowDelete = confirm('Bạn có chắc chắn muốn xóa đơn hàng này?');
        if (!allowDelete) return;

        const {project} = this.props;
        this.setState({isLoading: true});

        deleteOrder(project.alias, this.state.order)
            .then(
                () => {
                    const shouldUpdated = true;
                    this.props.onClose(shouldUpdated);
                },
                err => {
                    alert(err.message);
                }
            )
            .then(() => this.setState({isLoading: false}));
    }

    onCloseButtonClick() {
        this.props.onClose();
    }

    calculateProductsPrice() {
        const {order} = this.state;
        if (order && Array.isArray(order.products)) {
            return order.products.reduce((totalPrice, product) => {
                return totalPrice + (product.price * product.quantity - product.discount);
            }, 0)
        } else {
            return 0;
        }
    }

    calculateTotalPrice() {
        const {order} = this.state;
        if (order) {
            const transport_fee = order.transport_fee || 0;
            const productsFee = this.calculateProductsPrice();

            return parseInt(transport_fee) + productsFee;
        } else {
            return 0;
        }
    }


    onChangeInput(refName, newValue = this.refs[refName].value) {
        const newOrder = {...this.state.order};

        switch (refName) {
            case 'order_tag':
                newOrder.order_tag = newValue;
                break;
            case 'is_pay':
                newOrder.is_pay = newValue;
                break;
            case 'products':
                newOrder.products = newValue;
                break;
            default:
                newOrder[refName] = newValue;
        }

        this.setState({order: newOrder});
    }

    componentDidMount() {
        const {order, typeModal} = this.props;
        let config = typesModal[typeModal];
        if (!order) {
            this.setState({config});
        } else {
            this.setState({order, config});
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.order) {
            this.setState({order: nextProps.order, isLoading: false, config: typesModal[nextProps.typeModal]});
        }
    }

    renderModalBody() {
        const {order} = this.state;
        const {project} = this.props;

        return (
            <Modal.Body>
                <div className='row'>
                    <div className='col-sm-12'>
                        <FmsNoteInfoPanel
                            private_note={order.private_note}
                            onChangeInput={this.onChangeInput.bind(this)}
                        />
                    </div>

                    <div className='col-sm-12'>
                        <FmsOrderTagInfoPanel
                            order_tag={order.order_tag}
                            project={project}
                            onChangeInput={this.onChangeInput.bind(this)}
                        />
                    </div>

                    <div className="col-sm-6">
                        <FmsCustomerInfoPanel
                            customer_name={order.customer_name}
                            customer_phone={order.customer_phone}
                            customer_facebook={order.customer_facebook}
                            onChangeInput={this.onChangeInput.bind(this)}
                        />
                    </div>

                    <div className="col-sm-6">
                        <FmsTransportInfoPanel
                            transport_address={order.transport_address}
                            transport_method={order.transport_method}
                            transport_fee={order.transport_fee}
                            onChangeInput={this.onChangeInput.bind(this)}
                        />
                    </div>

                    <div className="col-sm-12">
                        <FmsProductsInfoPanel
                            project={project}
                            products={order.products}
                            onChangeInput={this.onChangeInput.bind(this)}
                        />
                    </div>

                    <div className="col-sm-12">
                        <FmsPriceCalculatorPanel
                            productPrice={this.calculateProductsPrice()}
                            totalPrice={this.calculateTotalPrice()}
                            transport_fee={parseInt(order.transport_fee || 0)}
                            is_pay={order.is_pay}
                            onChangeInput={this.onChangeInput.bind(this)}
                        />
                    </div>


                </div>

            </Modal.Body>
        )
    }

    renderModalHeader() {
        return (
            <Modal.Header
                closeButton={true}
                onHide={() => {
                    this.props.onClose();
                }}
            >
                <h4>Đơn hàng #{this.state.order.id}</h4>

                <div>
                    <small className="font-bold">Ngày tạo: <strong>12:49, 24-12-2017</strong></small>
                </div>
                <div>
                    <small className="font-bold">Nguồn đơn: <a>fb.com/my-shop/posts/4128912312412</a></small>
                </div>

            </Modal.Header>
        )
    }

    renderModalFooter() {
        const {
            isLoading
        } = this.state;

        return (
            <Modal.Footer>
                <button className="btn btn-danger btn-outline pull-left"
                        onClick={this.onDeleteOrder.bind(this)}
                        disabled={isLoading}>Xóa
                </button>

                <button className="btn btn-white"
                        onClick={this.onCloseButtonClick.bind(this)}
                        disabled={isLoading}>Hủy
                </button>

                <button className="btn btn-primary"
                        onClick={() => this.updateOrder()}
                        disabled={isLoading}>Cập nhật
                </button>
            </Modal.Footer>
        )
    }

    render() {
        const {isShown} = this.props;

        return (
            <Modal show={isShown} bsSize="large" backdrop='static' keyboard={false}>
                <div className='order-detail-modal inmodal'>
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
        );
    }
}

FmsOrderDetailModal.propTypes = {
    isShown: propTypes.bool.isRequired,
    typeModal: propTypes.number.isRequired,
    onClose: propTypes.func.isRequired,
    project: propTypes.object,
    order: propTypes.object
};

export default FmsOrderDetailModal;
