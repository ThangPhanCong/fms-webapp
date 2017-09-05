const React = require('react');

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
            <img src="/img/send.png" className="send-button"/>
            <img src="/img/attach.png" className="attach-button"/>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = FmsMessageForm;