

import React from 'react';
import tickImg from 'tick.png';

class FmsPageItemInModal extends React.Component {
  constructor(props) {
    super(props);
    this.onPageClick = this.onPageClick.bind(this);
  }
  onPageClick() {
    if (this.props.canSelect) {
      this.props.onPageClick(!this.props.isSelected, this.props.data.fb_id);
    }
  }
  renderActiveImg() {
    if (this.props.isSelected) {
      return <img src={tickImg} className="tick" />
    }
  }
  render() {
    let self = this;
    let avaUrl = `https://graph.facebook.com/v2.10/${this.props.data.fb_id}/picture`;
    let disabled = (this.props.canSelect) ? "" : " disabled";

    return (
      <div className={"page-item" + disabled} onClick={this.onPageClick}>
        <img src={avaUrl} className="page-profile" />
        <span className="fanpage-title">{this.props.data.name}</span>
        {this.renderActiveImg()}
      </div>
    );
  }
}

module.exports = FmsPageItemInModal;
