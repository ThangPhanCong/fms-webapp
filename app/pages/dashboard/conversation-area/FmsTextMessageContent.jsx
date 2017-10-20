'use strict';

const React = require('react');

let FmsToolTip = require('FmsToolTip');
let FmsPrivateReplyModal = require('FmsPrivateReplyModal');
let DashboardApi = require('DashboardApi');
let FmsSpin = require('FmsSpin');

let FmsTextMessageContent = React.createClass({
  getInitialState: function () {
    return {
      isHandling: false,
      liked: this.props.message.is_like,
      messaged: false
    }
  },
  handleSendMessage: function () {
    this.props.message.can_reply_privately = false;
    this.setState({ messaged: true });
  },
  openMessageModal: function () {
    this._child.open();
  },
  handleLikeMessage: function () {
    if (this.state.isHandling == true) return;
    this.setState({ isHandling: true });
    DashboardApi.likeMessage(this.props.message._id).then((res) => {
      this.setState({ isHandling: false, liked: true });
    }, (err) => {
      this.setState({ isHandling: false });
      alert('Something went wrong!');
    });
  },
  handleUnlikeMessage: function () {
    if (this.state.isHandling == true) return;
    this.setState({ isHandling: true });
    DashboardApi.unlikeMessage(this.props.message._id).then((res) => {
      this.setState({ isHandling: false, liked: false });
    }, (err) => {
      this.setState({ isHandling: false });
      alert('Something went wrong!');
    });
  },
  render: function () {
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
        return <div className="spinner-message-item"><FmsSpin size={12}/></div>
      }
    }
    return (
      <div>
        <p>{this.props.message.message}</p>
        <div className={"group-action-button-message" + actionButton}>
          {renderSpinner()}
          {renderLikeButton()}&nbsp;&nbsp;&nbsp;
          {renderMessageButton()}
        </div>
        <FmsPrivateReplyModal ref={(child) => {
          this._child = child;
        }} message={this.props.message} handleSendMessage={this.handleSendMessage}/>
      </div>
    );
  }
});

module.exports = FmsTextMessageContent;
