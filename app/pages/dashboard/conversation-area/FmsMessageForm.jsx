'use strict';

import React from 'react';

import attachImg from 'attachment.png';
import sendImg from 'send.png';

import fileApi from 'FileApi';
import dashboardApi from 'DashboardApi';

class FmsMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
  }
  onFormSubmit(e) {
    e.preventDefault();

    let v = this.refs.message;
    if (v.value != '') this.props.sendMessage(this.refs.message.value);
    v.value = '';
  }
  onFileChange(e) {
    let self = this;
    let files = e.target.files || e.dataTransfer.files;
    if (!files) return;
    let file = files[0]
    let s3Url;
    fileApi.getS3SigningRequest(file.name, file.type)
      .then(data => {
        let signedRequest = data.signedRequest;
        s3Url = data.url;

        return fileApi.uploadFileToS3(file, signedRequest);
      })
      .then(() => {
        return dashboardApi.postRepCmtMsg(self.props.conversation._id, null, s3Url);
      })
      .catch(err => console.log(err.message))
  }
  render() {
    let self = this;
    return (
      <div>
        <form onSubmit={this.onFormSubmit} className="input-wrapper">
          <input className="input-text" ref="message" rows="3" placeholder="Soạn tin nhắn..." />
          <ul className="group-button">
            {self.props.conversation.type == 'comment' ?
              <li><a href="#">
                <img src={attachImg} className="attach-button" />
                <input type="file" className="input-file" accept="image/*" onChange={self.onFileChange}></input>
              </a></li>
              : null
            }
            <li><img src={sendImg} className="send-button" onClick={this.onFormSubmit} /></li>
          </ul>
        </form>
      </div>
    );
  }
}

module.exports = FmsMessageForm;
