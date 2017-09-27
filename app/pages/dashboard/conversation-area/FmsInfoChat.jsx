'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const blockImg = require('block.png');
const fbImgActive = require('facebook_active.png');

let FmsToolTip = require('FmsToolTip');

let FmsInfoChat = React.createClass({
  render: function () {
    function seen_time (time) {
      let date = new Date(time);
      let current = new Date();

      let cday = current.getDate();
      let cmonth = current.getMonth() + 1;
      let cyear = current.getFullYear();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      let res = "Đã xem";
      let whatday;
      if (cyear == year && cmonth == month && cday == day) whatday = " hôm nay";
      else if (cyear == year && cmonth == month && cday - day == 1) whatday = " hôm qua";
      else whatday = " ngày " + day + "/" + month;

      let hour = (date.getHours() > 9) ? date.getHours() : "0" + date.getHours();
      let minute = (date.getMinutes() > 9) ? date.getMinutes() : "0" + date.getMinutes();
      let moment = " lúc " + hour + ":" + minute;
      return res + whatday + moment;
    };
    return (
      <div ref="info_chat">
        <div className="info-client">
          <div className="title-chat">{this.props.currentConversation.customer.name}</div>
          <div className="message-status">{seen_time(this.props.currentConversation.last_seen)}</div>
        </div>
        <div className="option">
          <FmsToolTip message="Block this person" direction="bottom">
            <img src={blockImg} className="icon-option"/>
          </FmsToolTip>
        </div>
      </div>
    );
  }
});

module.exports = FmsInfoChat;
