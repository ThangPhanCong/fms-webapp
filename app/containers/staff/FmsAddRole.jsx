import React, { Component, Fragment } from 'react';
import FmsPageTitle from "../../commons/page-title/FmsPageTitle";
import FmsCreateNewRoleModal from './modals/FmsCreateNewRoleModal';
import FmsRoleTable from './FmsRoleTable';
import {getRoles} from '../../api/RoleApi';

class FmsAddRole extends Component {

    state = {
        roles: [],
        selectedRole: {},
        isShownCreateRoleModal: false
    }

    onOpenCreateRoleModal() {
        this.setState({isShownCreateRoleModal: true});
    }

    onCloseCreateRoleModal() {
        this.setState({isShownCreateRoleModal: false});
    }

    onDeleteRole(role) {
        const allow = confirm('Bạn có chắc chắn muốn xóa vai trò này?');
    }

    getRolesOfProject() {
        const {project} = this.props;
        if (project) {
            getRoles(project._id) 
            .then(
                roles => {this.setState({roles: roles})}
            )
        }
    }

    componentDidMount() {
        this.getRolesOfProject();
    }

    render() {
        const {isShownCreateRoleModal, roles} = this.state;
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

                                    <FmsRoleTable roles={roles}/>

                                </div>
                            </div>
                        </div>

                        <FmsCreateNewRoleModal
                            isShown={isShownCreateRoleModal}
                            onClose={this.onCloseCreateRoleModal.bind(this)}
                        />

                    </div>
                </div>
            </Fragment>
        )
    }
}

export default FmsAddRole;
