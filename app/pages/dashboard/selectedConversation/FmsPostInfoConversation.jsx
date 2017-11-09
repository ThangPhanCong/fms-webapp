import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';

class FmsPostInfoConversation extends React.Component {
  renderAttachments(attachments) {
    let atts = [], type = 3;
    if (attachments && Array.isArray(attachments) && attachments.length == 1) {
      let short = attachments[0];
      if (short.photos && Array.isArray(short.photos)) {
        atts = short.photos;
        type = 1;
      } else if (Array.isArray(short.data) && short.data.length == 1 && short.data[0].subattachments
        && Array.isArray(short.data[0].subattachments.data)) {
        atts = short.data[0].subattachments.data;
        type = 2;
      }
    }
    return atts.map(att => {
      let src;
      if (type == 1) src = att;
      else if (type == 2) src = att.media.image.src;
      return <a className="attachment-in-conversation" href={src} target="_blank" key={uuid()}>
        <img className="image-in-conversation" src={src} /></a>
    });
  }
  render() {
    return (
      <div className="post-info-conversation">
        <p className="page-name-conversation">{this.props.pageInfo.name}</p>
        <p>{this.props.postInfo.message}</p>
        {this.renderAttachments(this.props.postInfo.attachments)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
		pageInfo: state.dashboard.selectedConversation.chatArea.conversation.page,
		postInfo: state.dashboard.selectedConversation.chatArea.postInfo
  }
}

export default connect(mapStateToProps)(FmsPostInfoConversation);
