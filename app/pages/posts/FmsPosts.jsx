import React from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import FmsPostItem from './FmsPostItem';
import {getPosts, toggleChange} from '../../actions/post';
import FmsSpin from "../../components/FmsSpin";

class FmsPosts extends React.Component {
  componentDidMount() {
    const {project_alias} = this.props.match.params;
    const {dispatch} = this.props;
    dispatch(getPosts(project_alias));
  }

  onToggleChange(fb_post_id) {
    const {posts, dispatch, noti} = this.props;
    dispatch(toggleChange(posts, fb_post_id, noti));
  }

  loadMorePosts() {
    const {project_alias} = this.props.match.params;
    const {dispatch, paging} = this.props;
    dispatch(getPosts(project_alias, paging.next));
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
    let styleGird = (isPostsLoading) ? "" : "posts";
    return (
      <Grid bsClass={"page " + styleGird}>
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
    paging: state.post.paging
  }
};

export default connect(mapStateToProps)(FmsPosts);
