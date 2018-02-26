import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';
import {getPermissions, updateRole, deleteRole} from '../../../api/RoleApi';

class FmsRoleDetailModal extends Component {

    state = {
        role: {},
        isLoading: false,
        perms: {},
        selectedPerms: []
    };

    onUpdateRole() {
        const {project_id} = this.props;
        const {selectedPerms} = this.state;
        this.setState({isLoading: true});
        
        let role = this.state.role;
        role.permissions = selectedPerms;
        if (!!role.name) {
            updateRole(project_id, role)
                .then(
                    res => {
                        let shouldUpdate = true;
                        this.props.onClose(shouldUpdate);
                    }
                )
                .then(this.setState({role: {}, selectedPerms: [], isLoading: false}))
        } else {
            this.setState({isLoading: false});
            alert('Cần điền Tên vai trò');
        }
    }

    onDeleteRole() {
        const {project_id} = this.props;
        const role_id = this.state.role._id;
        
        const allow = confirm('Bạn có chắc chắn muốn xóa vai trò này?');

        if (allow) {
            this.setState({isLoading: true});
            deleteRole(project_id, role_id)
                .then(
                    res => {
                        let shouldUpdate = true;
                        this.props.onClose(shouldUpdate);
                    }
                )
                .then(this.setState({role: {}, selectedPerms: [], isLoading: false}))
        }
    }

    getPerms() {
        getPermissions()
            .then((perms) => {
                this.setState({perms});
            })
    }

    onCloseButtonClick() {
        this.setState({role: {}, selectedPerms: []});
        let shouldUpdate = true;
        this.props.onClose(shouldUpdate);
    }

    onChangeInput(refName) {
        const newValue = this.refs[refName].value;
        const newRole = {...this.state.role};
        newRole[refName] = newValue;

        this.setState({role: newRole});
    }

    onChangeAllCheck(idx) {
        const {perms} = this.state;
        let selectedPerms = this.state.selectedPerms;
        if (this.refs[idx].checked) {
            perms[idx].permissions.map(perm => {
                if (selectedPerms.findIndex(p => p === perm.key) === -1) {
                    selectedPerms.push(perm.key);
                }
            })
            this.setState({selectedPerms});
        } else {
            perms[idx].permissions.map(perm => {
                selectedPerms = selectedPerms.filter(p => p !== perm.key);
            })
            this.setState({selectedPerms});
        }
    }

    onChangeCheckbox(perm, idx) {
        let selectedPerms = this.state.selectedPerms;
        let index = selectedPerms.findIndex(p => p === perm);
        if (this.refs[perm].checked) {
            if ( index === -1) {
                selectedPerms.push(perm);
            }
        } else {
            this.refs[idx].checked = false;
            if (index !== -1) {
                selectedPerms.splice(index, 1);
            }
        }
        this.setState({selectedPerms});
    }

    componentDidMount() {
        this.getPerms();
        const {role} = this.state;
        this.setState({selectedPerms: role.permissions});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.role !== this.state.role) {
            this.setState({role: nextProps.role, selectedPerms: nextProps.role.permissions});
        }
    }

    renderPerms() {
        const {perms, selectedPerms} = this.state;
        return (
            Array.isArray(perms) && perms.map((item, idx) => {
                return (
                    <div className='col-md-12' key={item.name + idx}>
                        <label className="control-label-collapse" 
                            // data-toggle="collapse" 
                            // href={'#'+key} 
                            // aria-expanded="false" 
                            // aria-controls={key}
                        >
                            <i className="fa fa-caret-right"> </i> {item.name}
                        </label>
                        
                        <div className="perm-select" id={item.name}>
                            <label className='col-sm-3 checkbox-inline' onChange={() => this.onChangeAllCheck(idx)}>
                                <input type="checkbox" ref={idx}/> Tất cả
                            </label>
                            {
                                Array.isArray(item.permissions) && item.permissions.map(perm => {
                                    let index = selectedPerms ? selectedPerms.findIndex((p) => p === perm.key) : 0;
                                    return (
                                        <label className='col-sm-3 checkbox-inline' 
                                            key={perm.key} 
                                            onChange={() => this.onChangeCheckbox(perm.key, idx)}
                                        >
                                            <input type="checkbox" ref={perm.key} 
                                                onChange={() => this.onChangeCheckbox(perm.key, idx)}
                                                checked={selectedPerms ? selectedPerms[index] === perm.key : false}/> {perm.name}
                                        </label>
                                    );
                                })
                            }
                                
                        </div>
                    </div>
                );
            })
        )
    }

    renderBody() {
        const { role, perms } = this.state;

        return (
            <Modal.Body>
                <div className="row form-group">
                    <div className="col-sm-2">
                        <label className="control-label">Tên vai trò: *</label>
                    </div>
                    <div className="col-sm-10">
                        <input type="text"
                            className="form-control"
                            ref='name'
                            value={role.name || ''}
                            onChange={() => {this.onChangeInput('name')}}
                        />
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-sm-2">
                        <label className="control-label">Các quyền:</label>
                    </div>
                    <div className="col-sm-10">
                        {
                            this.renderPerms()
                        }
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
    onClose: propTypes.func.isRequired,
    project_id: propTypes.string
};

export default FmsRoleDetailModal;
