import React from 'react';
import {connect} from 'react-redux';

import tickImg from '../../../images/tick.png';
import {selectPageModal} from "../../../actions/setting/setting-page";
class FmsPageItemInModal extends React.Component {
  onPageClick() {
    let { canSelect, dispatch, isSelected, data } = this.props;
    if (canSelect) {
      dispatch(selectPageModal(!isSelected, data.fb_id));
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

const mapStateToProps = state => {
  return {}
}
export default connect(mapStateToProps)(FmsPageItemInModal);
