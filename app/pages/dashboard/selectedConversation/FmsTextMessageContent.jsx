import React from 'react';
import { connect } from 'react-redux';

import FmsToolTip from '../../../components/FmsToolTip';
import FmsPrivateReplyModal from './FmsPrivateReplyModal';
import DashboardApi from '../../../api/DashboardApi';
import FmsSpin from '../../../components/FmsSpin';

import { togglePrivateRepModal } from '../../../actions/dashboard/chat/privateRepModal';

class FmsTextMessageContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHandling: false,
      liked: this.props.message.is_like,
      messaged: false
    }
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.openMessageModal = this.openMessageModal.bind(this);
    this.handleLikeMessage = this.handleLikeMessage.bind(this);
    this.handleUnlikeMessage = this.handleUnlikeMessage.bind(this);
  }
  handleSendMessage() {
    this.props.message.can_reply_privately = false;
    this.setState({ messaged: true });
  }
  openMessageModal() {
    this.props.dispatch(togglePrivateRepModal(true));
  }
  handleLikeMessage() {
    if (this.state.isHandling == true) return;
    this.setState({ isHandling: true });
    DashboardApi.likeMessage(this.props.message._id).then((res) => {
      this.setState({ isHandling: false, liked: true });
    }, (err) => {
      this.setState({ isHandling: false });
      alert('Something went wrong!');
    });
  }
  handleUnlikeMessage() {
    if (this.state.isHandling == true) return;
    this.setState({ isHandling: true });
    DashboardApi.unlikeMessage(this.props.message._id).then((res) => {
      this.setState({ isHandling: false, liked: false });
    }, (err) => {
      this.setState({ isHandling: false });
      alert('Something went wrong!');
    });
  }
  render() {
    let self = this;
    let actionButton = this.props.actionButton ? "" : " hide";
    function renderLikeButton() {
      if (self.state.liked == false) {
        return <a className="action-button-message" onClick={self.handleLikeMessage}>  Thích</a>
      } else {
        return <a className="action-button-message" onClick={self.handleUnlikeMessage}>  Bỏ thích</a>
      }
    };
    function renderMessageButton() {
      if (self.props.message.can_reply_privately == true && self.state.messaged == false) {
        return <a className="action-button-message" onClick={self.openMessageModal}>Nhắn tin</a>
      } else {
        return <span className="disabled-action-button-message">Nhắn tin</span>
      }
    };
    function renderSpinner() {
      if (self.state.isHandling == true) {
        return <div className="spinner-message-item"><FmsSpin size={12} /></div>
      }
    }
    return (
      <div>
        <p>{this.props.message.message}</p>
        <div className={"group-action-button-message" + actionButton}>
          {renderLikeButton()}&nbsp;&nbsp;&nbsp;
          {renderMessageButton()}
        </div>
        <FmsPrivateReplyModal message={this.props.message} handleSendMessage={this.handleSendMessage} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps)(FmsTextMessageContent);
