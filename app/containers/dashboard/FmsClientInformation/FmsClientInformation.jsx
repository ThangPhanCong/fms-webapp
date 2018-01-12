import React from 'react';
import {connect} from 'react-redux';
import uuid from 'uuid';
import {createNote, deleteNote, updateNote} from '../../../actions/dashboard/chat/createOrder';
import FmsOrderModal from '../../../commons/order-modal/FmsOrderDetailModal';

const NEW_ORDER = 0, ORDER_DETAIL = 1;

class FmsInformationTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 0,
            selectedNote: null,
            isShownOrderModal: false,
            modalType: 0
        };
    }

    static convertTime(time) {
        let date = new Date(time);
        return "Ngày tạo: " + date.getDate() + "/" + (date.getMonth() + 1);
    }

    cancelAddNote() {
        this.setState({type: 0, selectedNote: null});
    }

    openAddNote() {
        this.setState({type: 1});
    }

    openOrderModal(type) {
        this.setState({modalType: type, isShownOrderModal: true});
    }

    closeOrderModal() {
        this.setState({ isShownOrderModal: false});
    }

    confirmAddNote() {
        let content = this.refs.note.value;
        if (!content || content === "") return;
        this.refs.note.value = "";
        this.props.dispatch(createNote(this.props.alias, content));
        this.setState({type: 0});
    }

    deleteNote(note) {
        let allow = confirm("Bạn có muốn xóa ghi chú này?");
        if (allow) {
            this.props.dispatch(deleteNote(this.props.alias, note._id));
        }
    }

    updateNote(note) {
        this.setState({type: 3, selectedNote: note});
    }

    confirmUpdateNote() {
        this.props.dispatch(updateNote(this.props.alias, this.state.selectedNote._id, this.refs.note.value));
        this.setState({type: 0, selectedNote: null});
    }

    renderNotes() {
        if (this.props.notes.length === 0) return <p className="no-note">Chưa có ghi chú nào</p>;
        return this.props.notes.map(note => {
            return <div key={note._id} className="note-text">
                <div>{note.content}</div>
                <div className="note-info-item">{FmsInformationTab.convertTime(note.updated_time)}</div>
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
        return <p className="no-note">Chưa có đơn hàng nào</p>
    }

    renderNoteList() {
        if (this.state.type === 0) {
            return <div>{this.renderNotes()}</div>
        } else if (this.state.type === 1) {
            return <div>
                <textarea ref="note" className="add-note-content" placeholder="Nhập nội dung ghi chú"/>
                <button className="btn button-note-option btn-primary" onClick={this.confirmAddNote.bind(this)}>Thêm
                </button>
                <button className="btn button-note-option btn-default" onClick={this.cancelAddNote.bind(this)}>Hủy
                </button>
            </div>
        } else if (this.state.type === 3) {
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

    render() {
        let title, type = this.state.type;
        let addNote = (type !== 0) ? " hide" : "";
        if (type === 0) title = "Ghi chú";
        else if (type === 1) title = "Thêm ghi chú";
        else if (type === 2) title = "Xóa ghi chú";
        else title = "Sửa ghi chú";
        return (
            <div>
                <div className="title-information">Thông tin khách hàng</div>
                <div className="information-tab">
                    <div className="notes-list">
                        <div className="title-section">{title}</div>
                        <a className={"add-note-button" + addNote} onClick={this.openAddNote.bind(this)}>Thêm</a>
                        {this.renderNoteList()}
                    </div>
                    <div>
                        <div className="title-section">Đơn hàng</div>
                        <a className="add-note-button" onClick={() => {this.openOrderModal(NEW_ORDER)}}>Thêm</a>
                        {this.renderOrders()}
                    </div>
                </div>
                <FmsOrderModal isShown={this.state.isShownOrderModal} typeModal={this.state.modalType}
                               onClose={this.closeOrderModal.bind(this)} key={uuid()}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        conversation: state.dashboard.chat.conversation,
        notes: state.dashboard.createOrder.notes
    }
};

export default connect(mapStateToProps)(FmsInformationTab);
