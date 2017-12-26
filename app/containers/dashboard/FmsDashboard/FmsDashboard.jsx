import React from 'react';
import {connect} from 'react-redux';

import FmsChatArea from '../selectedConversation/FmsChatArea/FmsChatArea';
import FmsConversationList from '../conversations/FmsConversationList/FmsConversationList';
import FmsClientInformation from '../information/FmsClientInformation/FmsClientInformation';
import FmsVerticalNav from '../FmsVerticalNav/FmsVerticalNav';

import {resetConversations, cancelGetConversations} from '../../../actions/dashboard/conversations';
import {getProject, unSubscribeProjectChanges} from '../../../actions/dashboard/dashboard';
import {getTagsProject, resetFilters} from '../../../actions/dashboard/filters';
import {resetChat} from '../../../actions/dashboard/chat/messages';

class FmsDashBoard extends React.Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(getProject());
    dispatch(getTagsProject());
  }

  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch(cancelGetConversations());
    dispatch(unSubscribeProjectChanges());
    dispatch(resetConversations());
    dispatch(resetChat());
    dispatch(resetFilters());
  }

  renderConversation() {
    if (this.props.conversation) {
      return <FmsChatArea/>
    } else {
      return <div className="notifiy-no-conversation">Bạn chưa chọn cuộc hội thoại nào!</div>
    }
  }

  render() {
    return (
      <div className="dashboard page">
        <div className="vertical-nav">
          <FmsVerticalNav/>
        </div>
        <div className="client-list">
          <FmsConversationList/>
        </div>
        <div className="conversation-area">
          {this.renderConversation()}
        </div>
        <div className="client-information-area">
          <FmsClientInformation noti={this.props.noti}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    conversation: state.dashboard.chat.conversation
  }
};

export default connect(mapStateToProps)(FmsDashBoard);
