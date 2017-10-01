const React = require('react');

let FmsPostInfoConversation = React.createClass({
  render: function () {
    return (
      <div className="post-info-conversation">
        <p>{this.props.content.message}</p>
      </div>
    )
  }
});

module.exports = FmsPostInfoConversation;