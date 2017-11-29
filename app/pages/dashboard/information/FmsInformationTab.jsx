import React from 'react';
import { connect } from 'react-redux';
import { createNote } from '../../../actions/dashboard/chat/createOrder';
import DashboardApi from '../../../api/DashboardApi';

class FmsInformationTab extends React.Component {
  convertTime(time) {
    let date = new Date(time);
    return date.getDate() + "/" + (date.getMonth() + 1);
  }
  onNoteSubmit(e) {
    e.preventDefault();
    if (!this.props.conversation) {
      alert("Bạn chưa chọn cuộc hội thoại nào.");
      return;
    }
    let content = this.refs.note.value;
    this.refs.note.value = "";
    this.props.dispatch(createNote(content, this.props.noti));
  }
  renderNotes() {
    if (this.props.notes.length == 0) return <p className="no-note">Chưa có ghi chú nào</p>
    return this.props.notes.map(note => {
      return <p key={note._id} className="note-text">
        <span className="note-date">{this.convertTime(note.updated_time) + ": "}</span>{note.content}
      </p>
    });
  }
  renderOrders() {
    return <p className="no-note">Chưa có đơn hàng nào</p>
  }
  render() {
    return (
      <div className="information-tab">
        <form onSubmit={this.onNoteSubmit.bind(this)}>
          <input type="text" className="note-form" placeholder="Nhập nội dung ghi chú" ref="note" />
        </form>
        <div className="notes-list">
          {this.renderNotes()}
        </div>
        <div>
          <p className="order-title">Đơn hàng</p>
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
