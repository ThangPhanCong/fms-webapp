import React from 'react';

import FmsCroppedImage from '../../../commons/FmsCroppedImage/FmsCroppedImage';
import FmsScrollableDiv from '../../../commons/scroll-bar/FmsScrollableDiv';
import FmsDate from '../../../helpers/FmsDate';

class FmsPostItem extends React.Component {
    onToggleChange(hide_phone) {
        this.props.onToggleChange(this.props.data._id, hide_phone);
    }

    getCreatedTime() {
        let date = new FmsDate(this.props.data.created_time);
        return date.getTimePostItem();
    }

    renderImgs() {
        let {attachments} = this.props.data;
        if (attachments && Array.isArray(attachments) && attachments.length > 0) {
            if (Array.isArray(attachments[0].data)) {
                return attachments[0].data.map((a, i) => {
                    return <FmsCroppedImage className="image" key={i} src={a.preview || a.src}/>;
                });
            }
        }
    }

    render() {
        let {page, message, hide_comment, fb_id, hide_phone} = this.props.data;
        let avaUrl = `https://graph.facebook.com/v2.10/${page.fb_id}/picture`;
        let pageFb = `https://facebook.com/${page.fb_id}`;
        let attachments = (this.props.data.attachments) ? "" : " hide";

        return (
            <div className="post-item">
                <div className="page-info">
                    <div className="avatar-wrapper">
                        <a href={pageFb} target="_blank">
                            <img className="avatar" src={avaUrl}/>
                        </a>
                    </div>
                    <div className="post-info">
                        <div className="page-name">{page.name}</div>
                        <div className="created-time">{this.getCreatedTime()}</div>
                    </div>
                </div>
                <FmsScrollableDiv className="content-wrapper">
                    <p className="content">{message}</p>
                    <div className={"image-wrapper" + attachments}>
                        {this.renderImgs()}
                    </div>
                </FmsScrollableDiv>
                <div className="dropdown">
                    <i className="glyphicon glyphicon-option-vertical clickable dropdown-toggle"
                       data-toggle="dropdown"/>
                    <ul className="dropdown-menu">
                        <li className="clickable">
                            <a href={"https://facebook.com/" + fb_id} target="_blank">
                                Đi tới bài đăng trên facebook
                            </a>
                        </li>
                        <li className='divider'/>
                        <li className="clickable" onClick={() => {this.onToggleChange(false)}}>
                            <span>Ẩn tất cả bình luận</span>
                            {hide_comment ?
                                <i className="glyphicon glyphicon-ok"/> :
                                null
                            }
                        </li>
                        <li className="clickable" onClick={() => {this.onToggleChange(true)}}>
                            <span>Ẩn bình luận có số điện thoại</span>
                            {hide_phone ?
                                <i className="glyphicon glyphicon-ok"/> :
                                null
                            }
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

module.exports = FmsPostItem;
