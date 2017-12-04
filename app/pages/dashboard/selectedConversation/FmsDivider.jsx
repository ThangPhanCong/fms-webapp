import React from 'react';

class FmsDivider extends React.Component {
  render() {
    return (
      <div className="divider-wrapper">
        <hr className="divider"/>
        <div className="divider-text">{this.props.text}</div>
      </div>
    )
  }
}

module.exports = FmsDivider;