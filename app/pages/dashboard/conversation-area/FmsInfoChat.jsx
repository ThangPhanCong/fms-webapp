'use strict';

const React = require('react');

const blockImg = require('block.png');
const spamImg = require('spam.png');
const fbImg = require('facebook.png');

let FmsInfoChat = React.createClass({
  render: function () {
    let customerFbUrl = `https://fb.com/${this.props.currentConversation.customer.id}`;
    
    return (
      <div>
        <div className="info-client">
          <div className="title-chat">{this.props.currentConversation.customer.name}</div>
          <div className="message-status">Đã xem lúc 02:15 AM</div>
        </div>
        <div className="option">
          <img src={blockImg} className="icon-option block-icon"/>
          <img src={spamImg} className="icon-option"/>
          <a href={customerFbUrl} target="_blank"><img src={fbImg} className="icon-option"/></a>
        </div>
      </div>
    );
  }
});

module.exports = FmsInfoChat;
