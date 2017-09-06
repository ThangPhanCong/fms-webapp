'use strict';

const React = require('react');

const attachImg = require('attach.png');
const sendImg = require('send.png');

let FmsMessageForm = React.createClass({
  onFormSubmit: function (e) {
    e.preventDefault();
  },
  render: function () {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <div className="input-wrapper">
            <input className="input-area" ref="message" rows="3" placeholder="Soạn tin nhắn..."/>
            <img src={sendImg} className="send-button"/>
            <img src={attachImg} className="attach-button"/>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = FmsMessageForm;
