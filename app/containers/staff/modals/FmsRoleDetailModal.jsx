import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';

class FmsRoleDetailModal extends Component {

    state = {
        role: {},
        isLoading: false
    };

    onUpdateRole() {

    }

    onDeleteRole() {
        const allow = confirm('Bạn có chắc chắn muốn xóa vai trò này?');

        if (allow) {
            this.props.onClose();
        }
    }

    onCloseButtonClick() {
        this.props.onClose();
    }

    onChangeInput(refName) {
        const newValue = this.refs[refName].value;
        const newRole = {...this.state.role};
        newRole[refName] = newValue;

        this.setState({role: newRole});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.role !== this.state.role) {
            this.setState({role: nextProps.role});
        }
    }

    renderBody() {
        const { role } = this.state;

        return (
            <Modal.Body>
                <div className="row form-group">
                    <div className="col-sm-4">
                        <label className="control-label">Tên vai trò:</label>
                    </div>
                    <div className="col-sm-8">
                        <input type="text"
                            className="form-control"
                            ref='name'
                            value={role.name || ''}
                            onChange={() => {this.onChangeInput('name')}}
                        />
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-sm-4">
                        <label className="control-label">Các quyền:</label>
                    </div>
                    <div className="col-sm-8">
                        <input type="text"
                            className="form-control"
                            ref='permissions'
                            value={role.permissions || ''}
                            onChange={() => {this.onChangeInput('permissions')}}
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
        const {isLoading} = this.state;

        return (
            <Modal show={isShown} backdrop='static' keyboard={false} bsSize='large'>
                <div className='inmodal'>
                    <Modal.Header
                        closeButton={true}
                        onHide={this.onCloseButtonClick.bind(this)}
                    >
                        <h4 className='modal-title'>Thông tin vai trò</h4>

                    </Modal.Header>
                    {this.renderBody()}
                    <Modal.Footer>
                        <button
                            className='btn btn-danger pull-left btn-outline'
                            onClick={this.onDeleteRole.bind(this)}
                            disabled={isLoading}>Xóa
                        </button>
                        <button
                            className='btn btn-white'
                            onClick={this.onCloseButtonClick.bind(this)}
                            disabled={isLoading}>Hủy
                        </button>

                        <button
                            className='btn btn-primary'
                            onClick={this.onUpdateRole.bind(this)}
                            disabled={isLoading}>Cập nhật
                        </button>
                    </Modal.Footer>
                </div>
            </Modal>
        );
    }
}

FmsRoleDetailModal.propTypes = {
    isShown: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired
};

export default FmsRoleDetailModal;
