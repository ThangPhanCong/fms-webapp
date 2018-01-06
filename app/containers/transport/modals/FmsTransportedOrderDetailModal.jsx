import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';
import FmsCheckbox from 'commons/FmsCheckbox/FmsCheckbox';
import {deleteOrder, orderTransportedOrder, orderTransportingOrder} from "../../../api/OrderApi";
import {cloneDiff} from "../../../utils/object-utils";
import {getOrderTags} from "../../../api/OrderTagApi";

class FmsTransportedOrderDetailModal extends Component {

    state = {
        order: {},
        orderTags: [],
        isLoading: false
    };

    // onDeleteOrder() {
    //     const allowDelete = confirm('Bạn có chắc chắn muốn xóa đơn hàng này?');
    //     if (!allowDelete) return;
    //
    //     const {project} = this.props;
    //     this.setState({isLoading: true});
    //
    //     deleteOrder(project.alias, this.state.order)
    //         .then(
    //             () => {
    //                 const shouldUpdated = true;
    //                 this.props.onClose(shouldUpdated);
    //             },
    //             err => {
    //                 alert(err.message);
    //             }
    //         )
    //         .then(() => this.setState({isLoading: false}));
    // }

    orderTransporting() {
        const allowExport = confirm('Bạn có chắc chắn muốn yêu cầu vận chuyển đơn hàng này?');
            if (!allowExport) return;

        const {project} = this.props;
        const diffOrder = cloneDiff({...this.props.order}, {...this.state.order});
        diffOrder._id = this.props.order._id;

        console.log('order diff', diffOrder);

        this.setState({isLoading: true});

        orderTransportingOrder(project.alias, diffOrder)
            .then(order => {
                this.props.onClose(order);
            })
            .catch(err => {
                alert(err.message);
                this.setState({isLoading: false})
            })
    }

    onCloseButtonClick() {
        this.props.onClose();
    }

    onChangeInput(refName) {
        const newValue = this.refs[refName].value;
        const newOrder = {...this.state.order};

        switch (refName) {
            case 'order_tag':
                newOrder.order_tag = newValue;
                break;
            default:
                newOrder[refName] = newValue;
        }

        this.setState({order: newOrder});
    }

    updateOrderTags(project) {
        getOrderTags(project.alias)
            .then(
                orderTags => {
                    const noneTag = {_id: 'none', name: ''};
                    orderTags.unshift(noneTag);
                    this.setState({orderTags});
                },
                err => {
                    alert(err.message)
                }
            )
            .catch(err => alert(err.message));
    }

    componentDidMount() {
        const {order, project} = this.props;
        this.setState({order});

        if (project) {
            this.updateOrderTags(project);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.order) {
            this.setState({order: nextProps.order, isLoading: false});
        }

        if (nextProps.project !== this.props.project) {
            this.updateOrderTags(nextProps.project);
        }
    }

    renderProducts() {
        return (
            <tr>
                <td>1</td>
                <td><a><span className="badge badge-info">SP12501</span></a>
                </td>
                <td>Kính Mắt Cao Cấp C2</td>
                <td>2</td>
                <td>40.000đ</td>
                <td>0đ</td>
                <td>80.000đ</td>
            </tr>
        )
    }

