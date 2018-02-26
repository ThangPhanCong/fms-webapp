import React, {Component} from "react";
import FmsStaffDetailModal from "./modals/FmsStaffDetailModal";

class FmsStaffTable extends Component {

    state = {
        isShowDetailModal: false,
        selectdStaff: {}
    };

    onCloseModal(shouldReloadData) {
        this.setState({isShowDetailModal: false});
        if (shouldReloadData) {
            this.props.onReloadStaffs();
        }
    }

    onOpenModal(selectedStaff) {
        this.setState({isShowDetailModal: true, selectedStaff});
    }

    renderTableHeader() {
        return (
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Họ tên</th>
                    <th>Vai trò</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Trạng thái</th>
                </tr>
            </thead>
        )
    }

    renderTableBody() {
        const {staffs} = this.props;

        return (
            <tbody>
            {
                staffs.map(
                    (staff, i) => (
                        <tr key={staff._id}>
                            <td>{i + 1}</td>
                            <td>{staff.name}</td>
                            <td>{staff.role && staff.role.name}</td>
                            <td>{staff.email}</td>
                            <td>{staff.phone}</td>
                            <td><span className="label label-info">Active</span></td>
                            <td>
                                <i className='fa fa-pencil clickable'
                                   onClick={() => {
                                       this.onOpenModal(staff)
                                   }}
                                />
                            </td>
                        </tr>
                    )
                )
            }
            </tbody>
        )
    }

    render() {
        const {
            isShowDetailModal,
            selectedStaff
        } = this.state;

        const {
            project
        } = this.props;

        return (
            <div className="table-responsive">
                <table className="table table-striped">

                    {
                        this.renderTableHeader()
                    }

                    {
                        this.renderTableBody()
                    }
                </table>

                <FmsStaffDetailModal
                    isShown={isShowDetailModal}
                    onClose={this.onCloseModal.bind(this)}
                    staff={selectedStaff}
                    project={project}
                />
            </div>
        )
    }
}

export default FmsStaffTable;