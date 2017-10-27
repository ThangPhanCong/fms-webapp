import React from 'react';

import { Image, Checkbox } from 'react-bootstrap';
import uuid from 'uuid';

class FmsPostItem extends React.Component {
  constructor(props) {
    super(props);
    this.onToggleChange = this.onToggleChange.bind(this);
  }
  onToggleChange(checked) {
    this.props.onToggleChange(this.props.data.fb_id);
  }
  renderImgs() {
    let self = this;
    let attachments = self.props.data.attachments;
    if (attachments) {
      let photoAttachment = attachments.find(atm => !!atm.photos);

      if (photoAttachment) {
        return photoAttachment.photos.map(imgUrl => {
          return (
            <Image key={uuid()} src={imgUrl}></Image>
          )
        })
      }
    }
  }
  render() {
    let self = this;
    let page_id = self.props.data.page_fb_id;
    let page_name = self.props.data.page_fb_name;
    let page_ava = `https://graph.facebook.com/v2.10/${page_id}/picture`;

    return (
      <div className="post-item-wrapper">
        <div className="post-body">
          <p className="content">{this.props.data.message}</p>
          <div className="image-wrapper">
            {self.renderImgs()}
          </div>
          <div className="page-info">
            <Image src={page_ava} circle></Image>
            <span>{page_name}</span>
          </div>
          <div>
            <Checkbox type="checkbox"
              checked={this.props.data.hide_comment}
              onChange={this.onToggleChange}> Ẩn bình luận</Checkbox>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = FmsPostItem;
