import React from 'react';
import FmsSpin from '../../../components/FmsSpin';

class FmsAttachmentContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }
  attachmentLoadDone() {
    this.setState({ isLoading: false });
  }
  render() {
    let self = this;
    let messageAttachment = (this.props.isSelf) ? "right-message-attachment" : "left-message-attachment";
    let hasMessage;
    if (this.props.hasMessage == 1) {
      hasMessage = " has-message";
    } else if (this.props.hasMessage == 0) {
      hasMessage = " in-the-middle";
    } else {
      hasMessage = " no-message";
    }
    let spin = (this.state.isLoading) ? "" : " hide";
    let imgAttach = (this.state.isLoading) ? " hide" : "";
    let isSticker = (self.props.type == "sticker") ? " sticker" : "";
    let hasBorder = (this.state.isLoading) ? "" : " no-border";
    let preview = self.props.preview;
    let msgAttachWrapper = (self.props.preview == "" || self.props.preview == null || self.props.preview == undefined) ? " hide" : "";

    return (
      <div className={"message-attachment-wrapper" + hasMessage + msgAttachWrapper}>
        <div className={messageAttachment + ' ' + isSticker + hasBorder}>
          <div className={"attach-spin" + spin}>
            <FmsSpin size={27} />
          </div>
          <a href={self.props.origin} target="_blank">
            <img className={"image-attachment" + imgAttach} src={preview} onLoad={this.attachmentLoadDone.bind(this)} />
          </a>
        </div>
      </div>
    )
  }
}
FmsAttachmentContent.defaultProps = {
  isSelf: false,
  hasMessage: -1
}

module.exports = FmsAttachmentContent;
