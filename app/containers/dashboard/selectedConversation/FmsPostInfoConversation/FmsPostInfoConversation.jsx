import React from 'react';
import uuid from 'uuid';
import {connect} from 'react-redux';
import DashboardApi from '../../../../api/DashboardApi';
import {setPostInfo} from '../../../../actions/dashboard/chat/messages';
import FmsCroppedImage from '../../../../commons/FmsCroppedImage/FmsCroppedImage';

class FmsPostInfoConversation extends React.Component {
    handleAttachExpired() {
        DashboardApi.updateExpiredAttachment(this.props.postInfo._id)
            .then(res => {
                this.props.dispatch(setPostInfo(res));
            }, err => {
                console.log(err);
            });
    }

    renderAttachments(attachments) {
        if (attachments && Array.isArray(attachments) && attachments.length > 0 && Array.isArray(attachments[0].data)) {
            return attachments[0].data.map(attachment => {
                let src = attachment.preview || attachment.src;
                return <a href={src} target="_blank" key={uuid()}>
                    <FmsCroppedImage className="image-in-conversation" src={src} onError={this.handleAttachExpired.bind(this)}/></a>
            });
        }
    }

    renderPost() {
        let pf = this.props.postInfo;
        if (pf && pf.message) {
            return (
                <div>
                    <p>{this.props.postInfo.message}</p>
                    {this.renderAttachments(this.props.postInfo.attachments)}
                </div>
            )
        }
    }

    render() {
        if (!this.props.pageInfo) return <span/>;
        return (
            <div className="post-info-conversation">
                <p className="page-name-conversation">{this.props.pageInfo.name}</p>
                {this.renderPost()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        pageInfo: state.dashboard.chat.conversation.page,
        postInfo: state.dashboard.chat.postInfo
    }
};

export default connect(mapStateToProps)(FmsPostInfoConversation);
