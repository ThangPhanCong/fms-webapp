'use strict';

const React = require('react');

let FmsToolTip = require('FmsToolTip');
let FmsPrivateReplyModal = require('FmsPrivateReplyModal');

let FmsTextMessageContent = React.createClass({
  getInitialState: function () {
    return {
      liked: false,
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
  render: function () {
    let self = this;
    let actionButton = this.props.actionButton ? "" : " hide";
    function renderLikeButton() {
      if (self.props.message.can_like == true && self.state.liked == false) {
        return <a className="action-button-message">Thích</a>
      } else {
        return <span className="disabled-action-button-message">Thích</span>
      }
    };
    function renderMessageButton() {
      if (self.props.message.can_reply_privately == true && self.state.messaged == false) {
        return <a className="action-button-message" onClick={self.openMessageModal}>Nhắn tin</a>
      } else {
        return <span className="disabled-action-button-message">Nhắn tin</span>
      }
    };
    return (
      <div>
        <p>{this.props.message.message}</p>
        <div className={"group-action-button-message" + actionButton}>
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
