import React from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import FmsPostItem from './FmsPostItem';
import {getPosts, toggleChange} from '../../actions/post';
import FmsSpin from "../../commons/FmsSpin/FmsSpin";

class FmsPosts extends React.Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(getPosts(this.props.alias));
  }

  onToggleChange(fb_post_id) {
    const {posts, dispatch, noti} = this.props;
    dispatch(toggleChange(posts, fb_post_id, noti));
  }

  loadMorePosts() {
    const {dispatch, paging} = this.props;
    dispatch(getPosts(this.props.alias, paging.next));
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
    return (
      <Grid bsClass={"page posts"}>
        <div className="new-post">
          <div className="title-new-post">Đăng bài mới</div>
          <div className="header-new-post">
            Chọn trang để đăng bài
          </div>
          <div className="body-new-post">
            <textarea className="textarea-new-post"/>
          </div>
          <div className="trailer-new-post">
            <button className="button-new-post btn btn-primary">Lên lịch</button>
            <button className="button-new-post btn btn-success">Đăng</button>
          </div>
        </div>
        <hr className="hr-divider"/>
        <div className="title-list-post">Các bài đăng gần đây</div>
        <Row>
          {this.renderPosts()}
        </Row>
        <div className="loadmore-wrapper">
          {(paging && !isPostsLoading) ?
            (!isMorePostsLoading) ? <Button onClick={this.loadMorePosts.bind(this)}>Lấy thêm</Button>
              : <FmsSpin/>
            : null}

        </div>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    isPostsLoading: state.post.isPostsLoading,
    isMorePostsLoading: state.post.isMorePostsLoading,
    posts: state.post.posts,
    paging: state.post.paging,
    alias: state.dashboard.conversations.alias
  }
};

export default connect(mapStateToProps)(FmsPosts);
