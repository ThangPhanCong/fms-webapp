import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';
import {getRoles} from '../../../api/RoleApi';
import {createNewStaff} from '../../../api/StaffApi';

class FmsCreateNewStaffModal extends Component {

    state = {
        staff: {},
        roles: [],
        isLoading: false
    };

    onCreateStaff() {
        const {project} = this.props;
        const {staff}  = this.state;
        this.setState({isLoading: true});
        if (!!staff.name && !!staff.email && !!staff.password) {
            createNewStaff(project._id, staff)
                .then(
                    staff => {
                        const shouldUpdate = true;
                        this.closeModal(shouldUpdate);
                    },
                    err => {
                        alert(err);
                    }
                )
                .then(() => this.setState({isLoading: false}));
        } else {
            this.setState({isLoading: false});
            alert('Cần điền đầy đủ các trường Tên nhân viên, Email, Mật khẩu');
        } 
    }

    onCloseButtonClick() {
        this.setState({staff: {}});
        this.props.onClose();
    }

    closeModal(shouldUpdate) {
        this.setState({staff: {}});
        this.props.onClose(shouldUpdate);
    }

    onChangeInput(refName) {
        const newValue = this.refs[refName].value;
        const newStaff = {...this.state.staff};
        newStaff[refName] = newValue;

        this.setState({staff: newStaff});
    }

    componentDidMount() {
        const {project} = this.props;
        this.getRolesOfProject(project._id);
    }

    componentWillReceiveProps(nextProps) {
        const {isShown, project} = this.props;

        if (nextProps.isShown !== isShown && nextProps.isShown === true) {
            this.getRolesOfProject(project._id);
        }
    }

    getRolesOfProject(project_id) {
        getRoles(project_id)
            .then(roles => {
                this.setState({roles: roles});
            })
    }

    renderBody() {
        const { staff, roles } = this.state;

        return (
            <Modal.Body>
                <div className="row">
                    <div className="form-group col-sm-6">
                        <div className="col-sm-4">
                            <label className="control-label">Tên nhân viên <span className='required-text'>*</span></label>
                        </div>
                        <div className="col-sm-8">
                            <input type="text"
                                className="form-control"
                                ref='name'
                                value={staff.name || ''}
                                onChange={() => {this.onChangeInput('name')}}
                            />
                        </div>
                    </div>
                    <div className="form-group col-sm-6">
                        <div className="col-sm-4">
                            <label className="control-label">Địa chỉ</label>
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
                            <label className="control-label">Email <span className='required-text'>*</span></label>
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
                    <div className="form-group col-sm-6">
                        <div className="col-sm-4">
                            <label className="control-label">Mật khẩu <span className='required-text'>*</span></label>
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
                </div>

                <div className="row">
                    <div className="form-group col-sm-6">
                        <div className="col-sm-4">
                            <label className="control-label">Điện thoại</label>
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
                            <label className="control-label">Ngày sinh</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="date"
                                className="form-control"
                                ref='birthday'
                                value={staff.birthday || ''}
                                onChange={() => {this.onChangeInput('birthday')}}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-sm-6">
                        <div className="col-sm-4">
                            <label className="control-label required-field">Vai trò</label>
                        </div>
                        <div className="col-sm-8">
                            <select className="form-control"
                                ref='role_id'
                                value={staff.role_id || ''}
                                onChange={() => {this.onChangeInput('role_id')}}
                            >
                                <option value=""/>
                                {
                                    roles.map(role => {
                                        return <option value={role._id} key={role._id}>{role.name}</option>
                                    })
                                }
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
                        <h4 className='modal-title'>Thêm nhân viên mới</h4>

                    </Modal.Header>
                    {this.renderBody()}
                    <Modal.Footer>
                        <button
                            className='btn btn-white'
                            onClick={this.onCloseButtonClick.bind(this)}
                            disabled={isLoading}>Hủy
                        </button>

                        <button
                            className='btn btn-primary'
                            onClick={this.onCreateStaff.bind(this)}
                            disabled={isLoading}>Thêm mới
                        </button>
                    </Modal.Footer>
                </div>
            </Modal>
        );
    }
}

FmsCreateNewStaffModal.propTypes = {
    isShown: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired
};

export default FmsCreateNewStaffModal;
