import React, { Component, Fragment } from 'react';
import FmsTabs from "../../commons/FmsTabs/FmsTabs";
import FmsTab from "../../commons/FmsTabs/FmsTab";
import FmsCreateNewStaffModal from './modals/FmsCreateNewStaffModal';
import * as storage from "../../helpers/storage";
import FmsBlankPage from "../../commons/blank-page/FmsBlankPage";
import {getStaffView, postStaffView} from "../../api/UserViewApi";
import {delay} from 'utils/timeout-utils';
import {getStaffs} from "../../api/StaffApi";
import FmsStaffTable from './FmsStaffTable';
import FmsSpin from "../../commons/FmsSpin/FmsSpin";
import FmsStaffSearchBar from './FmsStaffSearchBar';
import FmsRoleTable from './FmsRoleTable';
import {getRoles} from '../../api/RoleApi';
import FmsCreateNewRoleModal from './modals/FmsCreateNewRoleModal';

class FmsStaffsBody extends Component {
    constructor(props) {
        super(props);

        const project_id = this.props.project._id;
        const isFirstTime = !storage.get(project_id + '_' + 'ALL_STAFF_VIEW');

        this.state = {
            tabActive: 0,
            staffs: [],
            isShownCreateStaffModal: false,
            isShownCreateRoleModal: false,
            isLoading: true,
            filter: {},
            isFirstTime
        };

        if (isFirstTime) {
            this.updateStaffView(project_id);
        }
    }

    updateStaffView(project_id) {
        getStaffView(project_id)
            .then(rs => {
                if (rs.is_view) {
                    this.setState({isFirstTime: false});
                    storage.set(project_id + '_' + 'ALL_STAFF_VIEW', true);
                } else {
                    this.setState({isFirstTime: true});
                }
            })
    }

    openCreateNewStaffModal() {
        this.setState({tabActive: 0, isShownCreateStaffModal: true});
    }

    onOpenCreateRoleModal() {
        this.setState({tabActive: 1, isShownCreateRoleModal: true});
    }

    onCloseCreateStaffModal(shouldReload) {
        const {isFirstTime} = this.state;

        if (shouldReload) {
            const {project} = this.props;
            this.updateStaffList(project);

            if (isFirstTime) {
                delay(1000).then(() => this.setState({isFirstTime: false}));

                const project_id = this.props.project._id;
                storage.set(project_id + '_' + 'ALL_STAFF_VIEW', true);
                postStaffView(project_id);
            }
        }

        this.setState({isShownCreateStaffModal: false});
    }

    onCloseCreateRoleModal(shouldReload) {
        if (shouldReload) {
            this.getRolesOfProject();
        }
        this.setState({isShownCreateRoleModal: false});
    }

    updateStaffList(project, filter = this.state.filter) {
        this.setState({isLoading: true});

        getStaffs(project._id, filter)
            .then(staffs => this.setState({staffs, isLoading: false}));
    }

    reloadStaffs() {
        const {project} = this.props;
        this.updateStaffList(project);
    }

    getRolesOfProject() {
        const {project} = this.props;
        getRoles(project._id) 
            .then(
                roles => {this.setState({roles: roles})}
            )
    }

    componentDidMount() {
        const {project} = this.props;

        this.getRolesOfProject();
        if (project) {
            this.updateStaffList(project);
        }
    }

    componentWillReceiveProps(nextProps) {
        const {project} = this.props;

        if (project !== nextProps.project) {
            this.updateStaffList(nextProps.project);
            this.updateStaffView(nextProps.project._id);
        }
    }

    render() {
        const {
            isShownCreateStaffModal, 
            isShownCreateRoleModal, 
            isFirstTime, 
            isLoading, 
            staffs, 
            roles, 
            tabActive
        } = this.state;
        const {project} = this.props;

        let projectName = 'Cửa hàng';
        if (project) {
            projectName = project.name;
        }

        return (
            <Fragment>
                {
                    isFirstTime
                        ? (
                            <FmsBlankPage
                                title="Quản lí nhân viên"
                            >
                                <p>
                                    Tất cả nhân viên là nơi quản lí nhân viên, các vai trò trong dự án. Bạn có thể thêm mới,
                                    sửa đổi thông tin, cấp quyền cho nhân viên.
                                </p>
                                <div>
                                    <button
                                        className='btn btn-primary'
                                        style={{marginTop: 20}}
                                        onClick={this.openCreateNewStaffModal.bind(this)}
                                    >
                                        <i className='fa fa-plus'
                                           style={{marginRight: 5}}
                                        />
                                        Thêm nhân viên
                                    </button>
                                </div>
                            </FmsBlankPage>
                        )
                        : (
                        <div className="wrapper wrapper-content">
                            <div className="row">
                                <div className="col-lg-12">
                                    <FmsTabs tabActive={tabActive}>

                                        <FmsTab title='Nhân viên'>
                                            <FmsStaffSearchBar/>
                                            {
                                                isLoading ?
                                                    <FmsSpin size={25} center={true}/>
                                                    : <FmsStaffTable staffs={staffs} project={project}
                                                        onReloadStaffs={this.reloadStaffs.bind(this)}/>
                                            }
                                        </FmsTab>
                                        
                                        <FmsTab title='Vai trò'>
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
                                            <FmsCreateNewRoleModal
                                                isShown={isShownCreateRoleModal}
                                                onClose={this.onCloseCreateRoleModal.bind(this)}
                                            />
                                        </FmsTab>

                                        <FmsTab
                                            title={
                                                <button className='btn btn-primary btn-sm btn-create-staff'
                                                        onClick={this.openCreateNewStaffModal.bind(this)}>
                                                    <i className='fa fa-pencil'/> Thêm nhân viên
                                                </button>
                                            }
                                            renderBody={false}
                                        />

                                    </FmsTabs>
                                </div>
                            </div>
                        </div>
                        )
                }
                
                <FmsCreateNewStaffModal 
                    isShown={isShownCreateStaffModal} 
                    onClose={this.onCloseCreateStaffModal.bind(this)} 
                    project={project}
                />
            </Fragment>
        );
    }
}

export default FmsStaffsBody;
