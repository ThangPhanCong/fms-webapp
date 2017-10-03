'use strict';

const React = require('react');
const {browserHistory} = require('react-router');

import {Image} from 'react-bootstrap';

let FmsPostItem = React.createClass({
  onToggleChange: function(checked) {
    this.props.onToggleChange(this.props.data.fb_id);
  },
  renderImgs: function() {
    let img = 'https://scontent.xx.fbcdn.net/v/t1.0-9/s720x720/20525302_698424647034142_194183038564561297_n.jpg?oh=8a35af7c300370d90ecba8c179a15799&oe=5A2996A5';

    return (
      <img src={img} />
    );
  },
  render: function() {
    let self = this;

    let page_id = '161815640591040';
    let page_name = 'UET Chatbot';
    let page_ava = `https://graph.facebook.com/v2.10/${page_id}/picture`;

    return (
      <div className="post-item-wrapper">
        <div className="post-header">
          <Image src={page_ava} circle width={50}></Image>
          <span>{page_name}</span>
        </div>
        <div className="post-body">
          <p>{this.props.data.message}</p>
          <div><input type="checkbox" checked={this.props.data.isHidedComment} onChange={this.onToggleChange}/> Ẩn bình luận</div>
        </div>
      </div>
    );
  }
});

module.exports = FmsPostItem;
