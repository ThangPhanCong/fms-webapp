import React from 'react';
import { connect } from 'react-redux';
import { createNote } from '../../../actions/dashboard/chat/createOrder';
import DashboardApi from '../../../api/DashboardApi';

class FmsInformationTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isShownAddNote: false };
  }
  convertTime(time) {
    let date = new Date(time);
    return "Ngày tạo: " + date.getDate() + "/" + (date.getMonth() + 1);
  }
  openAddNote() {
    this.setState({ isShownAddNote: true });
  }
  cancelAddNote() {
    this.setState({ isShownAddNote: false });
  }
  confirmAddNote() {
    let content = this.refs.note.value;
    if (!content || content == "") return;
    this.refs.note.value = "";
    this.props.dispatch(createNote(content, this.props.noti));
    this.setState({ isShownAddNote: false });
  }
  renderNotes() {
    if (this.props.notes.length == 0) return <p className="no-note">Chưa có ghi chú nào</p>
    return this.props.notes.map(note => {
      return <div key={note._id} className="note-text">
        <div>{note.content}</div>
        <div className="note-info-item">{this.convertTime(note.updated_time)}</div>
        <a className="note-info-item note-option">Sửa</a>
        <a className="note-info-item note-option">Xóa</a>
      </div>
    });
  }
  renderOrders() {
    return <p className="no-note">Chưa có đơn hàng nào</p>
  }
  renderNoteList() {
    if (this.state.isShownAddNote != true) {
      return <div>{this.renderNotes()}</div>
    } else {
      return <div>
        <textarea ref="note" row={3} className="add-note-content" placeholder="Nhập nội dung ghi chú"></textarea>
        <button className="add-note-option" onClick={this.cancelAddNote.bind(this)}>Hủy</button>
        <button className="add-note-option" onClick={this.confirmAddNote.bind(this)}>Thêm</button>
      </div>
    }
  }
  render() {
    let addNote = (this.state.isShownAddNote == true) ? " hide" : "";
    return (
      <div className="information-tab">
        <div className="notes-list">
          <div className="title-section">Ghi chú</div>
          <a className={"add-note-button" + addNote} onClick={this.openAddNote.bind(this)}>Thêm</a>
          {this.renderNoteList()}
        </div>
        <div>
          <div className="title-section">Đơn hàng</div>
          {this.renderOrders()}
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
}

export default connect(mapStateToProps)(FmsInformationTab);
