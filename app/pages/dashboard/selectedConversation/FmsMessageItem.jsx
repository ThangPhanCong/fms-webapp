import React from 'react';
import uuid from 'uuid';
import FmsToolTip from '../../../components/FmsToolTip';

import FmsAttachmentContent from './FmsAttachmentContent';
import FmsTextMessageContent from './FmsTextMessageContent';
import DashboardAPI from '../../../api/DashboardApi';
import FmsDate from '../../../helpers/FmsDate';

let attachsFail = [];

class FmsMessageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.message
    }
  }

  attachmentLoadError(previewUrl) {
    let msg = this.state.message;
    if (attachsFail.includes(previewUrl)) return;
    else attachsFail.push(previewUrl);
    DashboardAPI.updateExpiredAttachmentMsg(this.props.type, msg._id)
      .then(res => {
        this.setState({ message: res });
      }, err => {
        console.log(err);
      });
  }

  static convertTime(time) {
    let date = new FmsDate(time);
    return date.getTimeMessageItem();
  }

  renderAttachment() {
    let msg = this.state.message, self = this;
    if (!msg.attachments && !msg.shares) return;
    let isSelf = this.props.isSelf;
    let hasMessage = (msg.message == "") ? -1 : 1;
    if (msg.shares) {
      return msg.shares.map(share => {
        if (share.link && share.link.indexOf("scontent") !== -1) {
          return <FmsAttachmentContent key={uuid()} preview={share.link} isSelf={isSelf} type={'sticker'}
            attachmentLoadError={self.attachmentLoadError.bind(this)} />
        }
      });
    } else {
      return msg.attachments.map((attachment, index) => {
        let data = attachment.data, size;
        if (Array.isArray(data) && data.length > 0) {
          data = data[0];
          if (index > 0) hasMessage = 0;
          size = { width: data.width, height: data.height };
          return <FmsAttachmentContent key={uuid()} hasMessage={hasMessage} origin={data.src}
            isSelf={isSelf} preview={data.preview || data.src} size={size}
            getChatAreaWidth={self.props.getChatAreaWidth} type={attachment.type}
            attachmentLoadError={self.attachmentLoadError.bind(this)} />
        }
      });
    }
  }

  render() {
    let msg = this.state.message;
    let avaUrl = `https://graph.facebook.com/v2.10/${msg.from.fb_id}/picture`;
    let userFb = `https://facebook.com/${msg.from.fb_id}`;
    let isSelf = this.props.isSelf;
    let messageWrapper = (isSelf) ? " right-message-wrapper" : " left-message-wrapper";
    let profileWrapper = (isSelf) ? " right-profile-wrapper" : " left-profile-wrapper";
    let messageContent = (isSelf) ? " right-message-content" : " left-message-content";
    let sentTime = (this.props.isSelf === true) ? " right-sent-time" : " left-sent-time";
    let firstMsg = (this.props.isFirst === " is-first") ? "" : " hide";
    let isLast = (this.props.isLast) ? " last-message" : "";
    let textMessage = msg.message;
    if (textMessage === "" && Array.isArray(msg.shares) && msg.shares[0].name) textMessage = msg.shares[0].name;
    messageContent += (textMessage !== "" ? "" : " hide");
    let sent_time = FmsMessageItem.convertTime(msg.updated_time);

    return (
      <div className={"message-item" + isLast + this.props.isFirst}>
        <div className={"sent-time" + firstMsg + sentTime}>{sent_time}</div>
        <div className={"message-wrapper" + messageWrapper}>
          <div className={"profile-wrapper" + profileWrapper}>
            <FmsToolTip message={msg.from.name} direction={(isSelf) ? "right" : "left"}>
              <a href={userFb} target="_blank"><img src={avaUrl} className={"profile-message" + firstMsg} /></a>
            </FmsToolTip>
          </div>
          <div className={"message-content" + messageContent}>
            <FmsTextMessageContent textMessage={textMessage} message={msg} isSelf={isSelf} type={this.props.type} />
          </div>
        </div>
        {this.renderAttachment()}
      </div>
    );
  }
}

module.exports = FmsMessageItem;
