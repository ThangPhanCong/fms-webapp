import React, {Component, Fragment} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';
import {getPermissions} from '../../../api/RoleApi';
import {parse_permissions} from '../../../utils/permission-utils';
import FmsCheckbox from '../../../commons/checkbox/FmsCheckbox';

class FmsCreateNewRoleModal extends Component {

    state = {
        role: {},
        isLoading: false,
        perms: {}
    };

    onCreateRole() {

    }

    getPerms() {
        getPermissions()
            .then((res) => {
                const perms = parse_permissions(res);
                this.setState({perms: perms});
            })
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

    componentWillMount() {
        this.getPerms();
    }
    
    renderPerms() {
        const {perms} = this.state;
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
                            {
                                perms[key].map(perm => {
                                    return (
                                        <label className='col-sm-3 checkbox-inline' key={perm} style={{marginLeft: '0px', padding: '5px'}}>
                                            <input type="checkbox" /> {perm}
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
