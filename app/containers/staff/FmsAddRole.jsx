import React, { Component, Fragment } from 'react';
import FmsPageTitle from "../../commons/page-title/FmsPageTitle";
import FmsSpin from "commons/FmsSpin/FmsSpin";

class FmsAddRole extends Component {

    state = {
        roles: [],
        isLoading: true
    }

    onOpenCreateRoleModal() {

    }

    renderRolesItem() {
        const {roles} = this.state;

        return roles.map(
            (role, i) => (
                <tr key={i}>
                    <td>{i+1}</td>
                    <td>{role.name}</td>
                    <td>{role.permissions}</td>
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
            <div className="table-responsive">
                {
                    isLoading ?
                        <FmsSpin size={25} center/>
                        : (
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
                                : null
                        )
                }
            </div>
        )
    }

    render() {
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

                        {/* <FmsCreateOrderTagModal
                            isShown={isShownCreateTagModal}
                            onClose={this.onCloseCreateTagModal.bind(this)}
                            project={project}
                            colors={colors}
                            key={uuid()}
                        />

                        <FmsDetailOrderTagModal
                            isShown={isShownDetailTagModal}
                            onClose={this.onCloseDetailTagModal.bind(this)}
                            project={project}
                            tag={selectedTag}
                            colors={colors}
                            key={uuid()}
                        /> */}
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default FmsAddRole;
