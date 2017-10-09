const React = require('react');
const ReactDOM = require('react-dom');

const allImg = require('all.png');
const unreadImg = require('unread.png');
const postImg = require('post.png');
const inboxImg = require('inbox.png');
const starImg = require('star.png');
const phoneImg = require('phone.png');
const unreadPostImg = require('unread_post.png');
const calendarImg = require('calendar.png');
const noteImg = require('note.png');

const allImgActive = require('all_active.png');
const unreadImgActive = require('unread_active.png');
const postImgActive = require('post_active.png');
const inboxImgActive = require('inbox_active.png');
const starImgActive = require('star_active.png');
const phoneImgActive = require('phone_active.png');
const unreadPostImgActive = require('unread_post_active.png');
const calendarImgActive = require('calendar_active.png');
const noteImgActive = require('note_active.png');

let FmsToolTip = require('FmsToolTip');

let FmsVerticalNav = React.createClass({
  handleVerItemClick: function (position) {
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
  },
  render: function () {
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
          <div onClick={() => {this.handleVerItemClick(0)}}>
            <img src={src[0]} className={"vertical-nav-item" + className[0]} />
          </div>
        </FmsToolTip>
        <FmsToolTip message="Filter by unread" direction="right">
          <div onClick={() => {this.handleVerItemClick(1)}}>
            <img src={src[1]} className={"vertical-nav-item" + className[1]} />
          </div>
        </FmsToolTip>
        <FmsToolTip message="Filter by comment" direction="right">
          <div onClick={() => {this.handleVerItemClick(2)}}>
            <img src={src[2]} className={"vertical-nav-item" + className[2]} />
          </div>
        </FmsToolTip>
        <FmsToolTip message="Filter by inbox" direction="right">
          <div onClick={() => {this.handleVerItemClick(3)}}>
            <img src={src[3]} className={"vertical-nav-item" + className[3]} />
          </div>
        </FmsToolTip>
      </div>
    );
  }
});

module.exports = FmsVerticalNav;
