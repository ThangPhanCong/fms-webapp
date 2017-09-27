const React = require('react');
const unavailableImg = require('unavailable.png');

let FmsAttachmentContent = React.createClass({
  getInitialState: function () {
    return {
      isError: false
    }
  },
  getDefaultProps: function () {
    return {
      isSelf: false,
      hasMessage: -1
    };
  },
  handleLoadError: function () {
    this.setState({ isError: true });
    this.props.attachmentLoadDone();
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
    let preview = (this.state.isError == false) ? self.props.preview : unavailableImg;
    let msgAttachWrapper = (self.props.preview == "" || self.props.preview == null || self.props.preview == undefined) ? " hide" : "";

    return (
      <div className={"message-attachment-wrapper" + hasMessage + msgAttachWrapper}>
        <a href={self.props.origin} target="_blank">
          <img className={messageAttachment + ' ' + self.props.type} src={preview} 
          onLoad={this.props.attachmentLoadDone} onError={this.handleLoadError}/>
        </a>
      </div>
    )
  }
});

module.exports = FmsAttachmentContent;
