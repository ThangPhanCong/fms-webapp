import React from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

class FmsToolTip extends React.Component {
  render() {
    const tooltip = <Tooltip id="tooltip">{this.props.message}</Tooltip>;
    return (
      <OverlayTrigger placement={this.props.direction} overlay={tooltip}>
        {this.props.children}
      </OverlayTrigger>
    )
  }
}

FmsToolTip.defaultProps = {
  message: "",
  direction: "right"
};

module.exports = FmsToolTip;
