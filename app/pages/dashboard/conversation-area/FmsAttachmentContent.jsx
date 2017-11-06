import React from 'react';
import FmsSpin from '../../../components/FmsSpin';

class FmsAttachmentContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: {},
      isLoading: true
    }
    this.updateChatAreaWidth = this.updateChatAreaWidth.bind(this);
    this.attachmentLoadDone = this.attachmentLoadDone.bind(this);
  }
  getSizeImage() {
    if (!this.props.size || this.props.type == "sticker") return {};
    return {
      width: this.state.size.width,
      maxWidth: this.state.size.width,
      height: this.state.size.height,
      maxHeight: this.state.size.height
    }
  }
  updateChatAreaWidth() {
    if (!this.props.size || this.props.type == "sticker") return;
    let size = {};
    let maxWidth = this.props.getChatAreaWidth() * 0.7;
    let oldWidth = this.props.size.width, oldHeight = this.props.size.height;
    if (maxWidth < oldWidth) {
      size.width = maxWidth;
      size.height = maxWidth * oldHeight / oldWidth;
    } else {
      size = this.props.size;
    }
    oldHeight = size.height; oldWidth = size.width;
    if (size.height > 450) {
      size.height = 450;
      size.width = 450 * oldWidth / oldHeight;
    }
    this.setState({ size: size });
  }
  attachmentLoadDone() {
    this.setState({ isLoading: false });
  }
  componentWillMount() {
    if (this.props.type != "sticker") window.addEventListener("resize", this.updateChatAreaWidth);
    this.updateChatAreaWidth();
  }
  componentWillUnmount() {
    if (this.props.type != "sticker") window.removeEventListener("resize", this.updateChatAreaWidth);
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
        <div className={messageAttachment + ' ' + isSticker + hasBorder} style={this.getSizeImage()}>
          <div className={"attach-spin" + spin}>
            <FmsSpin size={27} />
          </div>
          <a href={self.props.origin} target="_blank">
            <img className={"image-attachment" + imgAttach} src={preview} onLoad={this.attachmentLoadDone} />
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
