'use strict';

const React = require('react');

const FmsNavigation = require('FmsNavigation');

let FmsApp = React.createClass({
  render: function () {
    return (
      <div>
        <FmsNavigation location={this.props.location} params={this.props.params}/>
        {this.props.children}
      </div>
    );
  }
});

module.exports = FmsApp;
