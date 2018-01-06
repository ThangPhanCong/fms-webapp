import React from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import FmsPostItem from '../FmsPostItem/FmsPostItem';
import {getPosts, toggleChange} from '../../../actions/post';
import FmsSpin from "../../../commons/FmsSpin/FmsSpin";
import FmsAddPostModal from '../FmsAddPostModal/FmsAddPostModal';
import FmsPageTitle from '../../../commons/page-title/FmsPageTitle';

class FmsPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShownModal: false
        };
    }

    componentDidMount() {
        if (this.props.project && this.props.project.alias) {
            this.props.dispatch(getPosts(this.props.project.alias));
        }
    }

    componentDidUpdate(prevProps) {
        if ((!prevProps.project && this.props.project) || prevProps.project.alias !== this.props.project.alias) {
            this.props.dispatch(getPosts(this.props.project.alias));
        }
    }

    onToggleChange(fb_post_id) {
        const {posts, dispatch, noti} = this.props;
        dispatch(toggleChange(posts, fb_post_id, noti));
    }

    openModal() {
        this.setState({isShownModal: true});
    }

    closeModal() {
        this.setState({isShownModal: false});
    }

    loadMorePosts() {
        const {dispatch, paging} = this.props;
        dispatch(getPosts(this.props.project.alias, paging.next));
    }

    renderPosts() {
        const {posts, isPostsLoading} = this.props;
        if (isPostsLoading) {
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
        const {paging, isPostsLoading, isMorePostsLoading} = this.props;
        let alias = (this.props.project) ? this.props.project.alias : null;
        let route = (alias) ? `${alias}/Quản lý trang/Bài viết` : "/";
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
                        {(paging && !isPostsLoading) ?
                            (!isMorePostsLoading) ? <Button onClick={this.loadMorePosts.bind(this)}>Lấy thêm</Button>
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

const mapStateToProps = state => {
    return {
        isPostsLoading: state.post.isPostsLoading,
        isMorePostsLoading: state.post.isMorePostsLoading,
        posts: state.post.posts,
        paging: state.post.paging
    }
};

export default connect(mapStateToProps)(FmsPosts);
