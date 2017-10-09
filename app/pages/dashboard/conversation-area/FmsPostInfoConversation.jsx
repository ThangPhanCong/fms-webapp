const React = require('react');
const uuid = require('uuid');

let FmsPostInfoConversation = React.createClass({
  renderAttachments: (attachments) => {
    let count = 0;
    console.log(attachments);
    let atts =  attachments.map(att => {
      count++;
      let style = {
        width: 50 + "%",
        borderRadius: 5 + "px"
      }
      return <a href={att.url} target="_blank" key={uuid()}><img src={att.media.image.src} style={style}/></a>
    });
    return atts;
  },
  render: function () {
    let attachments = (this.props.content.attachments) ? this.props.content.attachments[0].data[0].subattachments.data : [];
    return (
      <div className="post-info-conversation">
        <p>{this.props.content.message}</p>
        {this.renderAttachments(attachments)}
      </div>
    )
  }
});

module.exports = FmsPostInfoConversation;