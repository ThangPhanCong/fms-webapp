import React from 'react';
import {connect} from 'react-redux';
import {
    createNote, createReport, deleteNote, deleteReport, updateNote,
    updateReport, getAllOrders
} from '../../../../actions/dashboard/chat/createOrder';
import FmsNewOrderModal from '../../../../commons/order-modal/FmsCreateOrderModal';
import FmsOrderDetailModal from '../../../../commons/order-modal/FmsOrderDetailModal';

class FmsOrdersTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            typeNote: 0,
            selectedNote: null,
            typeReport: 0,
            selectedReport: null,
            selectedOrder: {},
            isShownNewOrderModal: false,
            isShownOrderDetailModal: false
        };
    }

    convertTime(time) {
        let date = new Date(time);
        return "Ngày tạo: " + date.getDate() + "/" + (date.getMonth() + 1);
    }

    //---------------------Order Modals-----------------------------
    openNewOrderModal() {
        this.setState({isShownNewOrderModal: true});
    }

    closeNewOrderModal() {
        this.setState({ isShownNewOrderModal: false});
        this.props.dispatch(getAllOrders(this.props.alias));
    }

    openOrderDetailModal(order) {
        this.setState({isShownOrderDetailModal: true, selectedOrder: order});
    }

    closeOrderDetailModal() {
        this.setState({ isShownOrderDetailModal: false});
        this.props.dispatch(getAllOrders(this.props.alias));
    }

    //-------------Note----------------------------
    cancelAddNote() {
        this.setState({typeNote: 0, selectedNote: null});
    }

    openAddNote() {
        this.setState({typeNote: 1});
    }

    confirmAddNote() {
        let content = this.refs.note.value;
        if (!content || content === "") return;
        this.refs.note.value = "";
        this.props.dispatch(createNote(this.props.alias, content));
        this.setState({typeNote: 0});
    }

    deleteNote(note) {
        let allow = confirm("Bạn có muốn xóa ghi chú này?");
        if (allow) {
            this.props.dispatch(deleteNote(this.props.alias, note._id));
        }
    }

    updateNote(note) {
        this.setState({typeNote: 3, selectedNote: note});
    }

    confirmUpdateNote() {
        this.props.dispatch(updateNote(this.props.alias, this.state.selectedNote._id, this.refs.note.value));
        this.setState({typeNote: 0, selectedNote: null});
    }

    //------------------Report-------------------------------
    cancelAddReport() {
        this.setState({typeReport: 0, selectedReport: null});
    }

    openAddReport() {
        this.setState({typeReport: 1});
    }

    confirmAddReport() {
        let content = this.refs.report.value;
        if (!content || content === "") return;
        this.refs.report.value = "";
        this.props.dispatch(createReport(this.props.conversation.page_fb_id, content));
        this.setState({typeReport: 0});
    }

    deleteReport(report) {
        let allow = confirm("Bạn có muốn xóa ghi chú này?");
        if (allow) {
            this.props.dispatch(deleteReport(report._id));
        }
    }

    updateReport(report) {
        this.setState({typeReport: 3, selectedReport: report});
    }

    confirmUpdateReport() {
        this.props.dispatch(updateReport(this.state.selectedReport._id, this.refs.report.value));
        this.setState({typeReport: 0, selectedReport: null});
    }

    //------------Render views-------------------------
    renderNotes() {
        let notes = this.props.notes;
        if (notes.length === 0) return <p className="no-note">Chưa có ghi chú nào</p>;
        return notes.map((note, index) => {
            let custom = (index === notes.length - 1) ? " last" : "";
            return <div key={note._id} className={"note-text" + custom}>
                <div>{note.content}</div>
                <div className="note-info-item">{this.convertTime(note.updated_time)}</div>
                <a className="note-info-item note-option" onClick={() => {
                    this.updateNote(note)
                }}>Sửa</a>
                <a className="note-info-item note-option" onClick={() => {
                    this.deleteNote(note)
                }}>Xóa</a>
            </div>
        });
    }

    renderOrders() {
        let orders = this.props.orders;
        if (orders.length === 0) return <p className="no-note">Chưa có đơn hàng nào</p>;
        else {
            return orders.map((order, index) => {
                let custom = "";
                if (index === orders.length - 1) custom = " last";
                return <div key={order.id} className={"order-item" + custom}
                            onClick={() => {this.openOrderDetailModal(order)}}>
                    <div className="order-id">
                        {order.id + ":  "}
                        <span style={{color: order.order_tag.color}}>{order.order_tag.name}</span>
                    </div>
                    <div><i className="glyphicon glyphicon-usd"/> {order.transport_fee}</div>
                    <div><i className="glyphicon glyphicon-home"/> {order.transport_address}</div>
                    <div><i className="glyphicon glyphicon-phone"/> {order.customer_phone}</div>
                </div>
            });
        }
    }

    renderNoteList() {
        if (this.state.typeNote === 0) {
            return <div>{this.renderNotes()}</div>
        } else if (this.state.typeNote === 1) {
            return <div>
                <textarea ref="note" className="add-note-content" placeholder="Nhập nội dung ghi chú"/>
                <button className="btn button-note-option btn-primary" onClick={this.confirmAddNote.bind(this)}>Thêm
                </button>
                <button className="btn button-note-option btn-default" onClick={this.cancelAddNote.bind(this)}>Hủy
                </button>
            </div>
        } else if (this.state.typeNote === 3) {
            return <div>
                <textarea ref="note" className="add-note-content" defaultValue={this.state.selectedNote.content}/>
                <button className="btn button-note-option btn-primary" onClick={this.confirmUpdateNote.bind(this)}>Cập
                    nhật
                </button>
                <button className="btn button-note-option btn-default" onClick={this.cancelAddNote.bind(this)}>Hủy
                </button>
            </div>
        }
    }

    renderReports() {
        let reports = this.props.reports;
        if (reports.length === 0) return <p className="no-note">Chưa có báo xấu</p>;
        return reports.map((report, index) => {
            let custom = (index === reports.length - 1) ? " last" : "";
            return <div key={report._id} className={"note-text" + custom}>
                <div>
                    <span className="reporter">{report.from.name}</span>
                    {": " + report.content}
                </div>
                <div className="note-info-item">{this.convertTime(report.updated_time)}</div>
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
        if (this.state.typeReport === 0) {
            return <div>{this.renderReports()}</div>
        } else if (this.state.typeReport === 1) {
            return <div>
                <textarea ref="report" className="add-note-content" placeholder="Nhập nội dung báo xấu"/>
                <button className="btn button-note-option btn-primary" onClick={this.confirmAddReport.bind(this)}>Báo xấu
                </button>
                <button className="btn button-note-option btn-default" onClick={this.cancelAddReport.bind(this)}>Hủy
                </button>
            </div>
        } else if (this.state.typeReport === 3) {
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
        let title, typeNote = this.state.typeNote;
        let addNote = (typeNote !== 0) ? " hide" : "";
        if (typeNote === 0) title = "Ghi chú";
        else if (typeNote === 1) title = "Thêm ghi chú";
        else if (typeNote === 2) title = "Xóa ghi chú";
        else title = "Sửa ghi chú";
        return (
            <div className="order-tab">
                <div>
                    <div className="notes-list">
                        <div className="title-section">{title}</div>
                        <a className={"add-note-button" + addNote} onClick={this.openAddNote.bind(this)}>Thêm</a>
                        {this.renderNoteList()}
                    </div>
                    <div className="order-area">
                        <div className="title-section">Đơn hàng</div>
                        <a className="add-note-button" onClick={() => {this.openNewOrderModal()}}>Thêm</a>
                        {this.renderOrders()}
                    </div>
                    <div className="report-area">
                        <div className="title-section">Báo xấu</div>
                        <a className="add-note-button" onClick={this.openAddReport.bind(this)}>Thêm</a>
                        {this.renderReportsList()}
                    </div>
                </div>
                <FmsNewOrderModal isShown={this.state.isShownNewOrderModal} project={{alias: this.props.alias}}
                               onClose={this.closeNewOrderModal.bind(this)}/>
                <FmsOrderDetailModal isShown={this.state.isShownOrderDetailModal} typeModal={1}
                                     onClose={this.closeOrderDetailModal.bind(this)}
                                     project={{alias: this.props.alias}} order={this.state.selectedOrder}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        conversation: state.dashboard.chat.conversation,
        notes: state.dashboard.createOrder.notes,
        reports: state.dashboard.createOrder.reports,
        orders: state.dashboard.createOrder.orders
    }
};

export default connect(mapStateToProps)(FmsOrdersTab);
