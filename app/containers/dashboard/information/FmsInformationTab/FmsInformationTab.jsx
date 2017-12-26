import React from 'react';
import { connect } from 'react-redux';
import { createNote, deleteNote, updateNote } from '../../../../actions/dashboard/chat/createOrder';

class FmsInformationTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { type: 0, selectedNote: null };
  }
  static convertTime(time) {
    let date = new Date(time);
    return "Ngày tạo: " + date.getDate() + "/" + (date.getMonth() + 1);
  }
  cancelAddNote() {
    this.setState({ type: 0, selectedNote: null });
  }
  openAddNote() {
    this.setState({ type: 1 });
  }
  confirmAddNote() {
    let content = this.refs.note.value;
    if (!content || content === "") return;
    this.refs.note.value = "";
    this.props.dispatch(createNote(content, this.props.noti));
    this.setState({ type: 0 });
  }
  deleteNote(note) {
    this.setState({ type: 2, selectedNote: note });
  }
  confirmDeleteNote() {
    this.props.dispatch(deleteNote(this.state.selectedNote._id, this.props.noti));
    this.setState({ type: 0, selectedNote: null });
  }
  updateNote(note) {
    this.setState({ type: 3, selectedNote: note });
  }
  confirmUpdateNote() {
    this.props.dispatch(updateNote(this.state.selectedNote._id, this.refs.note.value, this.props.noti));
    this.setState({ type: 0, selectedNote: null });
  }
  renderNotes() {
    if (this.props.notes.length === 0) return <p className="no-note">Chưa có ghi chú nào</p>;
    return this.props.notes.map(note => {
      return <div key={note._id} className="note-text">
        <div>{note.content}</div>
        <div className="note-info-item">{FmsInformationTab.convertTime(note.updated_time)}</div>
        <a className="note-info-item note-option" onClick={() => {this.updateNote(note)}}>Sửa</a>
        <a className="note-info-item note-option" onClick={() => {this.deleteNote(note)}}>Xóa</a>
      </div>
    });
  }
  static renderOrders() {
    return <p className="no-note">Chưa có đơn hàng nào</p>
  }
  renderNoteList() {
    if (this.state.type === 0) {
      return <div>{this.renderNotes()}</div>
    } else if (this.state.type === 1) {
      return <div>
        <textarea ref="note" className="add-note-content" placeholder="Nhập nội dung ghi chú"/>
        <button className="button-note-option danger-button" onClick={this.cancelAddNote.bind(this)}>Hủy</button>
        <button className="button-note-option success-button" onClick={this.confirmAddNote.bind(this)}>Thêm</button>
      </div>
    } else if (this.state.type === 2) {
      return <div>
        <textarea ref="note" className="add-note-content" value={this.state.selectedNote.content} onChange={() => {}}/>
        <button className="button-note-option cancel-button" onClick={this.cancelAddNote.bind(this)}>Hủy</button>
        <button className="button-note-option danger-button" onClick={this.confirmDeleteNote.bind(this)}>Xóa</button>
      </div>
    } else if (this.state.type === 3) {
      return <div>
        <textarea ref="note" className="add-note-content" defaultValue={this.state.selectedNote.content}/>
        <button className="button-note-option danger-button" onClick={this.cancelAddNote.bind(this)}>Hủy</button>
        <button className="button-note-option success-button" onClick={this.confirmUpdateNote.bind(this)}>Cập nhật</button>
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
      <div className="information-tab">
        <div className="notes-list">
          <div className="title-section">{title}</div>
          <a className={"add-note-button" + addNote} onClick={this.openAddNote.bind(this)}>Thêm</a>
          {this.renderNoteList()}
        </div>
        <div>
          <div className="title-section">Đơn hàng</div>
          {FmsInformationTab.renderOrders()}
        </div>
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
