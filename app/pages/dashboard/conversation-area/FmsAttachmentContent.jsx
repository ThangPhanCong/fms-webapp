const React = require('react');

let FmsAttachmentContent = React.createClass({
  getDefaultProps: function () {
    return {
      isSelf: false,
      hasMessage: -1
    };
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
    let preview = self.props.preview;
    let msgAttachWrapper = (self.props.preview == "" || self.props.preview == null || self.props.preview == undefined) ? " hide" : "";

    return (
      <div className={"message-attachment-wrapper" + hasMessage + msgAttachWrapper}>
        <a href={self.props.origin} target="_blank">
          <img className={messageAttachment + ' ' + self.props.type} src={preview} 
          onLoad={this.props.attachmentLoadDone} onError={this.props.attachmentLoadDone}/>
        </a>
      </div>
    )
  }
});

module.exports = FmsAttachmentContent;
