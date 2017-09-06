const React = require('react');

let FmsInfoChat = React.createClass({
  render: function () {
    return (
      <div> 
        <div className="info-client">
          <div className="title-chat">{this.props.clientName}</div>
          <div className="message-status">Đã xem lúc 02:15 AM</div>
        </div>
        <div className="option">
          <img src="/img/block.png" className="icon-option block-icon"/>
          <img src="/img/spam.png" className="icon-option"/>
          <img src="/img/facebook.png" className="icon-option"/>
        </div>
      </div>
    );
  }
});

module.exports = FmsInfoChat;