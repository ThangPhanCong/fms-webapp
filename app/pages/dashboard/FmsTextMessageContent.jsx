'use strict';

const React = require('react');

let FmsTextMessageContent = React.createClass({
  render: function () {
    return (
      <div>
        <span>{this.props.content}</span>
      </div>
    );
  }
});

module.exports = FmsTextMessageContent;