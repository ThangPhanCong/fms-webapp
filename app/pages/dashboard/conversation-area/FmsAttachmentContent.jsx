const React = require('react');

let FmsAttachmentContent = React.createClass({
  render: function() {
    let messageAttachment = (this.props.isSelf) ? "right-message-attachment" : "left-message-attachment"
    return (
      <div className="message-attachment-wrapper">
        <img className={messageAttachment} src={"https://scontent.fhan5-1.fna.fbcdn.net/v/t35.0-12/21618444_899654440192216_2099106233_o.png?oh=4ddbd8c29a710227aa8c2371440ce446&oe=59B8F623"}/>
      </div>
    )
  }
});

module.exports = FmsAttachmentContent;
