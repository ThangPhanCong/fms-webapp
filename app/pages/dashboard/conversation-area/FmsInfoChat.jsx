

import React from 'react';
import ReactDOM from 'react-dom';

import blockImg from 'block.png';
import blockActiveImg from 'block_active.png';
import fbImgActive from 'facebook_active.png';

import FmsToolTip from 'FmsToolTip';
import blockApi from 'BlockApi';

class FmsInfoChat extends React.Component {
  constructor(props) {
    super(props);
    this.blockPerson = this.blockPerson.bind(this);
    this.activePerson = this.activePerson.bind(this);
  }
  seen_time(time) {
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
  }
  blockPerson() {
    let self = this;

    let currentConversation = this.props.currentConversation;

    blockApi.blockCustomer(currentConversation.page_fb_id, currentConversation.customer.id)
      .then(data => {
        self.props.updateBlockCustomer(currentConversation, true);
      })
      .catch(err => {
        alert(err.message);
      })
  }
  activePerson() {
    let self = this;

    let currentConversation = this.props.currentConversation;

    blockApi.activeCustomer(currentConversation.page_fb_id, currentConversation.customer.id)
      .then(data => {
        self.props.updateBlockCustomer(currentConversation, false);
      })
      .catch(err => {
        alert(err.message);
      })
  }

  render() {
    let self = this;
    let customer = this.props.currentConversation.customer;
    let option = "";
    if (!customer) {
      option = " hide";
      customer = this.props.currentConversation.from;
    }

    return (
      <div ref="info_chat">
        <div className="info-client">
          <div className="title-chat">{customer.name}</div>
          <div className="message-status">{self.seen_time(this.props.currentConversation.last_seen)}</div>
        </div>
        <div className={"option" + option}>
          {
            customer.is_blocked ?
              <FmsToolTip message="Bỏ chặn" direction="bottom">
                <img src={blockActiveImg} className="icon-option" onClick={self.activePerson} />
              </FmsToolTip>
              :
              <FmsToolTip message="Chặn" direction="bottom">
                <img src={blockImg} className="icon-option" onClick={self.blockPerson} />
              </FmsToolTip>
          }

        </div>
      </div>
    );
  }
}

module.exports = FmsInfoChat;
