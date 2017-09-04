const React = require('react');

let FmsMessageForm = React.createClass({
  onFormSubmit: function (e) {
    e.preventDefault();
  },
  render: function () {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <div className="btn-group-vertical">
            <button className="btn btn-default"><i className="glyphicon glyphicon-send"></i></button>
            <button className="btn btn-default"><i className="glyphicon glyphicon-picture"></i></button>
          </div>
          <div className="wrap-textarea">
            <textarea className="message-area" ref="message" rows="3" placeholder="Soạn tin nhắn..."/>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = FmsMessageForm;