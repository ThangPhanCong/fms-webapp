const React = require('react');

let FmsAttachmentContent = React.createClass({
  getDefaultProps: function () {
    return {
      isSelf: false,
      hasMessage: -1
    };
  },
  getInitialState: function () {
    return {
      size: {}
    }
  },
  getSizeImage: function () {
    if (!this.props.size || this.props.type == "sticker") return {};
    return {
      width: this.state.size.width,
      height: this.state.size.height
    }
  },
  updateChatAreaWidth: function () {
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
  },
  componentWillMount: function () {
    if (this.props.type != "sticker") window.addEventListener("resize", this.updateChatAreaWidth);
    this.updateChatAreaWidth();
  },
  componentWillUnmount: function() {
		if (this.props.type != "sticker") window.removeEventListener("resize", this.updateChatAreaWidth);
	},
  render: function () {
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
    let isSticker = (self.props.type == "sticker") ? " sticker" : "";
    let preview = self.props.preview;
    let msgAttachWrapper = (self.props.preview == "" || self.props.preview == null || self.props.preview == undefined) ? " hide" : "";

    return (
      <div className={"message-attachment-wrapper" + hasMessage + msgAttachWrapper}>
        <div className={messageAttachment + ' ' + isSticker} style={this.getSizeImage()}>
          <a href={self.props.origin} target="_blank">
            <img className="image-attachment" src={preview} 
            onLoad={this.props.attachmentLoadDone} onError={this.props.attachmentLoadDone}/>
          </a>
        </div>
      </div>
    )
  }
});

module.exports = FmsAttachmentContent;
