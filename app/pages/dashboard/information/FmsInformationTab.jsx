import React from 'react';
import { connect } from 'react-redux';
import notepadImg from '../../../images/notepad.png';
import { createNote } from '../../../actions/dashboard/chat/createOrder';

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
  render() {
    return (
      <div className="information-tab">
        <img src={notepadImg} className="note-icon" />
        <form onSubmit={this.onNoteSubmit.bind(this)}>
          <input type="text" className="note-form" placeholder="Nhập nội dung ghi chú" ref="note"/>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    conversation: state.dashboard.chat.conversation
  }
}

export default connect(mapStateToProps)(FmsInformationTab);
