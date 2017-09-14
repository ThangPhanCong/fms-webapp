'use strict';

const React = require('react');

let FmsTextMessageContent = React.createClass({
  render: function () {
    return (
      <div>
        <p>{this.props.content}</p>
      </div>
    );
  }
});

module.exports = FmsTextMessageContent;
