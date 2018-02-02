import React, { Component, Fragment } from 'react';
import FmsPageTitle from "../../commons/page-title/FmsPageTitle";
import FmsSpin from "commons/FmsSpin/FmsSpin";
import FmsRoleDetailModal from './modals/FmsRoleDetailModal';
import FmsCreateNewRoleModal from './modals/FmsCreateNewRoleModal';

const roles = [
    {
        name: 'Quản lý trang',
        permissions: [
            'conversation_read',
            'conversation_edit'
        ]
    }
]

class FmsAddRole extends Component {

    state = {
        roles: [],
        selectedRole: {},
        isLoading: true,
        isShownCreateRoleModal: false,
        isShownDetailRoleModal: false
    }

    onOpenCreateRoleModal() {
        this.setState({isShownCreateRoleModal: true});
    }

    onOpenDetailRoleModal(role) {
        this.setState({selectedRole: role, isShownDetailRoleModal: true});
    }

    onCloseCreateRoleModal() {
        this.setState({isShownCreateRoleModal: false});
    }

    onCloseDetailRoleModal() {
        this.setState({selectedRole: {}, isShownDetailRoleModal: false});
    }

    onDeleteRole(role) {
        console.log(role);
        const allow = confirm('Bạn có chắc chắn muốn xóa vai trò này?');
    }

    componentDidMount() {
        this.setState({roles: roles, isLoading: false});
    }

    renderRolesItem() {
        const {roles} = this.state;

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
                           onClick={() => this.onOpenDetailRoleModal({...role})}
                        />
                    </td>
                </tr>
            )
        )
    }

    renderRoleTable() {
        const {isLoading, roles} = this.state;

        return (
            isLoading ?
                <FmsSpin size={25} center/>
                : (
                <div className="table-responsive">
                    {
                
                        (roles.length !== 0) ?
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
        )
    }

    render() {
        const {isShownCreateRoleModal, isShownDetailRoleModal, selectedRole} = this.state;
        const {project} = this.props;

        let projectName = 'Cửa hàng';
        if (project) {
            projectName = project.name;
        }

        return (
            <Fragment>
                <FmsPageTitle key={1} title="Vai trò" route={`${projectName}/Quản lí nhân viên/Vai trò`}/>

                <div className="wrapper wrapper-content">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ibox">
                                <div className="ibox-content">

                                    <div className="row">
                                        <div className="col-lg-12">
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={this.onOpenCreateRoleModal.bind(this)}
                                            >
                                                <i className="fa fa-plus"/> Thêm vai trò
                                            </button>
                                        </div>
                                    </div>

                                    {
                                        this.renderRoleTable()
                                    }

                                </div>
                            </div>
                        </div>

                        <FmsCreateNewRoleModal
                            isShown={isShownCreateRoleModal}
                            onClose={this.onCloseCreateRoleModal.bind(this)}
                        />

                        <FmsRoleDetailModal
                            isShown={isShownDetailRoleModal}
                            onClose={this.onCloseDetailRoleModal.bind(this)}
                            role={selectedRole}
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default FmsAddRole;
