import React from 'react';

import {Image, Checkbox} from 'react-bootstrap';
import uuid from 'uuid';

class FmsPostItem extends React.Component {
  onToggleChange() {
    this.props.onToggleChange(this.props.data._id);
  }

  renderImgs() {
    let {attachments} = this.props.data;
    if (attachments && Array.isArray(attachments) && attachments.length > 0) {
      if (Array.isArray(attachments[0].data)) {
        return attachments[0].data.map(a => {
          return <Image key={uuid()} src={a.preview || a.src}/>;
        });
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
