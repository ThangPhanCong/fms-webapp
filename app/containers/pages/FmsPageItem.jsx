import React from 'react';

class FmsPageItem extends React.Component {
  constructor(props) {
    super(props);
    this.onPageClick = this.onPageClick.bind(this);
  }

  onPageClick() {
    this.props.onPageClick(this.props.data);
  }

  render() {
    let avaUrl = `https://graph.facebook.com/v2.10/${this.props.data.fb_id}/picture`;
    return (
      <div className="page-item" onClick={this.onPageClick}>
        <img src={avaUrl} className="page-profile"/>
        <span className="fanpage-title">{this.props.data.name}</span>
      </div>
    );
  }
}

module.exports = FmsPageItem;