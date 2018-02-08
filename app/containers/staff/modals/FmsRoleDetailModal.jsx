import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';
import {getPermissions, updateRole, deleteRole} from '../../../api/RoleApi';
import {parse_permissions} from '../../../utils/permission-utils';

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
        updateRole(project_id, role)
            .then(
                res => {
                    let shouldUpdate = true;
                    this.props.onClose(shouldUpdate);
                }
            )
            .then(this.setState({role: {}, selectedPerms: [], isLoading: false}))
    }

    onDeleteRole() {
        const {project_id} = this.props;
        const role_id = this.state.role._id;
        this.setState({isLoading: true});
        const allow = confirm('Bạn có chắc chắn muốn xóa vai trò này?');

        if (allow) {
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
            .then((res) => {
                const perms = parse_permissions(res);
                this.setState({perms: perms});
            })
    }

    onCloseButtonClick() {
        this.setState({role: {}, selectedPerms: []});
        this.props.onClose();
    }

    onChangeInput(refName) {
        const newValue = this.refs[refName].value;
        const newRole = {...this.state.role};
        newRole[refName] = newValue;

        this.setState({role: newRole});
    }

    onChangeAllCheck(key) {
        const {perms} = this.state;
        let selectedPerms = this.state.selectedPerms;
        if (this.refs[key].checked) {
            perms[key].map(perm => {
                if (selectedPerms.findIndex(p => p === perm) === -1) {
                    selectedPerms.push(perm);
                }
            })
            this.setState({selectedPerms});
        } else {
            selectedPerms = selectedPerms.filter(perm => perm.split('_')[0] !== key);
            this.setState({selectedPerms});
        }
    }

    onChangeCheckbox(perm) {
        let selectedPerms = this.state.selectedPerms;
        let index = selectedPerms.findIndex(p => p === perm);
        if (this.refs[perm].checked) {
            if ( index === -1) {
                selectedPerms.push(perm);
            }
        } else {
            if (index !== -1) {
                selectedPerms.splice(index, 1);
            }
        }
        this.setState({selectedPerms});
    }

    componentWillMount() {
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
            Object.keys(perms).map(key => {
                return (
                    <div className='col-md-12' key={key}>
                        <label className="control-label-collapse" 
                            data-toggle="collapse" 
                            href={'#'+key} 
                            aria-expanded="false" 
                            aria-controls={key}
                        >
                            <i className="fa fa-caret-right"> </i> {key}
                        </label>
                        
                        <div className="collapse in" id={key}>
                            <label className='col-sm-3 checkbox-inline' onChange={() => this.onChangeAllCheck(key)}>
                                <input type="checkbox" ref={key}/> Tất cả
                            </label>
                            {
                                perms[key].map(perm => {
                                    let index = selectedPerms ? selectedPerms.findIndex((p) => p === perm) : 0;
                                    return (
                                        <label className='col-sm-3 checkbox-inline' 
                                            key={perm} 
                                            onChange={() => this.onChangeCheckbox(perm)}
                                        >
                                            <input type="checkbox" ref={perm} 
                                                onChange={() => this.onChangeCheckbox(perm)}
                                                checked={selectedPerms ? selectedPerms[index] === perm : false}/> {perm}
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
                    <div className="col-sm-3">
                        <label className="control-label">Tên vai trò:</label>
                    </div>
                    <div className="col-sm-9">
                        <input type="text"
                            className="form-control"
                            ref='name'
                            value={role.name || ''}
                            onChange={() => {this.onChangeInput('name')}}
                        />
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-sm-3">
                        <label className="control-label">Các quyền:</label>
                    </div>
                    <div className="col-sm-9">
                    </div>
                </div>

                <div className="row form-group">
                    {
                        this.renderPerms()
                    }
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
