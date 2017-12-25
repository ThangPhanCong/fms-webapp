import React from 'react';
import {connect} from 'react-redux';

import attachImg from '../../../assets/images/attachment.png';
import sendImg from '../../../assets/images/send.png';

import {handleFileChange, handleFormSubmit} from '../../../actions/dashboard/chat/messageForm';

class FmsMessageForm extends React.Component {
  handleFileChange(e) {
    this.props.dispatch(handleFileChange(e));
  }

  handleFormSubmit(e) {
    this.props.dispatch(handleFormSubmit(e, this.refs.message));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit.bind(this)} className="input-wrapper">
          <input className="input-text" ref="message" placeholder="Soạn tin nhắn..."/>
          <ul className="group-button">
            {this.props.conversation.type === 'comment' ?
              <li><a href="#">
                <img src={attachImg} className="attach-button"/>
                <input type="file" className="input-file" accept="image/*" onChange={this.handleFileChange.bind(this)}/>
              </a></li>
              : null
            }
            <li><img src={sendImg} className="send-button" onClick={this.handleFormSubmit.bind(this)}/></li>
          </ul>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    conversation: state.dashboard.chat.conversation
  }
};

export default connect(mapStateToProps)(FmsMessageForm);
