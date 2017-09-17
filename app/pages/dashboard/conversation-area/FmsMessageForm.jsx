'use strict';

const React = require('react');

const attachImg = require('attachment.png');
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
            <ul className="group-button">
              <li><a href="#">
                <img src={attachImg} className="attach-button"/>
                <input type="file" className="input-file"></input>
                </a></li>
              <li><img src={sendImg} className="send-button" onClick={this.onFormSubmit}/></li>
            </ul>
        </form>
      </div>
    );
  }
});

module.exports = FmsMessageForm;
