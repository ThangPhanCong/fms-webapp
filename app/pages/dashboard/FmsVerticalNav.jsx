import React from 'react';
import ReactDOM from 'react-dom';

import allImg from 'all.png';
import unreadImg from 'unread.png';
import postImg from 'post.png';
import inboxImg from 'inbox.png';
import starImg from 'star.png';
import phoneImg from 'phone.png';
import unreadPostImg from 'unread_post.png';
import calendarImg from 'calendar.png';
import noteImg from 'note.png';

import allImgActive from 'all_active.png';
import unreadImgActive from 'unread_active.png';
import postImgActive from 'post_active.png';
import inboxImgActive from 'inbox_active.png';
import starImgActive from 'star_active.png';
import phoneImgActive from 'phone_active.png';
import unreadPostImgActive from 'unread_post_active.png';
import calendarImgActive from 'calendar_active.png';
import noteImgActive from 'note_active.png';

import FmsToolTip from 'FmsToolTip';

class FmsVerticalNav extends React.Component {
  handleVerItemClick(position) {
    let newFilters = this.props.state;
    for (let i = 0; i < newFilters.length; i++) {
      if (newFilters[i].isTag) continue;
      if (i == position) newFilters[i].isActive = !newFilters[i].isActive;
      else {
        if (position == 0) newFilters[i].isActive = false;
        else newFilters[0].isActive = false
        if (position == 2 && i == 3) newFilters[i].isActive = false;
        else if (position == 3 && i == 2) newFilters[i].isActive = false;
      }
    }
    let isShowAll = true;
    newFilters.forEach((filter) => {
      if (filter.isActive == true && !filter.isTag) isShowAll = false;
    });
    if (isShowAll == true) newFilters[0].isActive = true;
    this.props.handleFilter(newFilters);
  }
  render() {
    let inactive = [allImg, unreadImg, postImg, inboxImg];
    let active = [allImgActive, unreadImgActive, postImgActive, inboxImgActive];
    let className = [];
    let src = [];
    for (let i = 0; i < this.props.state.length; i++) {
      if (this.props.state[i].isActive == true) {
        src.push(active[i]);
        className.push(" vertical-item-active");
      } else {
        src.push(inactive[i]);
        className.push("");
      }
    }
    return (
      <div ref="vertical_nav">
        <FmsToolTip message="Show all" direction="right">
          <div onClick={() => { this.handleVerItemClick(0) }}>
            <img src={src[0]} className={"vertical-nav-item" + className[0]} />
          </div>
        </FmsToolTip>
        <FmsToolTip message="Filter by unread" direction="right">
          <div onClick={() => { this.handleVerItemClick(1) }}>
            <img src={src[1]} className={"vertical-nav-item" + className[1]} />
          </div>
        </FmsToolTip>
        <FmsToolTip message="Filter by comment" direction="right">
          <div onClick={() => { this.handleVerItemClick(2) }}>
            <img src={src[2]} className={"vertical-nav-item" + className[2]} />
          </div>
        </FmsToolTip>
        <FmsToolTip message="Filter by inbox" direction="right">
          <div onClick={() => { this.handleVerItemClick(3) }}>
            <img src={src[3]} className={"vertical-nav-item" + className[3]} />
          </div>
        </FmsToolTip>
      </div>
    );
  }
}

module.exports = FmsVerticalNav;
