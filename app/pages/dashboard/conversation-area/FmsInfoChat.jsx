'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const blockImg = require('block.png');
const blockActiveImg = require('block_active.png');
const fbImgActive = require('facebook_active.png');

const FmsToolTip = require('FmsToolTip');
const blockApi = require('BlockApi');

let FmsInfoChat = React.createClass({
  seen_time: function (time) {
    if (time == undefined || time == null) return "";
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
  },
  blockPerson: function () {
    let self = this;

    let currentConversation = this.props.currentConversation;

    blockApi.blockCustomer(currentConversation.page_fb_id, currentConversation.customer.fb_id)
      .then(data => {
        self.props.updateBlockCustomer(currentConversation, true);
      })
      .catch(err => {
        alert(err.message);
      })
  },
  activePerson: function () {
    let self = this;

    let currentConversation = this.props.currentConversation;

    blockApi.activeCustomer(currentConversation.page_fb_id, currentConversation.customer.fb_id)
      .then(data => {
        self.props.updateBlockCustomer(currentConversation, false);
      })
      .catch(err => {
        alert(err.message);
      })
  },

  render: function () {
    let self = this;
    let customer = this.props.currentConversation.customer;

    return (
      <div ref="info_chat">
        <div className="info-client">
          <div className="title-chat">{this.props.currentConversation.customer.name}</div>
          <div className="message-status">{self.seen_time(this.props.currentConversation.last_seen)}</div>
        </div>
        <div className="option">
          {
            customer.is_blocked ?
              <FmsToolTip message="Bỏ chặn" direction="bottom">
                <img src={blockActiveImg} className="icon-option" onClick={self.activePerson}/>
              </FmsToolTip>
              :
              <FmsToolTip message="Chặn" direction="bottom">
                <img src={blockImg} className="icon-option" onClick={self.blockPerson}/>
              </FmsToolTip>
          }

        </div>
      </div>
    );
  }
});

module.exports = FmsInfoChat;
