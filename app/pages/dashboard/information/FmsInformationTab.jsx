import React from 'react';
import { connect } from 'react-redux';
import notepadImg from '../../../images/notepad.png';
import { createNote } from '../../../actions/dashboard/chat/createOrder';
import DashboardApi from '../../../api/DashboardApi';

class FmsInformationTab extends React.Component {
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
    return this.props.notes.map(note => {
      return <p key={note._id}>{note.content}</p>
    });
  }
  render() {
    return (
      <div className="information-tab">
        <img src={notepadImg} className="note-icon" />
        <form onSubmit={this.onNoteSubmit.bind(this)}>
          <input type="text" className="note-form" placeholder="Nhập nội dung ghi chú" ref="note"/>
        </form>
        <hr className="order-divider"/><span>Đơn hàng</span>
        {this.renderNotes()}
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
