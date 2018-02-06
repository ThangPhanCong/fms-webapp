import React, {Component} from "react";
import FmsStaffDetailModal from "./modals/FmsStaffDetailModal";

class FmsStaffTable extends Component {

    state = {
        isShowDetailModal: false,
        selectdStaff: {}
    };

    onCloseModal(shouldReloadData) {
        if (shouldReloadData) {
            this.props.onReloadStaffs();
        }

        this.setState({isShowDetailModal: false});
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
                    <th>Tên đăng nhập</th>
                    <th>Vai trò</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
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
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{staff.fullName}</td>
                            <td>{staff.name}</td>
                            <td>{staff.role}</td>
                            <td>{staff.email}</td>
                            <td>{staff.phone}</td>
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