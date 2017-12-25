import React from 'react';
import {connect} from 'react-redux';

import allImg from '../../images/all.png';
import unreadImg from '../../images/unread.png';
import postImg from '../../images/post.png';
import inboxImg from '../../images/inbox.png';

import allImgActive from '../../images/all_active.png';
import unreadImgActive from '../../images/unread_active.png';
import postImgActive from '../../images/post_active.png';
import inboxImgActive from '../../images/inbox_active.png';


import FmsToolTip from '../../commons/FmsToolTip/FmsToolTip';
import { handleTypeFilterClick } from '../../actions/dashboard/filters';

class FmsVerticalNav extends React.Component {
  handleTypeFilterClick(position) {
    this.props.dispatch(handleTypeFilterClick(position));
  }

  render() {
    let inactive = [allImg, unreadImg, postImg, inboxImg];
    let active = [allImgActive, unreadImgActive, postImgActive, inboxImgActive];
    let className = [];
    let src = [];
    for (let i = 0; i < this.props.filters.length; i++) {
      if (this.props.filters[i].isActive === true) {
        src.push(active[i]);
        className.push(" vertical-item-active");
      } else {
        src.push(inactive[i]);
        className.push("");
      }
    }
    return (
      <div ref="vertical_nav">
        <FmsToolTip message="Hiển thị tất cả" direction="right">
          <div onClick={() => {
            this.handleTypeFilterClick(0)
          }}>
            <img src={src[0]} className={"vertical-nav-item" + className[0]}/>
          </div>
        </FmsToolTip>
        <FmsToolTip message="Chưa đọc" direction="right">
          <div onClick={() => {
            this.handleTypeFilterClick(1)
          }}>
            <img src={src[1]} className={"vertical-nav-item" + className[1]}/>
          </div>
        </FmsToolTip>
        <FmsToolTip message="Bình luận" direction="right">
          <div onClick={() => {
            this.handleTypeFilterClick(2)
          }}>
            <img src={src[2]} className={"vertical-nav-item" + className[2]}/>
          </div>
        </FmsToolTip>
        <FmsToolTip message="Tin nhắn" direction="right">
          <div onClick={() => {
            this.handleTypeFilterClick(3)
          }}>
            <img src={src[3]} className={"vertical-nav-item" + className[3]}/>
          </div>
        </FmsToolTip>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filters: state.dashboard.filters.filters
  }
};

export default connect(mapStateToProps)(FmsVerticalNav);
