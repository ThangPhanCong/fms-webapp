'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const blockImg = require('block.png');
const spamImg = require('spam.png');
const fbImg = require('facebook.png');

let FmsToolTip = require('FmsToolTip');

let FmsInfoChat = React.createClass({
  render: function () {
    let customerFbUrl = `https://fb.com/${this.props.currentConversation.customer.id}`;
    
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
          <FmsToolTip message="Stop receiving messages" direction="bottom">
            <img src={spamImg} className="icon-option"/>
          </FmsToolTip>
          <FmsToolTip message="Go to client's facebook" direction="bottom" link={customerFbUrl} target="_blank">
            <img src={fbImg} className="icon-option"/>
          </FmsToolTip>
        </div>
      </div>
    );
  }
});

module.exports = FmsInfoChat;
