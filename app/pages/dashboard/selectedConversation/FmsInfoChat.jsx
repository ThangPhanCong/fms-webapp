import React from 'react';
import {connect} from 'react-redux';

import blockImg from '../../../images/block.png';
import blockActiveImg from '../../../images/block_active.png';
import fbImg from '../../../images/facebook.png';

import FmsToolTip from '../../../components/FmsToolTip';

import {blockPerson} from '../../../actions/dashboard/chat/conversationInfo';
import FmsDate from '../../../helpers/FmsDate';

class FmsInfoChat extends React.Component {
  activePerson() {
    this.props.dispatch(blockPerson(false));
  }

  blockPerson() {
    this.props.dispatch(blockPerson(true));
  }

  static converTime(time) {
    if (!time) return "Đã xem vừa xong";
    let date = new FmsDate(time);
    return date.getTimeInfoChat();
  }

  render() {
    let sc = this.props.conversation;
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
          <div className="message-status">{FmsInfoChat.converTime(sc.last_seen)}</div>
        </div>
        <div className={"option" + option}>
          {
            sc.link ?
              <FmsToolTip message="Đi tới hội thoại trên facebook" direction="bottom">
                <a href={"https://facebook.com" + sc.link} target="_blank">
                  <img src={fbImg} className="icon-option"/>
                </a>
              </FmsToolTip>
              :
              <span/>
          }
          {
            customer.is_blocked ?
              <FmsToolTip message="Bỏ chặn" direction="bottom">
                <img src={blockActiveImg} className="icon-option" onClick={this.activePerson.bind(this)}/>
              </FmsToolTip>
              :
              <FmsToolTip message="Chặn" direction="bottom">
                <img src={blockImg} className="icon-option" onClick={this.blockPerson.bind(this)}/>
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
};

export default connect(mapStateToProps)(FmsInfoChat);
