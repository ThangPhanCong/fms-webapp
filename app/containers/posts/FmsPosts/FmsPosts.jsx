import React from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import FmsPostItem from '../FmsPostItem/FmsPostItem';
import FmsSpin from "../../../commons/FmsSpin/FmsSpin";
import FmsAddPostModal from '../FmsAddPostModal/FmsAddPostModal';
import FmsPageTitle from '../../../commons/page-title/FmsPageTitle';
import PostsApi from "../../../api/PostsApi";
import {noti} from "../../notification/NotificationService";

class FmsPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShownModal: false,
            isLoading: true,
            isLoadMore: false,
            posts: [],
            paging: {next: null}
        };
    }

    componentDidMount() {
        if (this.props.project && this.props.project.alias) {
            this.getPosts(this.props.project.alias);
        }
    }

    componentDidUpdate(prevProps) {
        if ((!prevProps.project && this.props.project) || prevProps.project.alias !== this.props.project.alias) {
            this.getPosts(this.props.project.alias);
        }
    }

    getPosts(alias, paging) {
        if (paging) {
            this.setState({isLoadMore: true});
            PostsApi.getPostsOfProject(alias, paging)
                .then(data => {
                    if (data) {
                        let paging = data.paging ? data.paging : null;
                        let posts = this.state.posts.concat(data.data);
                        this.setState({posts, paging, isLoadMore: false});
                    } else {
                        throw new Error("Posts not found");
                    }
                })
                .catch(err => alert(err.message));
        } else {
            this.setState({isLoading: true});
            PostsApi.getPostsOfProject(alias)
                .then(data => {
                    if (data) {
                        let paging = data.paging ? data.paging : null;
                        let posts = this.state.posts.concat(data.data);
                        this.setState({posts, paging, isLoading: false});
                    } else {
                        throw new Error("Posts not found");
                    }
                })
                .catch(err => alert(err.message));
        }
    }

    onToggleChange(post_id) {
        let {posts} = this.state;
        let postChange = posts.find((post) => {
            return post._id === post_id;
        });
        PostsApi.hideComment(post_id, !postChange.hide_comment)
            .then(() => {
                postChange.hide_comment = !postChange.hide_comment;

                for (let post of posts) {
                    if (post._id === post_id) {
                        if (post.hide_comment) {
                            noti('success', 'Ẩn bình luận thành công');
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

    openModal() {
        this.setState({isShownModal: true});
    }

    closeModal() {
        this.setState({isShownModal: false});
    }

    loadMorePosts() {
        this.getPosts(this.props.project.alias, this.state.paging.next);
    }

    renderPosts() {
        let {isLoading, posts} = this.state;
        if (isLoading) {
            return (
                <FmsSpin/>
            )
        } else {
            if (posts.length === 0) {
                return (
                    <div className="no-post">
                        <p>Chưa có bài đăng nào</p>
                    </div>
                )
            } else {
                return posts.map((post) => {
                    return (
                        <Col xs={12} sm={6} md={4} key={post.fb_id}>
                            <FmsPostItem data={post} onToggleChange={this.onToggleChange.bind(this)}/>
                        </Col>
                    )
                });
            }
        }
    }

    render() {
        let {isLoading, isLoadMore, paging} = this.state;
        let alias = (this.props.project) ? this.props.project.alias : null;
        let route = (alias) ? `${alias}/Quản lý trang/Bài viết` : "";
        return (
            <div>
                <FmsPageTitle title={"Bài viết"} route={route}/>
                <Grid bsClass={"page posts"}>
                    {
                        alias ?
                            <button className="btn btn-primary add-post-btn" onClick={this.openModal.bind(this)}>
                                Đăng bài mới
                            </button>
                            :
                            null
                    }

                    <Row>
                        {this.renderPosts()}
                    </Row>
                    <div className="loadmore-wrapper">
                        {(paging && !isLoading) ?
                            (!isLoadMore) ? <Button onClick={this.loadMorePosts.bind(this)}>Tải thêm</Button>
                                : <FmsSpin/>
                            : null}

                    </div>
                    <FmsAddPostModal isShown={this.state.isShownModal} closeModal={this.closeModal.bind(this)}
                                     alias={alias}/>
                </Grid>
            </div>
        );
    }
}

export default FmsPosts;
