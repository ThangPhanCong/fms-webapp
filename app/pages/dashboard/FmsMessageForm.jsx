'use strict';

const React = require('react');

const attachImg = require('attach.png');
const sendImg = require('send.png');

let FmsMessageForm = React.createClass({
  onFormSubmit: function (e) {
    e.preventDefault();
    let v = this.refs.message;
    if (v.value != '') this.props.sendMessage(this.refs.message.value);
    v.value = '';
  },
  render: function () {
    return (
      <div>
        <form onSubmit={this.onFormSubmit} className="input-wrapper">
            <input className="input-text" ref="message" rows="3" placeholder="Soạn tin nhắn..."/>
            <div className="group-button">
              <img src={sendImg} className="send-button" onClick={this.onFormSubmit}/>
              <img src={attachImg} className="attach-button"/>
            </div>
        </form>
      </div>
    );
  }
});

module.exports = FmsMessageForm;
