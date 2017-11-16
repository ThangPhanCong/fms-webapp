import React from 'react';
import propTypes from 'prop-types';

import tickImg from '../../../images/tick.png';

class FmsPageItemInModal extends React.Component {

  onPageClick() {
    const {
      canSelect,
      isSelected,
      data,
      onSelect,
      onUnSelect,
     } = this.props;

    if (canSelect) {
      if (!isSelected) {
        onSelect(data);
      } else {
        onUnSelect(data);
      }
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
      <div className={"page-item" + disabled} onClick={this.onPageClick.bind(this)}>
        <img src={avaUrl} className="page-profile" />
        <span className="fanpage-title">{this.props.data.name}</span>
        {this.renderActiveImg()}
      </div>
    );
  }
}

FmsPageItemInModal.propTypes = {
  data: propTypes.object.isRequired,
  canSelect: propTypes.bool.isRequired,
  isSelected: propTypes.bool.isRequired,
  onSelect: propTypes.func.isRequired,
  onUnSelect: propTypes.func.isRequired
}

export default FmsPageItemInModal;
