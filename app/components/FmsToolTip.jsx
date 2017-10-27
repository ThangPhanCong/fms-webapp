

import React from 'react';
import ReactDOM from 'react-dom';

class FmsToolTip extends React.Component {
  componentDidMount() {
    $(ReactDOM.findDOMNode(this.refs.tooltip)).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }
  render() {
    return (
      <a ref="tooltip" data-toggle="tooltip" title={this.props.message} data-placement={this.props.direction}>
        {this.props.children}
      </a>
    )
  }
}
FmsToolTip.defaultProps = {
  message: "",
  direction: "right"
}

module.exports = FmsToolTip;