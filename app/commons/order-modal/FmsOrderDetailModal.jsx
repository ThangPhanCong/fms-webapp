import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';
import {deleteOrder, updateOrder, createOrder} from "api/OrderApi";
import {cloneDiff} from "utils/object-utils";
import {getOrderTags} from "api/OrderTagApi";
import {toReadablePrice} from "utils/price-utils";
import {getConfigByName, typesModal} from "./config";
import FmsTransportInfoPanel from "./panels/FmsTransportInfoPanel";
import FmsCustomerInfoPanel from "./panels/FmsCustomerInfoPanel";
import FmsProductsInfoPanel from "./panels/FmsProductsInfoPanel";
import FmsNoteInfoPanel from "./panels/FmsNoteInfoPanel";
import FmsOrderTagInfoPanel from "./panels/FmsOrderTagInfoPanel";
import FmsPriceCalculatorPanel from "./panels/FmsPriceCalculatorPanel";
import FmsConfirmSaveOrderModal from "./sub-modals/FmsConfirmSaveOrderModal";
import {saveSuccessOrder, saveFailureOrder, ORDER_STATUS} from "../../api/OrderApi";
import {cloneDeep} from "../../utils/object-utils";

class FmsOrderDetailModal extends Component {

    state = {
        order: {},
        orderTags: [],
        isLoading: false,
        config: {},
        isSaveOrderModalShown: false
    };

