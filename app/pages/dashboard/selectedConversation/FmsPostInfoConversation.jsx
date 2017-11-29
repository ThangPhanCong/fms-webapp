import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import DashboardApi from '../../../api/DashboardApi';
import { setPostInfo } from '../../../actions/dashboard/chat/messages';

class FmsPostInfoConversation extends React.Component {
  handleAttachExpired() {
    DashboardApi.updateExpiredAttachment("post", this.props.postInfo._id)
    .then(res => {
      this.props.dispatch(setPostInfo(res));
    }, err => {
      console.log(err);
    });
  }
  renderAttachments(attachments) {
    let self = this;
    let atts = [];
    if (attachments && Array.isArray(attachments.data)) {
      let short = attachments.data[0];
      if (short.subattachments && Array.isArray(short.subattachments.data)) atts = short.subattachments.data;
    }
    return atts.map(att => {
      let src = att.media.image.src;
      return <a className="attachment-in-conversation" href={src} target="_blank" key={uuid()}>
        <img className="image-in-conversation" src={src} onError={this.handleAttachExpired.bind(this)}/></a>
    });
  }
  renderPost() {
    let pf = this.props.postInfo;
    if (pf && pf.message) {
      return (
        <div>
          <p>{this.props.postInfo.message}</p>
          {this.renderAttachments(this.props.postInfo.attachments)}
        </div>
      )
    }
  }
  render() {
    if (!this.props.pageInfo) return <span></span>;
    return (
      <div className="post-info-conversation">
        <p className="page-name-conversation">{this.props.pageInfo.name}</p>
        {this.renderPost()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    pageInfo: state.dashboard.chat.conversation.page,
    postInfo: state.dashboard.chat.postInfo
  }
}

export default connect(mapStateToProps)(FmsPostInfoConversation);
