"use strict";

import React from 'react';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import FmsPostItem from './FmsPostItem';
import {getPosts, toggleChange} from '../../actions/post';

class FmsPosts extends React.Component {
  componentDidMount() {
    const {project_alias} = this.props.match.params;
    const {dispatch} = this.props;
    dispatch(getPosts(project_alias));
  }

  onToggleChange(fb_post_id) {
    let {posts, dispatch, noti} = this.props;
    dispatch(toggleChange(posts, fb_post_id, noti));
  }

  loadMorePosts() {
    const {project_alias} = this.props.match.params;
    const {dispatch} = this.props;
    const {next} = this.props;
    dispatch(getPosts(project_alias, next));
  }

  renderPosts() {
    const {posts} = this.props;

    return posts.map((post) => {
      return (
        <Col xs={12} sm={6} md={4} key={post.fb_id}>
          <FmsPostItem data={post} onToggleChange={this.onToggleChange} />
        </Col>
      )
    });
  }

  render() {
    const {next, isPostsLoading} = this.props;

    return (
      <Grid bsClass="page posts">
        <Row>
          {this.renderPosts()}
        </Row>
        <div className="loadmore-wrapper">
          {(next) ? <Button onClick={this.loadMorePosts}>Load more</Button> : null}
        </div>
      </Grid>
    );
  }
}
const mapStateToProps = state => {
  return {
    isPostsLoading: state.post.isPostsLoading,
    posts: state.post.posts,
    next: state.post.next
  }
}

export default connect(mapStateToProps)(FmsPosts);