    updateOrder() {
        const {project} = this.props;
        const diffOrder = cloneDiff({...this.props.order}, {...this.state.order});
        diffOrder._id = this.props.order._id;

        // if has no different => do nothing
        if (Object.keys(diffOrder).length === 1) {
            console.log('order has no different', diffOrder);
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

    onExportOrderButtonClick() {
        const allowExport = confirm('Bạn có chắc chắn muốn yêu cầu xuất đơn hàng này?');
        if (!allowExport) return;

        const {project} = this.props;
        const diffOrder = cloneDiff({...this.props.order}, {...this.state.order});
        diffOrder._id = this.props.order._id;
        diffOrder.status = ORDER_STATUS.EXPORTED_ORDER;

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

    onTransportingOrderButtonClick() {
        const allowTransporting = confirm('Bạn có chắc chắn muốn chuyển sang mục đang vận chuyển?');
        if (!allowTransporting) return;

        const {project} = this.props;
        const diffOrder = cloneDiff({...this.props.order}, {...this.state.order});
        diffOrder._id = this.props.order._id;
        diffOrder.status = ORDER_STATUS.TRANSPORTING;

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

    onShowSaveOrderModal() {
        this.setState({
            isSaveOrderModalShown: true
        })
    }

    async onSaveOrder(status) {
        console.log(status);
        this.setState({
            isSaveOrderModalShown: false
        });

        const {project} = this.props;
        this.setState({isLoading: true});
        try {
            if (status === 'success') {
                await saveSuccessOrder(this.state.order);
            } else if (status === 'failure') {
                await saveFailureOrder(this.state.order);
            }

            const shouldUpdated = true;
            this.props.onClose(shouldUpdated);
        } catch (err) {
            alert(err.message);
        }
        this.setState({isLoading: false});
    }

    onCloseSaveOrderModal() {
        this.setState({
            isSaveOrderModalShown: false
        })
    }

    onCloseButtonClick() {
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
        const {order, typeModalName} = this.props;
        const config = getConfigByName(typeModalName || 'ALL_ORDER');

        if (!order) {
            this.setState({config});
        } else {
            this.setState({order: cloneDeep(order), config});
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.order) {
            this.setState({order: cloneDeep(nextProps.order), isLoading: false});
        }
    }

    renderModalBody() {
        const {order, config} = this.state;
        const {project} = this.props;

        return (
            <Modal.Body>
                <div className='row'>
                    <div className='col-sm-12'>
                        <FmsNoteInfoPanel
                            private_note={order.private_note}
                            onChangeInput={this.onChangeInput.bind(this)}
                            disabled={!config.note_info}
                        />
                    </div>

                    <div className='col-sm-12'>
                        <FmsOrderTagInfoPanel
                            order_tag={order.order_tag}
                            project={project}
                            onChangeInput={this.onChangeInput.bind(this)}
                            disabled={!config.order_tag_info}
                        />
                    </div>

                    <div className="col-sm-6">
                        <FmsCustomerInfoPanel
                            customer_name={order.customer_name}
                            customer_phone={order.customer_phone}
                            customer_facebook={order.customer_facebook}
                            customer_email={order.customer_email}
                            onChangeInput={this.onChangeInput.bind(this)}
                            customer={this.props.customer}
                            disabled={!config.customer_info}
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
                            disabled={!config.transport_info}
                        />
                    </div>

                    <div className="col-sm-12">
                        <FmsProductsInfoPanel
                            project={project}
                            products={order.products}
                            onChangeInput={this.onChangeInput.bind(this)}
                            disabled={!config.products_info}
                        />
                    </div>

                    <div className="col-sm-12">
                        <FmsPriceCalculatorPanel
                            productPrice={this.calculateProductsPrice()}
                            totalPrice={this.calculateTotalPrice()}
                            transport_fee={parseInt(order.transport_fee || 0)}
                            is_pay={order.is_pay}
                            onChangeInput={this.onChangeInput.bind(this)}
                            disabled={!config.price_calculator}
                        />
                    </div>

                </div>

            </Modal.Body>
        )
    }

    renderModalHeader() {
        const {order} = this.state;
        const date = new Date(order.created_time);
        let time = date.toLocaleTimeString().split(':');
        return (
            <Modal.Header
                closeButton={true}
                onHide={() => {
                    this.props.onClose();
                }}
            >
                <h4>Đơn hàng #{order.id}
                    {
                        order.order_tag ?
                            (
                                <span> {'  '}
                                    <span
                                        className="label tag-label"
                                        style={{
                                            backgroundColor: order.order_tag.color,
                                            color: 'white',
                                            paddingBottom: '0'
                                        }}
                                    >{order.order_tag.name}</span>
                            </span>
                            )
                            : null
                    }
                </h4>

                <div>
                    <small className="font-bold">Ngày tạo:
                        <strong> {time[0] + ':' + time[1]}, {date.toLocaleDateString()}</strong>
                    </small>
                </div>
                <div>
                    <small className="font-bold">Nguồn đơn: <a>fb.com/my-shop/posts/4128912312412</a></small>
                </div>

            </Modal.Header>
        )
    }

    renderModalFooter() {
        const {
            isLoading,
            config,
            isSaveOrderModalShown,
            order
        } = this.state;

        return (
            <Modal.Footer>
                {
                    config.delete_btn ?
                        <button className="btn btn-danger btn-outline pull-left"
                                onClick={this.onDeleteOrder.bind(this)}
                                disabled={isLoading}>Xóa
                        </button>
                        : null
                }

                {
                    config.save_btn ?
                        <button className="btn btn-success btn-outline pull-left"
                                onClick={this.onShowSaveOrderModal.bind(this)}
                                disabled={isLoading}>Lưu trữ
                        </button>
                        : null
                }

                <button className="btn btn-white"
                        onClick={this.onCloseButtonClick.bind(this)}
                        disabled={isLoading}>Hủy
                </button>

                {
                    config.export_btn ?
                        <button className="btn btn-success"
                                onClick={this.onExportOrderButtonClick.bind(this)}
                                disabled={isLoading}>Yêu cầu xuất
                        </button>
                        : null
                }

                {
                    config.transporting_btn ?
                        <button className="btn btn-success"
                                onClick={this.onTransportingOrderButtonClick.bind(this)}
                                disabled={isLoading}>Đang vận chuyển
                        </button>
                        : null
                }

                {
                    config.update_btn ?
                        <button className="btn btn-primary"
                                onClick={() => this.updateOrder()}
                                disabled={isLoading}>Cập nhật
                        </button>
                        : null
                }

                <FmsConfirmSaveOrderModal
                    isShown={isSaveOrderModalShown}
                    onClose={this.onCloseSaveOrderModal.bind(this)}
                    onSaveOrder={this.onSaveOrder.bind(this)}
                />
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
    typeModalName: propTypes.string,
    onClose: propTypes.func.isRequired,
    project: propTypes.object,
    order: propTypes.object
};

export default FmsOrderDetailModal;
