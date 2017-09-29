'use strict';

const React = require('react');
const {browserHistory} = require('react-router');

let FmsPostItem = require('FmsPostItem');
let postApi = require('PostsApi');

import uuid from 'uuid';
import {Grid, Row, Col} from 'react-bootstrap';
import { AlertList, Alert, AlertContainer } from "react-bs-notifier";

const ALERT_TIME_DISMIS = 2500;

let FmsPosts = React.createClass({
  getInitialState: function() {
    return {
      posts: [],
      alerts: []
    }
  },
  componentDidMount: function() {
    let self = this;

    postApi.getMockPostsOfProject()
      .then(
        posts => {
          self.setState({
            posts: posts
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
    let postChange = posts.filter((post) => {
      return post.fb_id == fb_post_id;
    });

    for (let post of posts) {
      if (post.fb_id == fb_post_id) {
        post.isHidedComment = !post.isHidedComment;
        // todo: request to hide cmts
        if (post.isHidedComment) {
          self.noti('success', 'Ẩn bình luận thành công');
        } else {
          self.noti('success', 'Bỏ ẩn bình luận thành công');
        }
      }
    }

    this.setState({
      posts: posts
    });
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
      </Grid>
    );
  }
});

module.exports = FmsPosts;
