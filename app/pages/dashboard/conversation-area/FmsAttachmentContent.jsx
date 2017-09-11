const React = require('react');

let FmsAttachmentContent = React.createClass({
  render: function() {
    let messageAttachment = (this.props.isSelf) ? "right-message-attachment" : "left-message-attachment"
    return (
      <div className="message-attachment-wrapper">
        <img className={messageAttachment} src={"https://scontent.xx.fbcdn.net/v/t34.0-0/p280x280/21268799_1290882034354608_389166565_n.jpg?oh=37a88204efea9306e142f8ede2b5274e&oe=59B900D6"}/>
      </div>
    )
  }
});

module.exports = FmsAttachmentContent;
