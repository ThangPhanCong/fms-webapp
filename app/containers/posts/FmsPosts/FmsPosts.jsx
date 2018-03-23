import React from 'react';
import {Button} from 'react-bootstrap';
import FmsSpin from "../../../commons/FmsSpin/FmsSpin";
import FmsAddPostModal from '../FmsAddPostModal/FmsAddPostModal';
import FmsPageTitle from '../../../commons/page-title/FmsPageTitle';
import PostsApi from "../../../api/PostsApi";
import {noti} from "../../notification/NotificationService";
import FmsDate from "../../../helpers/FmsDate";
import FmsPostDetailModal from "../FmsPostDetailModal/FmsPostDetailModal";

class FmsPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShownModal: false,
            selectedPost: null,
            isLoading: true,
            posts: [],
            paging: {next: null}
        };
    }

    componentDidMount() {
        if (this.props.project) {
            this.getPosts();
        }
    }

    componentDidUpdate(prevProps) {
        if ((!prevProps.project && this.props.project) || prevProps.path !== this.props.path) {
            this.getPosts();
        }
    }

    getCreatedTime(time) {
        let date = new FmsDate(time);
        return date.getTimePostItem();
    }

    getPosts(paging) {
        this.setState({isLoading: true});
        PostsApi.getPostsOfProject(paging)
            .then(data => {
                if (data) {
                    let paging = data.paging ? data.paging : null;
                    let posts = this.state.posts.concat(data.data);
                    this.setState({posts, paging, isLoading: false});
                } else {
                    this.setState({isLoading: false});
                    alert("Posts not found");
                }
            })
            .catch(err => alert(err));
    }

    onToggleChange(post_id, hide_phone) {
        let {posts} = this.state;
        let postChange = posts.find((post) => {
            return post._id === post_id;
        });
        if (hide_phone) {
            PostsApi.hidePhoneComment(post_id, !postChange.hide_phone)
                .then(() => {
                    postChange.hide_phone = !postChange.hide_phone;

                    for (let post of posts) {
                        if (post._id === post_id) {
                            if (post.hide_phone) {
                                noti('success', 'Đã ẩn bình luận có số điện thoại');
                            } else {
                                noti('success', 'Bỏ ẩn bình luận có số điện thoại');
                            }
                        }
                    }
                    let newPosts = posts.map(post => {
                        if (post_id === post._id) return postChange;
                        else return post;
                    });
                    this.setState({posts: newPosts});
                })
                .catch(err => alert(err.message));
        } else {
            PostsApi.hideComment(post_id, !postChange.hide_comment)
                .then(() => {
                    postChange.hide_comment = !postChange.hide_comment;

                    for (let post of posts) {
                        if (post._id === post_id) {
                            if (post.hide_comment) {
                                noti('success', 'Ẩn tất cả bình luận thành công');
                            } else {
                                noti('success', 'Bỏ ẩn bình luận thành công');
                            }
                        }
                    }
                    let newPosts = posts.map(post => {
                        if (post_id === post._id) return postChange;
                        else return post;
                    });
                    this.setState({posts: newPosts});
                })
                .catch(err => alert(err.message));
        }
    }

    openPostDetailModal(post) {
        this.setState({selectedPost: post});
    }

    closePostDetailModal() {
        this.setState({selectedPost: null});
    }

    openModal() {
        this.setState({isShownModal: true});
    }

    closeModal() {
        this.setState({isShownModal: false});
    }

    loadMorePosts() {
        this.getPosts(this.state.paging.next);
    }

    renderPosts() {
        let {posts} = this.state;
        return posts.map((post) => {
            let content = post.message || "Không có";
            let id = post.fb_id.split("_").length > 1 ? post.fb_id.split("_")[1] : post.fb_id;
            return (
                <tr key={post.fb_id} className="clickable"
                    onClick={() => {
                        this.openPostDetailModal(post)
                    }}>
                    <td>
                        <img src={`https://graph.facebook.com/v2.10/${post.page.fb_id}/picture`}
                             style={{width: "37px", borderRadius: "50%"}}/>
                    </td>
                    <td>{id}</td>
                    <td style={{maxWidth: "423px"}}>
                        {content.length < 145 ? content : (content.substr(0, 145) + "...")}
                    </td>
                    <td>{this.getCreatedTime(post.created_time)}</td>
                    <td>0</td>
                </tr>
            )
        });
    }

    render() {
        let {isLoading, paging} = this.state;
        let name = (this.props.project) ? this.props.project.name : null;
        let route = (name) ? `${name}/Quản lý trang/Bài viết` : "";
        return (
            <div className="row">
                <div className="col-lg-12">
                    <FmsPageTitle title={"Bài viết"} route={route}/>
                    <div className="row color-cards-wrapper">
                        <div className="col-lg-12">
                            <button className="btn btn-primary btn-sm" type="button" name="button"
                                    onClick={() => {
                                        this.openModal()
                                    }} disabled={!name}>
                                <i className="fa fa-plus"/> Đăng bài mới
                            </button>
                        </div>
                        <div className="table-responsive color-cards-table">
                            <table className="table table-striped post-table">
                                <thead>
                                <tr>
                                    <th>Trang</th>
                                    <th>Nguồn</th>
                                    <th>Nội dung</th>
                                    <th>Ngày đăng</th>
                                    <th>Đơn hàng</th>
                                </tr>
                                </thead>

                                <tbody>
                                {this.renderPosts()}
                                </tbody>
                            </table>
                        </div>
                        <div className="loadmore-wrapper" style={{textAlign: "center"}}>
                            {!isLoading ?
                                (paging ? <Button onClick={this.loadMorePosts.bind(this)}>Tải thêm</Button> : null) :
                                <FmsSpin size={27}/>
                            }

                        </div>
                    </div>
                </div>
                <FmsAddPostModal isShown={this.state.isShownModal} closeModal={this.closeModal.bind(this)}
                                 project={this.props.project}/>
                <FmsPostDetailModal closeModal={this.closePostDetailModal.bind(this)}
                                    isShown={!!this.state.selectedPost} post={this.state.selectedPost}
                                    onToggleChange={this.onToggleChange.bind(this)}/>
            </div>
        );
    }
}

export default FmsPosts;
