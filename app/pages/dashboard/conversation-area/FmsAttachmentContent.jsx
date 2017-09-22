const React = require('react');

let FmsAttachmentContent = React.createClass({
  getDefaultProps: function () {
    return {
      isSelf: false,
      hasMessage: -1,
      conversationType: null,
      data: null,
      stickerSrc: null
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
    let attachmentTypeClass = '';
    let imgUrl = null;

    if (this.props.stickerSrc) {
      imgUrl = this.props.stickerSrc;
    } else {
      if (this.props.conversationType == 'inbox' && this.props.data.image_data) {
        imgUrl = this.props.data.image_data.preview_url;
      } else if (this.props.conversationType == 'comment' && this.props.data.media
        && this.props.data.media.image) {
        imgUrl = this.props.data.media.image.src;
      }
    }
    
    switch (this.props.data && this.props.data.type) {
      case 'sticker':
        attachmentTypeClass = ' sticker';
        break;
      default:
        attachmentTypeClass = ' image_type';
        break;
    }

    return (
      <div className={"message-attachment-wrapper" + hasMessage}>
        <a href={imgUrl} target="_blank"><img className={messageAttachment + ' ' + attachmentTypeClass} src={imgUrl} /></a>
      </div>
    )
  }
});

module.exports = FmsAttachmentContent;
