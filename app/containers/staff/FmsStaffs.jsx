import React, { Component, Fragment } from 'react';
import FmsContact from '../../commons/contact/FmsContact';
import FmsTabs from "../../commons/FmsTabs/FmsTabs";
import FmsTab from "../../commons/FmsTabs/FmsTab";
import FmsPageTitle from "../../commons/page-title/FmsPageTitle";
import FmsCreateNewStaffModal from './modals/FmsCreateNewStaffModal';
import FmsStaffDetailModal from './modals/FmsStaffDetailModal';

const staffs = [
    {
        avatar: '',
        roleName: 'Graphics designer',
        fullName: 'Nguyễn Văn A',
        userName: 'nguyen_van_a',
        email: 'nguyenvana@example.com',
        address: '144 Xuân Thủy, Cầu Giấy',
        dateOfBirth: '1998-03-12',
        phone: '0912345678'
    },
    {
        avatar: '',
        roleName: 'Designer',
        fullName: 'Nguyễn Văn B',
        userName: 'nguyen_van_b',
        email: 'nguyenvanb@example.com',
        address: '136 Xuân Thủy, Cầu Giấy',
        dateOfBirth: '1998-02-12',
        phone: '0912345678'
    }
]

class FmsStaffs extends Component {
    state = {
        staff: {},
        isShownCreateModal: false,
        isShownDetailModal: false
    }

    openDetailModal(data) {
        this.setState({staff: data, isShownDetailModal: true});
    }

    openCreateNewStaffModal() {
        this.setState({isShownCreateModal: true});
    }

    onCloseCreateModal() {
        this.setState({isShownCreateModal: false});
    }

    onCloseDetailModal() {
        this.setState({isShownDetailModal: false});
    }

    render() {
        const {isShownCreateModal, isShownDetailModal, staff} = this.state;
        const {project} = this.props;

        let projectName = 'Cửa hàng';
        if (project) {
            projectName = project.name;
        }

        return (
            <Fragment>
                <FmsPageTitle title="Tất cả nhân viên" route={`${projectName}/Quản lí nhân viên/Tất cả nhân viên`}/>
                <div className="wrapper wrapper-content">
                    <div className="row">
                        <div className="col-lg-12">
                            <FmsTabs>

                                <FmsTab title='Tất cả nhân viên'>
                                    <div className='row'>
                                        {
                                            staffs ? staffs.map(staff => {
                                                return (
                                                    <div className="col-md-4" key={staff.userName}>
                                                        <FmsContact data={staff} handleClick={this.openDetailModal.bind(this)}/>  
                                                    </div>
                                                )
                                            })
                                            : (<p>Chưa có nhân viên nào</p>)
                                        }
                                    </div>
                                </FmsTab>

                                <FmsTab
                                    title={
                                        <button className='btn btn-primary btn-sm btn-create-order'
                                                onClick={this.openCreateNewStaffModal.bind(this)}>
                                            <i className='fa fa-pencil'/> Tạo nhân viên
                                        </button>
                                    }
                                    renderBody={false}
                                />

                            </FmsTabs>

                            <FmsCreateNewStaffModal 
                                isShown={isShownCreateModal} 
                                onClose={this.onCloseCreateModal.bind(this)} 
                            />

                            <FmsStaffDetailModal
                                isShown={isShownDetailModal}
                                onClose={this.onCloseDetailModal.bind(this)}
                                staff={staff}
                            />
                        </div>
                    </div>
                </div>
                
            </Fragment>
        );
    }
}

export default FmsStaffs;
