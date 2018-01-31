import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';

class FmsStaffDetailModal extends Component {

    state = {
        staff: {}
    };

    onUpdateStaff() {

    }

    onDeleteStaff() {
        const allow = confirm('Bạn có chắc chắn muốn xóa nhân viên này?');

        if (allow) {
            this.props.onClose();
        }
    }

    onCloseButtonClick() {
        this.props.onClose();
    }

    onChangeInput(refName) {
        const newValue = this.refs[refName].value;
        const newStaff = {...this.state.staff};
        newStaff[refName] = newValue;

        this.setState({staff: newStaff});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.staff !== this.state.staff) {
            this.setState({staff: nextProps.staff});
        }
    }

    renderBody() {
        const { staff } = this.state;

        return (
            <Modal.Body>
                <div className="row">
                    <div className="form-group col-sm-6">
                        <div className="col-sm-4">
                            <label className="control-label">Tên nhân viên:</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="text"
                                className="form-control"
                                ref='fullName'
                                value={staff.fullName || ''}
                                onChange={() => {this.onChangeInput('fullName')}}
                            />
                        </div>
                    </div>
                    <div className="form-group col-sm-6">
                        <div className="col-sm-4">
                            <label className="control-label">Email:</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="text"
                                className="form-control"
                                ref='email'
                                value={staff.email || ''}
                                onChange={() => {this.onChangeInput('email')}}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-sm-6">
                        <div className="col-sm-4">
                            <label className="control-label">Tên đăng nhập:</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="text"
                                className="form-control"
                                ref='userName'
                                value={staff.userName || ''}
                                onChange={() => {this.onChangeInput('userName')}}
                            />
                        </div>
                    </div>
                    <div className="form-group col-sm-6">
                        <div className="col-sm-4">
                            <label className="control-label">Địa chỉ:</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="text"
                                className="form-control"
                                ref='address'
                                value={staff.address || ''}
                                onChange={() => {this.onChangeInput('address')}}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-sm-6">
                        <div className="col-sm-4">
                            <label className="control-label">Mật khẩu:</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="text"
                                className="form-control"
                                ref='password'
                                value={staff.password || ''}
                                onChange={() => {this.onChangeInput('password')}}
                            />
                        </div>
                    </div>
                    <div className="form-group col-sm-6">
                        <div className="col-sm-4">
                            <label className="control-label">Gõ lại mật khẩu:</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="text"
                                className="form-control"
                                ref='passwordConfirm'
                                value={staff.passwordConfirm || ''}
                                onChange={() => {this.onChangeInput('passwordConfirm')}}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-sm-6">
                        <div className="col-sm-4">
                            <label className="control-label">Vai trò:</label>
                        </div>
                        <div className="col-sm-8">
                            <select className="form-control"
                                ref='role'
                                value={staff.role || ''}
                                onChange={() => {this.onChangeInput('role')}}
                            >
                                <option value=""></option>
                                <option value="1">Quản lý trang</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group col-sm-6">
                        <div className="col-sm-4">
                            <label className="control-label">Ngày sinh:</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="date"
                                className="form-control"
                                ref='dateOfBirth'
                                value={staff.dateOfBirth || ''}
                                onChange={() => {this.onChangeInput('dateOfBirth')}}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-sm-6">
                        <div className="col-sm-4">
                            <label className="control-label">Điện thoại:</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="text"
                                className="form-control"
                                ref='phone'
                                value={staff.phone || ''}
                                onChange={() => {this.onChangeInput('phone')}}
                            />
                        </div>
                    </div>
                    <div className="form-group col-sm-6">
                        <div className="col-sm-4">
                            <label className="control-label">Ngôn ngữ:</label>
                        </div>
                        <div className="col-sm-8">
                            <select className="form-control"
                                ref='language'
                                value={staff.language || ''}
                                onChange={() => {this.onChangeInput('language')}}
                            >
                                <option value=""></option>
                                <option value="1">Tiếng Việt</option>
                                <option value="2">English</option>
                            </select>
                        </div>
                    </div>
                </div>

            </Modal.Body>
        )
    }

    render() {
        const {
            isShown
        } = this.props;
        const {isLoading} = this.state;

        return (
            <Modal show={isShown} backdrop='static' keyboard={false} bsSize='large'>
                <div className='inmodal'>
                    <Modal.Header
                        closeButton={true}
                        onHide={this.onCloseButtonClick.bind(this)}
                    >
                        <h4 className='modal-title'>Thông tin nhân viên</h4>

                    </Modal.Header>
                    {this.renderBody()}
                    <Modal.Footer>
                        <button
                            className='btn btn-danger pull-left btn-outline'
                            onClick={this.onDeleteStaff.bind(this)}
                            disabled={isLoading}>Xóa
                        </button>
                        <button
                            className='btn btn-white'
                            onClick={this.onCloseButtonClick.bind(this)}
                            disabled={isLoading}>Hủy
                        </button>

                        <button
                            className='btn btn-primary'
                            onClick={this.onUpdateStaff.bind(this)}
                            disabled={isLoading}>Cập nhật
                        </button>
                    </Modal.Footer>
                </div>
            </Modal>
        );
    }
}

FmsStaffDetailModal.propTypes = {
    isShown: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired
};

export default FmsStaffDetailModal;
