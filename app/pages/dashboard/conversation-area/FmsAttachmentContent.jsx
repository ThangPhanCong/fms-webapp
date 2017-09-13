const React = require('react');

let FmsAttachmentContent = React.createClass({
  getDefaultProps: function () {
    return {
      isSelf: false,
      hasMessage: false,
      conversationType: null,
      data: null
    };
  },
  render: function() {
    let self = this;
    let messageAttachment = (this.props.isSelf) ? "right-message-attachment" : "left-message-attachment";
    // let tempImg = "https://scontent.fhan5-1.fna.fbcdn.net/v/t35.0-12/21618444_899654440192216_2099106233_o.png?oh=4ddbd8c29a710227aa8c2371440ce446&oe=59B8F623";
    let hasMessage = (this.props.hasMessage == true) ? " has-message" : " no-message";
    let attachmentTypeClass = '';
    let imgUrl = null;

    if (this.props.conversationType == 'inbox') {
      imgUrl = this.props.data.image_data.preview_url;
    } else if (this.props.conversationType == 'comment') {
      imgUrl= this.props.data.media.image.src;
    }

    switch (this.props.data.type) {
      case 'sticker':
        attachmentTypeClass = ' sticker';
        break;
      default:
        attachmentTypeClass = ' image_type';
        break;
    }

    return (
      <div className={"message-attachment-wrapper" + hasMessage}>
        <a href={imgUrl} target="_blank"><img className={messageAttachment + ' ' +attachmentTypeClass} src={imgUrl}/></a>
      </div>
    )
  }
});

module.exports = FmsAttachmentContent;
