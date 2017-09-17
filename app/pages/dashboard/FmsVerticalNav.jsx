const React = require('react');
const ReactDOM = require('react-dom');

const allImg = require('all.png');
const unreadImg = require('unread.png');
const postImg = require('post.png');
const inboxImg = require('inbox.png');
const starImg = require('star.png');
const phoneImg = require('phone.png');
const unreadPostImg = require('unread_post.png');
const calendarImg =require('calendar.png');
const noteImg = require('note.png');

let FmsToolTip = require('FmsToolTip');

let FmsVerticalNav = React.createClass({
  render: function () {
    return (
      <div ref="vertical_nav">
        <FmsToolTip message="Show all" direction="right">
          <div><img src={allImg} className="vertical-nav-item"/></div>
        </FmsToolTip>
        <FmsToolTip message="Filter by unread" direction="right">
          <div><img src={unreadImg} className="vertical-nav-item"/></div>
        </FmsToolTip>
        <FmsToolTip message="Filter by comment" direction="right">
          <div><img src={postImg} className="vertical-nav-item"/></div>
        </FmsToolTip>
        <FmsToolTip message="Filter by inbox" direction="right">
          <div><img src={inboxImg} className="vertical-nav-item"/></div>
        </FmsToolTip>
        <FmsToolTip message="Filter by review" direction="right">
          <div><img src={starImg} className="vertical-nav-item"/></div>
        </FmsToolTip>
        <FmsToolTip message="Filter if has phone number" direction="right">
          <div><img src={phoneImg} className="vertical-nav-item"/></div>
        </FmsToolTip>
        <FmsToolTip message="Filter by unreplied" direction="right">
          <div><img src={unreadPostImg} className="vertical-nav-item"/></div>
        </FmsToolTip>
        <FmsToolTip message="Filter by date range" direction="right">
          <div><img src={calendarImg} className="vertical-nav-item"/></div>
        </FmsToolTip>
        <FmsToolTip message="Filter by post" direction="right">
          <div><img src={noteImg} className="vertical-nav-item"/></div>
        </FmsToolTip>
      </div>
    );
  }
});

module.exports = FmsVerticalNav;
