import React from 'react';
import Modal from "react-bootstrap/es/Modal";
import FmsScrollableDiv from "../../../commons/scroll-bar/FmsScrollableDiv";
import FmsCroppedImage from "../../../commons/FmsCroppedImage/FmsCroppedImage";
import FmsDate from "../../../helpers/FmsDate";
import * as OrderApi from "../../../api/OrderApi";
import $ from "jquery";

export default class FmsPostDetailModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderStatistic: {}
        }
    }

    onToggleChange(hide_phone) {
        this.props.onToggleChange(this.props.post._id, hide_phone);
    }

    updateModal() {
        if (this.props.post.message) {
            const parse_message = twemoji.parse(this.props.post.message);
            const message = $.parseHTML(parse_message);
            $("#content").replaceWith(message)
        }
        OrderApi.countSourceOrders(this.props.post.fb_id)
            .then(res => {
                this.setState({orderStatistic: res});
            }, err => {
                console.log(err);
            });
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.isShown && this.props.isShown && this.props.post) {
            this.updateModal();
        }
    }

    navigateToNewTab(fb_id) {
        window.open('https://facebook.com/' + fb_id);
    }

    getCreatedTime() {
        let date = new FmsDate(this.props.post.created_time);
        return date.getTimePostItem();
    }

    renderImgs() {
        let {attachments} = this.props.post;
        if (attachments && Array.isArray(attachments) && attachments.length > 0) {
            if (Array.isArray(attachments[0].data)) {
                return attachments[0].data.map((a, i) => {
                    return <FmsCroppedImage className="image" key={i} src={a.preview || a.src}/>;
                });
            }
        }
    }

    render() {
        if (!this.props.post) return <div/>;
        let {page, message, hide_comment, fb_id, hide_phone} = this.props.post;
        let avaUrl = `https://graph.facebook.com/v2.10/${page.fb_id}/picture`;
        let pageFb = `https://facebook.com/${page.fb_id}`;
        let attachments = (this.props.post.attachments) ? "" : " hide";
        let statistic = this.state.orderStatistic;

        return (
            <Modal
                show={this.props.isShown}
                onHide={() => {
                    this.props.closeModal();
                }}
                backdrop='static' keyboard={false}
                bsSize="large">
                <div className="inmodal">
                    <Modal.Header>
                        <h4 className="fms-modal-title">Chi tiết bài đăng</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-sm-7">
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
                                        <div className="list-content">
                                            <p id="content">{message}</p>
                                        </div>
                                        <div className={"image-wrapper" + attachments}>
                                            {this.renderImgs()}
                                        </div>
                                    </FmsScrollableDiv>
                                    <div className="order-info">

                                    </div>
                                    <div className="dropdown">
                                    <i className="glyphicon glyphicon-option-vertical clickable dropdown-toggle"
                                       data-toggle="dropdown"/>
                                    <ul className="dropdown-menu">
                                        <li className="clickable"
                                            onClick={() => this.navigateToNewTab(fb_id)}>
                                            <a>
                                                Đi tới bài đăng trên facebook
                                            </a>
                                        </li>
                                        <li className='divider'/>
                                        <li className="clickable" onClick={() => {
                                            this.onToggleChange(false)
                                        }}>
                                            <span>Ẩn tất cả bình luận</span>
                                            {hide_comment ?
                                                <i className="glyphicon glyphicon-ok"/> :
                                                null
                                            }
                                        </li>
                                        <li className="clickable"
                                            onClick={() => {
                                                this.onToggleChange(true)
                                            }}
                                        >
                                            <span>Ẩn bình luận có số điện thoại</span>
                                            {hide_phone ?
                                                <i className="glyphicon glyphicon-ok"/> :
                                                null
                                            }
                                        </li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                            <div className="col-sm-5 statistic">
                                <div className="title">Thống kê bài viết</div>
                                <p>Tổng số lượng đơn hàng: <span className="number">{statistic.totalOrders}</span></p>
                                <p>Đơn hàng thành công: <span className="number">{statistic.ordersSuccess}</span></p>
                                <p>Đơn hàng thất bại: <span className="number">{statistic.ordersError}</span></p>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-default" onClick={() => this.props.closeModal()}>Đóng</button>
                    </Modal.Footer>
                </div>
            </Modal>
        )
    }
}