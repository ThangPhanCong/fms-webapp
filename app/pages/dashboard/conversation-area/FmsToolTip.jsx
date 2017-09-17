'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

let FmsToolTip = React.createClass({
  getDefaultProps: function() {
    return {
      message: "",
      direction: "right"
    }
  },
  componentDidMount: function () {
    $(ReactDOM.findDOMNode(this.refs.tooltip)).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  },
  render: function () {
    return (
      <a ref="tooltip" data-toggle="tooltip" title={this.props.message} data-placement={this.props.direction}
        href={this.props.link} target={this.props.target}>
        {this.props.children}
      </a>
    )
  }
});

module.exports = FmsToolTip;