'use strict';

const React = require('react');

let FmsToolTip = require('FmsToolTip');

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
