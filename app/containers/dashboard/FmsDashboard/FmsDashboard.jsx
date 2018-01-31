import React from 'react';
import {connect} from 'react-redux';

import FmsChatArea from '../selectedConversation/FmsChatArea/FmsChatArea';
import FmsConversationList from '../conversations/FmsConversationList/FmsConversationList';
import FmsClientInformation from '../FmsClientInformation/FmsClientInformation';
import FmsVerticalNav from '../FmsVerticalNav/FmsVerticalNav';

import {
    resetConversations, cancelGetConversations,
    checkUnreadComments, checkUnreadInboxes
} from '../../../actions/dashboard/conversations';
import {getProject, unSubscribeProjectChanges} from '../../../actions/dashboard/dashboard';
import {getTagsProject, resetFilters} from '../../../actions/dashboard/filters';

class FmsDashBoard extends React.Component {
    startDashboard() {
        const {dispatch, project} = this.props;
        dispatch(getProject(project.alias));
        dispatch(getTagsProject(project.alias));
        // dispatch(checkUnreadComments(project.alias));
        // dispatch(checkUnreadInboxes(project.alias));
    }

    closeDashboard() {
        const {dispatch, project} = this.props;
        dispatch(resetFilters());
        dispatch(resetConversations());
        dispatch(cancelGetConversations());
        dispatch(unSubscribeProjectChanges(project.alias));
    }

    componentDidMount() {
        if (this.props.project && this.props.project.alias) {
            this.startDashboard();
        }
    }

    componentWillUnmount() {
        if (this.props.project && this.props.project.alias) {
            this.closeDashboard();
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.project && this.props.project && nextProps.project.alias !== this.props.project.alias) {
            this.closeDashboard();
        }
    }

    componentDidUpdate(prevProps) {
        if ((!prevProps.project && this.props.project) || prevProps.project.alias !== this.props.project.alias) {
            this.startDashboard();
        }
    }

    renderConversation() {
        if (this.props.conversation) {
            return <FmsChatArea alias={this.props.project.alias}/>
        } else {
            return <div className="notifiy-no-conversation">Bạn chưa chọn cuộc hội thoại nào!</div>
        }
    }

    render() {
        const alias = (this.props.project) ? this.props.project.alias : null;
        const clientInfo = (this.props.conversation) ? "" : " hide";

        return (
            <div className="dashboard page">
                <div className="vertical-nav">
                    <FmsVerticalNav alias={alias}/>
                </div>
                <div className="client-list">
                    <FmsConversationList alias={alias}/>
                </div>
                <div className="conversation-area">
                    {this.renderConversation()}
                </div>
                <div className={"client-information-area" + clientInfo}>
                    <FmsClientInformation alias={alias}/>
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
