import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';

class FmsCreateNewRoleModal extends Component {

    state = {
        role: {},
        isLoading: false
    };

    onCreateRole() {

    }

    onCloseButtonClick() {
        this.setState({role: {}});
        this.props.onClose();
    }

    onChangeInput(refName) {
        const newValue = this.refs[refName].value;
        const newRole = {...this.state.role};
        newRole[refName] = newValue;

        this.setState({role: newRole});
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
                        <h4 className='modal-title'>Thêm vai trò</h4>

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
                            onClick={this.onCreateRole.bind(this)}
                            disabled={isLoading}>Tạo mới
                        </button>
                    </Modal.Footer>
                </div>
            </Modal>
        );
    }
}

FmsCreateNewRoleModal.propTypes = {
    isShown: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired
};

export default FmsCreateNewRoleModal;