    renderModalBody() {
        const {order, orderTags} = this.state;

        return (
            <Modal.Body>

                <div className="row">

                    <div className="col-sm-12">

                        <div className="form-group row">
                            <div className="col-sm-3">
                                <label className="control-label">Ghi chú nội bộ</label>
                            </div>
                            <div className="col-sm-9">
                                <input className="form-control"
                                       type='text'
                                       disabled
                                       ref='private_note'
                                       value={order.private_note || ''}
                                       onChange={() => {
                                           this.onChangeInput('private_note')
                                       }}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-3">
                                <label className="control-label">Đánh dấu</label>
                            </div>
                            <div className="col-sm-9 color-tag">
                                <select className="form-control"
                                        disabled
                                        ref='order_tag'
                                        value={
                                            ((order) => {
                                                if (typeof order.order_tag === 'string') {
                                                    return order.order_tag;
                                                } else if (order.order_tag) {
                                                    return order.order_tag._id;
                                                } else {
                                                    return '';
                                                }
                                            })(order)
                                        }
                                        onChange={() => {
                                            this.onChangeInput('order_tag')
                                        }}
                                >
                                    {
                                        orderTags.map(
                                            (tag, i) => (
                                                <option key={i} value={tag._id}>{tag.name}</option>
                                            )
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                Thông tin khách hàng
                            </div>
                            <div className="panel-body">
                                <div className="form-group row">
                                    <div className="col-sm-3">
                                        <label className="control-label">Tên</label>
                                    </div>
                                    <div className="col-sm-9">
                                        <input type="text"
                                               className="form-control"
                                               disabled
                                               ref='customer_name'
                                               value={order.customer_name || ''}
                                               onChange={() => {
                                                   this.onChangeInput('customer_name')
                                               }}
                                        />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-sm-3">
                                        <label className="control-label">Điện thoại</label>
                                    </div>
                                    <div className="col-sm-9">
                                        <input type="text"
                                               className="form-control"
                                               disabled
                                               ref='customer_phone'
                                               value={order.customer_phone || ''}
                                               onChange={() => {
                                                   this.onChangeInput('customer_phone')
                                               }}
                                        />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-sm-3">
                                        <label className="control-label">Facebook</label>
                                    </div>
                                    <div className="col-sm-9">
                                        <input type="text"
                                               className="form-control"
                                               disabled
                                               ref='customer_facebook'
                                               value={order.customer_facebook || ''}
                                               onChange={() => {
                                                   this.onChangeInput('customer_facebook')
                                               }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="panel panel-success">
                            <div className="panel-heading">
                                Thông tin vận chuyển
                            </div>
                            <div className="panel-body">
                                <div className="form-group row">
                                    <div className="col-sm-4">
                                        <label className="control-label">Địa chỉ nhận</label>
                                    </div>
                                    <div className="col-sm-8">
                                        <input type="text"
                                               className="form-control"
                                               disabled
                                               ref='transport_address'
                                               value={order.transport_address || ''}
                                               onChange={() => {
                                                   this.onChangeInput('transport_address')
                                               }}
                                        />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-sm-4">
                                        <label className="control-label">Phương thức</label>
                                    </div>
                                    <div className="col-sm-8">
                                        <select className="form-control"
                                                ref='transport_method'
                                                disabled
                                                value={order.transport_method || ''}
                                                onChange={() => {
                                                    this.onChangeInput('transport_method')
                                                }}
                                        >
                                            <option value="" defaultValue/>
                                            <option value="TONG_BUU_DIEN">Tổng bưu điện</option>
                                            <option value="VIETTEL_POST">Viettel Post</option>
                                            <option value="EMS">EMS</option>
                                            <option value="SHOPEE">Shopee</option>
                                            <option value="SELF">Tự vận chuyển</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-sm-4">
                                        <label className="control-label">Phí</label>
                                    </div>
                                    <div className="col-sm-8">
                                        <input type="text"
                                               className="form-control"
                                               disabled
                                               ref='transport_fee'
                                               value={order.transport_fee || ''}
                                               onChange={() => {
                                                   this.onChangeInput('transport_fee')
                                               }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12">
                        <div className="panel panel-success">
                            <div className="panel-heading">
                                Thông tin sản phẩm
                            </div>

                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="ibox none-margin-bottom">
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
                        </div>
                    </div>


                    <div className="col-sm-10">
                        <span className="pull-right">Tổng tiền sản phẩm</span>
                    </div>
                    <div className="col-sm-2">
                        <label>200.000đ</label>
                    </div>

                    <div className="col-sm-10">
                        <span className="pull-right">Phí vận chuyển</span>
                    </div>
                    <div className="col-sm-2">
                        <label>0đ</label>
                    </div>

                    <div className="col-sm-10">
                        <span className="pull-right">Tổng cộng</span>
                    </div>
                    <div className="col-sm-2">
                        <label>200.000đ</label>
                    </div>

                    <div className="col-sm-10 total-item">
                        <span className="pull-right">Đã thanh toán</span>
                    </div>
                    <div className="col-sm-2">
                        <FmsCheckbox disabled/>
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
            order,
            isLoading
        } = this.state;

        if (!order) {
            return null;
        }

        return (
            <Modal show={isShown} bsSize="large" backdrop='static' keyboard={false}>
                <div className='order-detail-modal inmodal'>
                    <Modal.Header
                        closeButton={true}
                        onHide={() => {
                            this.props.onClose();
                        }}
                    >
                        <h4>Đơn hàng #{order.id}</h4>

                        <div>
                            <small className="font-bold">Ngày tạo: <strong>12:49, 24-12-2017</strong></small>
                        </div>
                        <div>
                            <small className="font-bold">Nguồn đơn: <a>fb.com/my-shop/posts/4128912312412</a></small>
                        </div>

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
                                onClick={() => this.orderTransporting()}
                                disabled={isLoading}>Đang vận chuyển
                        </button>
                    </Modal.Footer>

                </div>
            </Modal>
        );
    }
}

FmsTransportedOrderDetailModal.propTypes = {
    isShown: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired
};

export default FmsTransportedOrderDetailModal;
