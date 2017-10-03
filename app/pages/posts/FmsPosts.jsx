'use strict';

const React = require('react');
const {browserHistory} = require('react-router');

let FmsPostItem = require('FmsPostItem');
let postApi = require('PostsApi');

import uuid from 'uuid';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import { AlertList, Alert, AlertContainer } from "react-bs-notifier";
import dashboardApi from 'DashboardAPI';
import projectApi from 'ProjectApi';

const ALERT_TIME_DISMIS = 2500;

let FmsPosts = React.createClass({
  getInitialState: function() {
    return {
      posts: [],
      next: null,
      alerts: [],
      isLoading: false
    }
  },
  componentDidMount: function() {
    let self = this;
    let projectAlias = this.props.params.alias;

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
              self.noti('success', 'Ẩn bình luận thành công');
            } else {
              self.noti('success', 'Bỏ ẩn bình luận thành công');
            }
          }
        }
      })
      .catch(err => alert(err.message));
  },
  noti: function (type, message) {
    let self = this;

    let alert = {
      id: uuid(),
      type: type,
      message: message
    }

    let alerts = self.state.alerts;
    alerts.push(alert);
    self.setState({alerts: alerts});

    setTimeout(() => {
      self.removeNoti(alert.id);
    }, ALERT_TIME_DISMIS);
  },
  removeNoti: function (a_id) {
    let self = this;

    let alerts = self.state.alerts;
    let filterAlerts = alerts.filter(a => a.id != a_id);

    self.setState({alerts: filterAlerts});
  },
  loadMorePosts: function () {
    let self = this;
    let projectAlias = self.props.params.alias;

    self.setState({isLoading: true});

    postApi.getPostsOfProject(projectAlias, self.state.next)
      .then(
        data => {
          let posts = self.state.posts.concat(data.data);
          self.setState({
            posts: posts,
            next: data.paging ? (data.paging.next ? data.paging.next : null) : null
          });
        },
        err => {
          alert('Can\'t get posts');
        }
      )

  },
  renderPosts: function () {
    let self = this;
    let posts = this.state.posts;

    return posts.map((post) => {
      return (
        <Col xs={12} sm={6} md={4} key={post.fb_id}>
          <FmsPostItem  data={post} onToggleChange={this.onToggleChange}/>
        </Col>
      )
    });
  },
  renderAlerts: function () {
    let self = this;
    let alerts = self.state.alerts;
    let alertItems = alerts.map(alert => {
      return (
        <Alert key={alert.id} type={alert.type} onDismiss={() => {self.removeNoti(alert.id)}}>{alert.message}</Alert>
      )
    })

    return (
      <AlertContainer>
    		{ alertItems }
    	</AlertContainer>
    )
  },
  render: function() {
    let self = this;

    return (
      <Grid bsClass="page">
        {self.renderAlerts()}
        <Row>
          {this.renderPosts()}
        </Row>
        {
          self.state.next ? <Button disabled={self.state.isLoading} onClick={self.loadMorePosts}>Load more</Button> : null
        }
      </Grid>
    );
  }
});

module.exports = FmsPosts;
