'use strict';

import React from 'react';
import {Route} from 'react-router-dom';
import uuid from 'uuid';
import {Grid, Row, Col, Button} from 'react-bootstrap';

import FmsPostItem from 'FmsPostItem';
import postApi from 'PostsApi';
import dashboardApi from 'DashboardApi';
import projectApi from 'ProjectApi';

let FmsPosts = React.createClass({
  getInitialState: function() {
    return {
      posts: [],
      next: null,
      isLoading: false
    }
  },
  componentDidMount: function() {
    let self = this;
    let projectAlias = this.props.match.params.project_alias;

    postApi.getPostsOfProject(projectAlias)
      .then(
        data => {
          self.setState({
            posts: data.data,
            next: data.paging ? (data.paging.next ? data.paging.next : null) : null
          });
        },
        err => {
          alert('Can\'t get posts');
        }
      )
  },
  onToggleChange: function(fb_post_id) {
    let self = this;

    let posts = this.state.posts;
    let postChange = posts.find((post) => {
      return post.fb_id == fb_post_id;
    });

    postApi.hideComment(fb_post_id, !postChange.hide_comment)
      .then(() => {
        postChange.hide_comment = !postChange.hide_comment;

        for (let post of posts) {
          if (post.fb_id == fb_post_id) {
            if (post.hide_comment) {
              self.props.noti('success', 'Ẩn bình luận thành công');
              // self.props.noti('error', 'Ẩn bình luận thành công');
              // self.props.noti('warning', 'Ẩn bình luận thành công');
            } else {
              self.props.noti('success', 'Bỏ ẩn bình luận thành công');
            }
          }
        }
      })
      .catch(err => alert(err.message));
  },
  loadMorePosts: function () {
    let self = this;
    let projectAlias = self.props.match.params.project_alias;

    self.setState({isLoading: true});

    postApi.getPostsOfProject(projectAlias, self.state.next)
      .then(
        data => {
          let posts = self.state.posts.concat(data.data);
          self.setState({
            posts: posts,
            next: data.paging ? (data.paging.next ? data.paging.next : null) : null,
          });
        },
        err => {
          alert('Can\'t get posts');
        }
      )
      .then(() => {
        self.setState({isLoading: false});
      })

  },
  renderPosts: function () {
    let self = this;
    let posts = this.state.posts;

    return posts.map((post) => {
      return (
        <Col xs={12} sm={6} md={4} key={post.fb_id}>
          <FmsPostItem data={post} onToggleChange={this.onToggleChange}/>
        </Col>
      )
    });
  },
  render: function() {
    let self = this;

    return (
      <Grid bsClass="page posts">
        <Row>
          {this.renderPosts()}
        </Row>
        <div className="loadmore-wrapper">
          { self.state.next ? <Button disabled={self.state.isLoading} onClick={self.loadMorePosts}>Load more</Button> : null }
        </div>
      </Grid>
    );
  }
});

module.exports = FmsPosts;
