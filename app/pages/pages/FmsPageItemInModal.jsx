'use strict';

const React = require('react');

let FmsPageItemInModal = React.createClass({
  onPageClick: function() {
    if (this.props.onPageClick) {
      this.props.onPageClick(!this.props.isSelected, this.props.data.fb_id);
    }
  },
  renderActiveImg: function() {
    if (this.props.isSelected) {
      return <img src="/img/tick.png" id="tick"/>
    }
  },
  render: function() {
    let self = this;
    let avaUrl = `https://graph.facebook.com/v2.10/${this.props.data.fb_id}/picture`;

    return (
      <div className="page-item" onClick={this.onPageClick}>
        <img src={avaUrl} className="page-profile"/>
        <span className="fanpage-title">{this.props.data.name}</span>
        {this.renderActiveImg()}
      </div>
    );
  }
});

module.exports = FmsPageItemInModal;
