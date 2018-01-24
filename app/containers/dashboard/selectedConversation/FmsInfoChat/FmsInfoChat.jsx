import React from 'react';
import {connect} from 'react-redux';

import blockImg from '../../../../assets/images/block.png';
import blockActiveImg from '../../../../assets/images/block_active.png';
import fbImg from '../../../../assets/images/facebook.png';

import FmsToolTip from '../../../../commons/FmsToolTip/FmsToolTip';

import {blockPerson} from '../../../../actions/dashboard/chat/conversationInfo';
import FmsDate from '../../../../helpers/FmsDate';
import utils from '../../../../helpers/utils';

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
    let is_blocked = utils.parseCustomer(sc, "is_blocked");
    let name = utils.parseCustomer(sc, "name");

    return (
      <div ref="info_chat">
        <div className="info-client">
          <div className="title-chat">{name}</div>
          <div className="message-status">{FmsInfoChat.converTime(sc.last_seen)}</div>
        </div>
        <div className={"option"}>
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
            is_blocked ?
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
