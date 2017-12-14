import React from 'react';

import {Image, Checkbox} from 'react-bootstrap';
import uuid from 'uuid';

class FmsPostItem extends React.Component {
  onToggleChange() {
    this.props.onToggleChange(this.props.data.fb_id);
  }

  renderImgs() {
    let {attachments} = this.props.data;
    if (attachments) {
      let photoAttachment = attachments.data.find(atm => atm);
      if (photoAttachment.type === "photo") {
        return (
          <Image key={uuid()} src={photoAttachment.media.image.src}/>
        )
      } else if (photoAttachment.type === "album") {
        return photoAttachment.subattachments.data.map(atm => {
          return (<Image key={uuid()} src={atm.media.image.src}/>)
        })
      } else {
        return null;
      }
    }
  }

  render() {
    let {page, message, hide_comment} = this.props.data;

    return (
      <div className="post-item">
        <div className="page-info">
          <div className="page-name">{page.name}</div>
        </div>
        <div className="content-wrapper">
          <p className="content">{message}</p>
          <div className="image-wrapper">
            {this.renderImgs()}
          </div>
        </div>
        <div>
          <Checkbox type="checkbox"
                    checked={hide_comment}
                    onChange={this.onToggleChange.bind(this)}> Ẩn bình luận</Checkbox>
        </div>
      </div>
    );
  }
}

module.exports = FmsPostItem;
