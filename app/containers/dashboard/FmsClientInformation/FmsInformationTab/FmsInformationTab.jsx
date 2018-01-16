import React from 'react';
import {createReport, deleteReport, updateReport} from "../../../../actions/dashboard/chat/createOrder";
import {connect} from "react-redux";

class FmsInformationTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 0,
            reports: [],
            selectedReport: null
        }
    }

    cancelAddReport() {
        this.setState({type: 0, selectedReport: null});
    }

    openAddReport() {
        this.setState({type: 1});
    }

    confirmAddReport() {
        let content = this.refs.report.value;
        if (!content || content === "") return;
        this.refs.report.value = "";
        this.props.dispatch(createReport(this.props.conversation.page_fb_id, content));
        this.setState({type: 0});
    }

    deleteReport(report) {
        let allow = confirm("Bạn có muốn xóa ghi chú này?");
        if (allow) {
            this.props.dispatch(deleteReport(this.props.alias, report._id));
        }
    }

    updateReport(report) {
        this.setState({type: 3, selectedReport: report});
    }

    confirmUpdateReport() {
        this.props.dispatch(updateReport(this.props.alias, this.state.selectedReport._id, this.refs.report.value));
        this.setState({type: 0, selectedReport: null});
    }

    renderReports() {
        if (this.state.reports.length === 0) return <p className="no-note">Chưa có báo xấu</p>;
        return this.state.reports.map(report => {
            return <div key={report._id} className="note-text">
                <div>{report.content}</div>
                <div className="note-info-item">{FmsOrdersTab.convertTime(report.updated_time)}</div>
                <a className="note-info-item note-option" onClick={() => {
                    this.updateReport(report)
                }}>Sửa</a>
                <a className="note-info-item note-option" onClick={() => {
                    this.deleteReport(report)
                }}>Xóa</a>
            </div>
        });
    }

    renderReportsList() {
        if (this.state.type === 0) {
            return <div>{this.renderReports()}</div>
        } else if (this.state.type === 1) {
            return <div>
                <textarea ref="report" className="add-note-content" placeholder="Nhập nội dung báo xấu"/>
                <button className="btn button-note-option btn-primary" onClick={this.confirmAddReport.bind(this)}>Báo xấu
                </button>
                <button className="btn button-note-option btn-default" onClick={this.cancelAddReport.bind(this)}>Hủy
                </button>
            </div>
        } else if (this.state.type === 3) {
            return <div>
                <textarea ref="report" className="add-note-content" defaultValue={this.state.selectedReport.content}/>
                <button className="btn button-note-option btn-primary" onClick={this.confirmUpdateReport.bind(this)}>Cập
                    nhật
                </button>
                <button className="btn button-note-option btn-default" onClick={this.cancelAddReport.bind(this)}>Hủy
                </button>
            </div>
        }
    }

    render() {
        return (
            <div className="information-tab">
                <div className="information-area">client information</div>
                <div className="report-area">
                    <div className="title-section">Báo xấu</div>
                    <a className="add-note-button" onClick={this.openAddReport.bind(this)}>Thêm</a>
                    {this.renderReportsList()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        conversation: state.dashboard.chat.conversation,
        reports: state.dashboard.createOrder.reports
    }
};

export default connect(mapStateToProps)(FmsInformationTab);