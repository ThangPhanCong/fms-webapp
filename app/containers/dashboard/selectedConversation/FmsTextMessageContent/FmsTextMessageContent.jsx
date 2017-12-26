import React from 'react';
import { connect } from 'react-redux';

import DashboardApi from '../../../../api/DashboardApi';

import { openPrivateRepModal } from '../../../../actions/dashboard/chat/privateRepModal';

class FmsTextMessageContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHandling: false,
      liked: this.props.message.is_like
    };
    this.openMessageModal = this.openMessageModal.bind(this);
  }

  openMessageModal() {
    this.props.dispatch(openPrivateRepModal(this.props.message));
  }

  handleLikeMessage(state) {
    if (this.state.isHandling === true) return;
    this.setState({isHandling: true});
    DashboardApi.likeMessage(this.props.message._id, state).then(() => {
      this.setState({isHandling: false, liked: state});
    }, () => {
      this.setState({isHandling: false});
      alert('Something went wrong!');
    });
  }

  render() {
    let self = this;
    let actionButton = (this.props.isSelf === false && this.props.type === "comment") ? "" : " hide";

    function renderLikeButton() {
      if (self.state.liked === false) {
        return <a className="action-button-message" onClick={() => {
          self.handleLikeMessage(true)
        }}> Thích</a>
      } else {
        return <a className="action-button-message" onClick={() => {
          self.handleLikeMessage(false)
        }}> Bỏ thích</a>
      }
    }

    function renderMessageButton() {
      if (self.props.message.can_reply_privately === true) {
        return <a className="action-button-message" onClick={self.openMessageModal}>Nhắn tin</a>
      } else {
        return <span className="disabled-action-button-message">Nhắn tin</span>
      }
    }

    return (
      <div>
        <p>{this.props.textMessage}</p>
        <div className={"group-action-button-message" + actionButton}>
          {renderLikeButton()}&nbsp;&nbsp;&nbsp;
          {renderMessageButton()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {}
};
export default connect(mapStateToProps)(FmsTextMessageContent);
