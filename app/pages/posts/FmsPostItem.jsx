import React from 'react';

import { Image, Checkbox } from 'react-bootstrap';
import uuid from 'uuid';

class FmsPostItem extends React.Component {
  onToggleChange(checked) {
    this.props.onToggleChange(this.props.data.fb_id);
  }
  renderImgs() {
    let {attachments} = this.props.data;
    if (attachments) {
      let photoAttachment = attachments.data.find(atm => atm);
      if(photoAttachment.type == "photo") {
        return (
          <Image key={uuid()} src={photoAttachment.media.image.src}></Image>
        )
      } else if(photoAttachment.type == "album") {
        return photoAttachment.subattachments.data.map(atm => {
          return (<Image key={uuid()} src={atm.media.image.src}></Image>)
        })
      } else {
        return null;
      }
    }
  }
  render() {
    let {page_fb_id, page_fb_name, message, hide_comment} = this.props.data;
    let page_ava = `https://graph.facebook.com/v2.10/${page_fb_id}/picture`;

    return (
      <div className="post-item-wrapper">
        <div className="post-body">
          <p className="content">{message}</p>
          <div className="image-wrapper">
            {this.renderImgs()}
          </div>
          <div className="page-info">
            <Image src={page_ava} circle></Image>
            <span>{page_fb_name}</span>
          </div>
          <div>
            <Checkbox type="checkbox"
              checked={hide_comment}
              onChange={this.onToggleChange.bind(this)}> Ẩn bình luận</Checkbox>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = FmsPostItem;
