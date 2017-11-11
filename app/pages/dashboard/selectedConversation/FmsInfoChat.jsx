import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import blockImg from '../../../images/block.png';
import blockActiveImg from '../../../images/block_active.png';
import fbImgActive from '../../../images/facebook_active.png';

import FmsToolTip from '../../../components/FmsToolTip';
import blockApi from '../../../api/BlockApi';

import { activePerson, blockPerson } from '../../../actions/dashboard/chat/conversationInfo';

class FmsInfoChat extends React.Component {
  activePerson() {
    this.props.dispatch(activePerson());
  }
  blockPerson() {
    this.props.dispatch(blockPerson());
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

  render() {
    let sc = this.props.conversation;
    //console.log(this.props);
    let customer = sc.customer;
    let option = "";
    if (!customer) {
      option = " hide";
      customer = sc.from;
    }

    return (
      <div ref="info_chat">
        <div className="info-client">
          <div className="title-chat">{customer.name}</div>
          <div className="message-status">{this.seen_time(sc.last_seen)}</div>
        </div>
        <div className={"option" + option}>
          {
            customer.is_blocked ?
              <FmsToolTip message="Bỏ chặn" direction="bottom">
                <img src={blockActiveImg} className="icon-option" onClick={this.activePerson.bind(this)} />
              </FmsToolTip>
              :
              <FmsToolTip message="Chặn" direction="bottom">
                <img src={blockImg} className="icon-option" onClick={this.blockPerson.bind(this)} />
              </FmsToolTip>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
		conversation: state.dashboard.chat.conversation
  }
}

export default connect(mapStateToProps)(FmsInfoChat);
