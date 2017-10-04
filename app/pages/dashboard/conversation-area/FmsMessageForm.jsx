'use strict';

const React = require('react');

const attachImg = require('attachment.png');
const sendImg = require('send.png');

const fileApi = require('FileApi');
const dashboardApi = require('DashboardApi');

let FmsMessageForm = React.createClass({
  onFormSubmit: function (e) {
    e.preventDefault();

    let v = this.refs.message;
    if (v.value != '') this.props.sendMessage(this.refs.message.value);
    v.value = '';
  },
  onFileChange: function (e) {
    let self = this;
    let files = e.target.files || e.dataTransfer.files;
    if (!files) return;

    console.log(files);
    console.log(files[0])
    let file = files[0]

    let s3Url;
    // get signing request
    fileApi.getS3SigningRequest(file.name, file.type)
      .then(data => {
        let signedRequest = data.signedRequest;
        s3Url = data.url;

        return fileApi.uploadFileToS3(file, signedRequest);
      })
      .then(() => {
        return dashboardApi.postRepCmtMsg(self.props.conversation.fb_id, null, s3Url);
      })
      .then(data => {
        console.log('data', data);
      })
      .catch(err => console.log(err.message))
    // post file to s3

    // get link and use send file api
  },
  render: function () {
    let self = this;

    return (
      <div>
        <form onSubmit={this.onFormSubmit} className="input-wrapper">
            <input className="input-text" ref="message" rows="3" placeholder="Soạn tin nhắn..."/>
            <ul className="group-button">
              { self.props.conversation.type == 'comment' ?
                <li><a href="#">
                  <img src={attachImg} className="attach-button"/>
                  <input type="file" className="input-file" accept="image/*" onChange={self.onFileChange}></input>
                </a></li>
                : null
              }
              <li><img src={sendImg} className="send-button" onClick={this.onFormSubmit}/></li>
            </ul>
        </form>
      </div>
    );
  }
});

module.exports = FmsMessageForm;
