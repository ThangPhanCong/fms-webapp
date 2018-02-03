import React, { Component, Fragment } from 'react';
import FmsRoleDetailModal from './modals/FmsRoleDetailModal';
import FmsSpin from "commons/FmsSpin/FmsSpin";

class FmsAddRole extends Component {

    state = {
        roles: [],
        selectedRole: {},
        isLoading: true,
        isShownDetailRoleModal: false
    }

    onOpenDetailRoleModal(role) {
        this.setState({selectedRole: role, isShownDetailRoleModal: true});
    }

    onCloseDetailRoleModal() {
        this.setState({selectedRole: {}, isShownDetailRoleModal: false});
    }

    onDeleteRole(role) {
        console.log(role);
        const allow = confirm('Bạn có chắc chắn muốn xóa vai trò này?');
    }

    componentDidMount() {
        const {roles} = this.props;
        this.setState({roles: roles, isLoading: false});
    }

    componentWillUnmount() {
        this.setState({
            roles: [],
            selectedRole: {},
            isLoading: false
        });
    }

    renderRolesItem() {
        const {roles} = this.props;

        return roles.map(
            (role, i) => (
                <tr key={i}>
                    <td>{i+1}</td>
                    <td>{role.name}</td>
                    <td>
                        {role.permissions.map((p, i) => {
                            if (i !== role.permissions.length-1) {
                                return p + ', '
                            } 
                            return p + '.'
                        })}
                    </td>
                    <td>
                        <i className="fa fa-trash-o clickable"
                           onClick={() => this.onDeleteRole(role)}
                        />
                    </td>
                    <td>
                        <i className="fa fa-pencil clickable"
                           onClick={() => this.onOpenDetailRoleModal(role)}
                        />
                    </td>
                </tr>
            )
        )
    }

    render() {
        const {isShownDetailRoleModal, selectedRole, isLoading} = this.state;
        const {roles} = this.props;
            
        return (
            <Fragment>
                {isLoading ?
                    <FmsSpin size={25} center/>
                    : (
                    <div className="table-responsive">
                        {
                            (roles && roles.length !== 0) ?
                                (
                                    <table className="table table-striped order-tag-table">
                                        <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Tên vai trò</th>
                                            <th>Các quyền</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {
                                            this.renderRolesItem()
                                        }
                                        </tbody>
                                    </table>
                                )
                                : <p className='text-center'>Không có chức danh nào</p>
                            
                        }
                    </div>
                    )
                }

                <FmsRoleDetailModal
                    isShown={isShownDetailRoleModal}
                    onClose={this.onCloseDetailRoleModal.bind(this)}
                    role={selectedRole}
                />
            </Fragment>
        )
    }
}

export default FmsAddRole;
