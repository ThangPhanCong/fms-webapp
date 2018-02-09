import React from 'react';
import {connect} from 'react-redux';

import allImg from '../../../assets/images/all.png';
import postImg from '../../../assets/images/post.png';
import inboxImg from '../../../assets/images/inbox.png';

import allImgActive from '../../../assets/images/all_active.png';
import postImgActive from '../../../assets/images/post_active.png';
import inboxImgActive from '../../../assets/images/inbox_active.png';


import FmsToolTip from '../../../commons/FmsToolTip/FmsToolTip';
import {handleTypeFilterClick} from '../../../actions/dashboard/filters';

class FmsVerticalNav extends React.Component {
    handleTypeFilterClick(type) {
        this.props.dispatch(handleTypeFilterClick(this.props.alias, type));
    }

    render() {
        let inactive = [allImg, postImg, inboxImg];
        let active = [allImgActive, postImgActive, inboxImgActive];
        let className = [];
        let src = [], counter = 0;
        this.props.filters.forEach(f => {
             if (!f.isTag) {
                 if (f.isActive) {
                     src.push(active[counter]);
                     className.push(" vertical-item-active");
                 } else {
                     src.push(inactive[counter]);
                     className.push("");
                 }
                 counter++;
             }
        });
        let {unreadComment, unreadInbox} = this.props;
        if (unreadComment > 9) unreadComment = "9+";
        if (unreadInbox > 9) unreadInbox = "9+";
        return (
            <div ref="vertical_nav">
                <FmsToolTip message="Hiển thị tất cả" direction="right">
                    <div className="filter-item" onClick={() => {
                        this.handleTypeFilterClick('all')
                    }}>
                        <img src={src[0]} className={"vertical-nav-item" + className[0]}/>
                    </div>
                </FmsToolTip>
                <FmsToolTip message="Bình luận" direction="right">
                    <div className="filter-item" onClick={() => {
                        this.handleTypeFilterClick('comment')
                    }}>
                        {this.props.unreadComment ?
                            <span>{unreadComment}</span>
                            :
                            null
                        }
                        <img src={src[1]} className={"vertical-nav-item" + className[1]}/>
                    </div>
                </FmsToolTip>
                <FmsToolTip message="Tin nhắn" direction="right">
                    <div className="filter-item" onClick={() => {
                        this.handleTypeFilterClick('inbox')
                    }}>
                        {this.props.unreadInbox ?
                            <span>{unreadInbox}</span>
                            :
                            null
                        }
                        <img src={src[2]} className={"vertical-nav-item" + className[2]}/>
                    </div>
                </FmsToolTip>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        filters: state.dashboard.filters.filters,
        unreadComment: state.dashboard.conversations.countUnreadComments,
        unreadInbox: state.dashboard.conversations.countUnreadInboxes
    }
};

export default connect(mapStateToProps)(FmsVerticalNav);
