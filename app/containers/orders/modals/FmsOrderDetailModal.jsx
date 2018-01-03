import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';
import FmsCheckbox from 'commons/FmsCheckbox/FmsCheckbox';

class FmsOrderDetailModal extends Component {

    onCloseButtonClick() {
        this.props.onClose();
    }

    render() {
        const {
            isShown,
            order
        } = this.props;

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

                    <Modal.Body>

                        <div className="row">

                            <div className="col-sm-12">
                                <div className="form-group row">
                                    <div className="col-sm-3">
                                        <label className="control-label">Ghi chú nội bộ</label>
                                    </div>
                                    <div className="col-sm-9">
                                        <input type="text" id="edhoten"
                                               value="a hỏi bã xã anh đã tối anh gọi lại ạ, mai a gọi lại, a đang bận"
                                               placeholder="" className="form-control"/>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-sm-3">
                                        <label className="control-label">Đánh dấu</label>
                                    </div>
                                    <div className="col-sm-9 color-tag ">
                                        <span className="label l-label label-green tag-label pull-left clickable"
                                              style={{opacity: 1}}>Liên hệ lại</span>
                                        <span className="label l-label tag-label pull-left margin-left-5px clickable">
                                            <i className="fa fa-pencil"/></span>
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
                                                <input type="text" id="edhoten" value="Hoàng Hồng"
                                                       placeholder="Tên khách hàng" className="form-control"/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <div className="col-sm-3">
                                                <label className="control-label">Điện thoại</label>
                                            </div>
                                            <div className="col-sm-9">
                                                <input type="text" id="edhoten" value="0986284919" placeholder=""
                                                       className="form-control"/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <div className="col-sm-3">
                                                <label className="control-label">Facebook</label>
                                            </div>
                                            <div className="col-sm-9">
                                                <input type="text" id="edhoten" value="fb.com/hoanghong" placeholder=""
                                                       className="form-control"/>
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
                                                <label className="control-label">Địa chỉ</label>
                                            </div>
                                            <div className="col-sm-8">
                                                <input type="text" id="edhoten"
                                                       value="Số 5s, Khu Phố 2, Phường Quyết Thắng, Biên Hòa, Đồng Nai"
                                                       placeholder="Tên khách hàng" className="form-control"/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <div className="col-sm-4">
                                                <label className="control-label">Phương thức</label>
                                            </div>
                                            <div className="col-sm-8">
                                                <select className="select2_demo_1 form-control" id="edmainproduct">
                                                    <option value="0" selected=""></option>
                                                    <option value="2">Tổng bưu điện</option>
                                                    <option value="2">Viettel Post</option>
                                                    <option value="2">EMS</option>
                                                    <option value="2">Shopee</option>
                                                    <option value="2">Tự vận chuyển</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <div className="col-sm-4">
                                                <label className="control-label">Phí</label>
                                            </div>
                                            <div className="col-sm-8">
                                                <input type="text" id="edhoten" value="0đ" placeholder=""
                                                       className="form-control"/>
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
                                                    <div className="">
                                                        <div className="row">
                                                            <div className="col-sm-9">
                                                                <div className="form-group">
                                                                    <input type="text" id="product_name"
                                                                           name="product_name" value=""
                                                                           placeholder="Tìm và thêm sản phẩm"
                                                                           className="form-control"/>
                                                                </div>
                                                            </div>

                                                            <div className="col-sm-3">
                                                                <div className="form-group">
                                                                    <button className="btn btn-primary full-width"
                                                                            type="button" name="button">Thêm sản phẩm
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
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td><a href="#"><span
                                                                        className="badge badge-info">SP12501</span></a>
                                                                    </td>
                                                                    <td>Kính Mắt Cao Cấp C2</td>
                                                                    <td>2</td>
                                                                    <td>40.000đ</td>
                                                                    <td>0đ</td>
                                                                    <td>80.000đ</td>
                                                                    <td><i className="fa fa-trash-o clickable"/></td>
                                                                </tr>

                                                                <tr>
                                                                    <td>2</td>
                                                                    <td><a href="#"><span
                                                                        className="badge badge-info">SP12501</span></a>
                                                                    </td>
                                                                    <td>Kính Mắt Cao Cấp C4</td>
                                                                    <td>1</td>
                                                                    <td>120.000đ</td>
                                                                    <td>0đ</td>
                                                                    <td>120.000đ</td>
                                                                    <td><i className="fa fa-trash-o clickable"
                                                                           data-toggle="tooltip" data-placement="top"
                                                                           title="Xóa sản phẩm"/></td>
                                                                </tr>


                                                                </tbody>
                                                            </table>
                                                        </div>

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
                                <FmsCheckbox />
                            </div>


                        </div>

                    </Modal.Body>

                    <Modal.Footer>
                        <button type="button" className="btn btn-white" data-dismiss="modal">Quay lại</button>
                        <button type="button" className="btn btn-success" data-dismiss="modal">Yêu cầu xuất</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal">Lưu thay đổi</button>
                    </Modal.Footer>

                </div>
            </Modal>
        );
    }
}

FmsOrderDetailModal.propTypes = {
    isShown: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired
};

export default FmsOrderDetailModal;
