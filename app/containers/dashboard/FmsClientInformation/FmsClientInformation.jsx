import React from 'react';
import {connect} from 'react-redux';
import {
    createNote, createReport, deleteNote, deleteReport, updateNote,
    updateReport, getAllOrders
} from '../../../actions/dashboard/chat/createOrder';
import FmsNewOrderModal from '../../../commons/order-modal/FmsCreateOrderModal';
import FmsOrderDetailModal from '../../../commons/order-modal/FmsOrderDetailModal';
import * as DashboardApi from "../../../api/DashboardApi";

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
            isShownOrderDetailModal: false,
            customers: [],
            posts: []
        };
    }

    convertTime(time) {
        let date = new Date(time);
        return "Ngày tạo: " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    }

    calFee(order) {
        let fee = 0;
        order.products.forEach(p => {
            fee += p.price * p.quantity - p.discount;
        });
        if (order.is_pay) fee += " (Đã thanh toán)";
        else fee += " (Chưa thanh toán)";
        return fee;
    }

    showProducts(order) {
        if (!order.products || order.products.length === 0) return "Chưa có sản phẩm nào";
        let ids = order.products.map(p => p.id);
        return ids.join(", ");
    }

    orderAddress(order) {
        let addr = [];
        if (order.full_address) addr.push(order.full_address);
        if (order.ward) addr.push(order.ward);
        if (order.district) addr.push(order.district);
        if (order.province) addr.push(order.province);
        let ret = addr.join(", ");
        return ret || "Chưa có";
    }

    //---------------------Order Modals-----------------------------
    getConversation() {
        DashboardApi.getConversation(this.props.conversation.id)
            .then(conv => {
                let customers = conv.customer ? [conv.customer] : conv.customers;
                let posts = conv.customer ? conv.customer.posts : [conv.parent_fb_id];
                this.setState({customers, posts});
            }, err => {
                console.log(err);
            })
    }

    openNewOrderModal() {
        this.setState({isShownNewOrderModal: true});
        this.getConversation();
    }

    closeNewOrderModal() {
        this.setState({isShownNewOrderModal: false});
        this.props.dispatch(getAllOrders(this.props.alias));
    }

    openOrderDetailModal(order) {
        this.setState({isShownOrderDetailModal: true, selectedOrder: order});
        this.getConversation();
    }

    closeOrderDetailModal() {
        this.setState({isShownOrderDetailModal: false});
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
        let allow = confirm("Bạn có muốn xóa báo x này?");
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
            let temp = orders.map((order, index) => {
                let custom = "";
                let color = (order.order_tag) ? order.order_tag.color : "";
                let name = (order.order_tag) ? order.order_tag.name : "";
                if (index === orders.length - 1) custom = " last";
                return <div key={order._id} className={"order-item" + custom}
                            onClick={() => {
                                this.openOrderDetailModal(order)
                            }}>
                    <div className={"order-header"}>
                        <span style={{fontWeight:600, marginRight: "5px"}}>{"#" + order.id}</span>
                        <span style={{backgroundColor: color}} className="order-tag">{name}</span>
                    </div>
                    <div><span className="order-detail-title">Địa chỉ: </span>
                        {this.orderAddress(order)}
                    </div>
                    <div><span className="order-detail-title">SĐT: </span>
                        {order.customer_phone ? order.customer_phone : "Chưa có"}
                    </div>
                    <div><span className="order-detail-title">Sản phẩm: </span>
                        {this.showProducts(order)}
                    </div>
                    <div><span className="order-detail-title">Thành tiền: </span>
                        {this.calFee(order)}
                    </div>
                </div>
            });
            let ordersView = [];
            temp.forEach((ov, idx) => {
                if (idx !== 0) {
                    ordersView.push(<div className="divider" key={1234 * idx}/>);
                }
                ordersView.push(ov);
            });
            return ordersView;
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
                {this.props.conversation.page_fb_id === report.from.fb_id ?
                    <span>
                        <a className="note-info-item note-option" onClick={() => {
                            this.updateReport(report)
                        }}>Sửa</a>
                        <a className="note-info-item note-option" onClick={() => {
                            this.deleteReport(report)
                        }}>Xóa</a>
                    </span> :
                    null
                }
            </div>
        });
    }

    renderReportsList() {
        if (this.state.typeReport === 0) {
            return <div>{this.renderReports()}</div>
        } else if (this.state.typeReport === 1) {
            return <div>
                <textarea ref="report" className="add-note-content" placeholder="Nhập nội dung báo xấu"/>
                <button className="btn button-note-option btn-primary" onClick={this.confirmAddReport.bind(this)}>Báo
                    xấu
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
        let conv = this.props.conversation;
        if (!conv) return <span/>;
        let addNote = (typeNote !== 0) ? " hide" : "";
        let isHide = (conv && conv.type === "inbox") ? "" : " hide";

        if (typeNote === 0) title = "Ghi chú";
        else if (typeNote === 1) title = "Thêm ghi chú";
        else if (typeNote === 2) title = "Xóa ghi chú";
        else title = "Sửa ghi chú";

        return (
            <div className="order-tab">
                <div>
                    <div className="info">Thông tin</div>
                    <div className={"order-area section"}>
                        <div className="title-section">Đơn hàng</div>
                        <a className="add-note-button" onClick={() => {
                            this.openNewOrderModal()
                        }}>Thêm</a>
                        {this.renderOrders()}
                    </div>
                    <div className="notes-list section">
                        <div className="title-section">{title}</div>
                        <a className={"add-note-button" + addNote} onClick={this.openAddNote.bind(this)}>Thêm</a>
                        {this.renderNoteList()}
                    </div>
                    {conv.type === "inbox" ?
                        <div className={"report-area section" + isHide}>
                            <div className="title-section">Báo xấu</div>
                            <a className="add-note-button" onClick={this.openAddReport.bind(this)}>Thêm</a>
                            {this.renderReportsList()}
                        </div>
                        :
                        null
                    }
                </div>
                <div>
                    <FmsNewOrderModal isShown={this.state.isShownNewOrderModal} project={{alias: this.props.alias}}
                                      onClose={this.closeNewOrderModal.bind(this)} customer={this.state.customers}
                                      posts={this.state.posts}/>
                    <FmsOrderDetailModal isShown={this.state.isShownOrderDetailModal} typeModal={1}
                                         onClose={this.closeOrderDetailModal.bind(this)} customer={this.state.customers}
                                         project={{alias: this.props.alias}} order={this.state.selectedOrder}
                                         posts={this.state.posts}/>
                </div>
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
