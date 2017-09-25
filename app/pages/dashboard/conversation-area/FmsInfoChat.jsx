'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const blockImg = require('block.png');
const fbImgActive = require('facebook_active.png');

let FmsToolTip = require('FmsToolTip');

let FmsInfoChat = React.createClass({
  render: function () {
    return (
      <div ref="info_chat">
        <div className="info-client">
          <div className="title-chat">{this.props.currentConversation.customer.name}</div>
          <div className="message-status">Đã xem lúc 02:15 AM</div>
        </div>
        <div className="option">
          <FmsToolTip message="Block this person" direction="bottom">
            <img src={blockImg} className="icon-option"/>
          </FmsToolTip>
        </div>
      </div>
    );
  }
});

module.exports = FmsInfoChat;
