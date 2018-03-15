import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';
import {createOrder} from "../../api/OrderApi";
import {getOrderTags} from "../../api/OrderTagApi";
import {toReadablePrice} from "../../utils/price-utils";
import FmsTransportInfoPanel from "./panels/FmsTransportInfoPanel";
import FmsCustomerInfoPanel from "./panels/FmsCustomerInfoPanel";
import FmsProductsInfoPanel from "./panels/FmsProductsInfoPanel";
import FmsNoteInfoPanel from "./panels/FmsNoteInfoPanel";
import FmsOrderTagInfoPanel from "./panels/FmsOrderTagInfoPanel";
import FmsPriceCalculatorPanel from "./panels/FmsPriceCalculatorPanel";
import FmsSourcePostPanel from "./panels/FmsSourcePostPanel";
class FmsCreateOrderModal extends Component {

    state = {
        order: {},
        orderTags: [],
        isLoading: false
    };

    createNewOrder() {
        const {project} = this.props;
        this.setState({isLoading: true});
        let order = this.state.order;

        createOrder(project.alias, order)
            .then(
                () => {
                    this.setState({order: {}, isLoading: false});
                    const shouldUpdated = true;
                    this.props.onClose(shouldUpdated);
                },
                err => {
                    alert(err.message);
                    this.setState({isLoading: false});
                }
            )
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

    onCloseButtonClick() {
        this.setState({order: {}});
        this.props.onClose();
    }

    onChangeInput(refName, newValue = this.refs[refName].value, inputIsArray = false) {
        const newOrder = {...this.state.order};

        if (inputIsArray) {
            refName.forEach((rn, idx) => {
                newOrder[rn] =  newValue[idx];
            });
            this.setState({order: newOrder});
            return;
        }
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
                case 'province':
                newOrder.province = newValue;
                newOrder.district = '';
                newOrder.ward = '';
                break;
            case 'district':
                newOrder.district = newValue;
                newOrder.ward = '';
                break;
            default:
                newOrder[refName] = newValue;
        }
        this.setState({order: newOrder});
    }

    componentDidMount() {
        const {project} = this.props;

        if (project && project.alias) {
            getOrderTags(project.alias)
                .then(
                    orderTags => {
                        this.setState({orderTags});
                    },
                    err => {
                        alert(err.message)
                    }
                )
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.customer !== nextProps.customer && nextProps.customer && nextProps.customer.length > 0) {
            let newOrder = {...this.state.order};
            let c = nextProps.customer[0];
            newOrder.customer_name = c.name;
            newOrder.customer_facebook = `facebook.com/${c.fb_id}`;
            newOrder.customer_phone = (c.phone && c.phone.length > 0) ? c.phone[c.phone.length-1] : '';
            newOrder.customer_id = c._id;
            newOrder.source = nextProps.posts[0];
            this.setState({order: newOrder});
        }
        if (nextProps.isShown && !this.props.isShown) {
            getOrderTags(nextProps.project.alias)
                .then(
                    orderTags => {
                        this.setState({orderTags});
                    },
                    err => {
                        alert(err.message)
                    }
                )
        }
    }

    renderProducts() {
        const {order} = this.state;

        if (Array.isArray(order.products)) {
            return order.products.map(
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
        } else {
            return null;
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
                            isShown={this.props.isShown}
                        />
                    </div>

                    <div className="col-sm-12">
                        <FmsSourcePostPanel
                            posts={this.props.posts}
                            source={order.source}
                            onChangeInput={this.onChangeInput.bind(this)}/>
                    </div>

                    <div className="col-sm-6">
                        <FmsCustomerInfoPanel
                            customer_name={order.customer_name}
                            customer_phone={order.customer_phone}
                            customer_facebook={order.customer_facebook}
                            customer_email={order.customer_email}
                            customer={this.props.customer}
                            onChangeInput={this.onChangeInput.bind(this)}
                        />
                    </div>

                    <div className="col-sm-6">
                        <FmsTransportInfoPanel
                            province={order.province}
                            district={order.district}
                            ward={order.ward}
                            full_address={order.full_address}
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
                            isShown={this.props.isShown}
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

    render() {
        const {
            isShown
        } = this.props;

        const {
            isLoading
        } = this.state;

        return (
            <Modal show={isShown} bsSize="large" backdrop='static' keyboard={false}>
                <div className='order-detail-modal inmodal'>
                    <Modal.Header
                        closeButton={true}
                        onHide={() => {
                            this.setState({order: {}, isLoading: false});
                            this.props.onClose();
                        }}
                    >
                        <h4>Đơn hàng mới</h4>

                    </Modal.Header>

                    {
                        this.renderModalBody()
                    }

                    <Modal.Footer>
                        <button className="btn btn-white"
                                onClick={this.onCloseButtonClick.bind(this)}
                                disabled={isLoading}>Hủy
                        </button>

                        <button className="btn btn-primary"
                                onClick={this.createNewOrder.bind(this)}
                                disabled={isLoading}>Tạo mới
                        </button>
                    </Modal.Footer>

                </div>
            </Modal>
        );
    }
}

FmsCreateOrderModal.propTypes = {
    isShown: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired,
    project: propTypes.object,
    conversation_id: propTypes.string,
    customer: propTypes.array
};

export default FmsCreateOrderModal;
