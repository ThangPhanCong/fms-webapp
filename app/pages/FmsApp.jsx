'use strict';

import React from 'react';
import { AlertList, Alert, AlertContainer } from "react-bs-notifier";
import {Switch, Route} from 'react-router-dom';
import store from 'store';
import uuid from 'uuid';

import FmsHome from 'FmsHome';
import FmsProject from 'FmsProject';
import FmsDashboard from 'FmsDashboard';
import FmsLogin from 'FmsLogin';
import FmsNavigation from 'FmsNavigation';
import FmsPosts from 'FmsPosts';
import FmsSettings from 'FmsSettings';
import FmsLoading from 'FmsLoading';
import FmsRoute from 'FmsRoute';
import tokenApi from 'TokenApi';
import socket from 'Socket';

import {ALERT_TIME_DISMIS} from 'constant';
import config from 'CONFIG';

let FmsApp = React.createClass({
  getInitialState: function () {
    return {
      alerts: [],
      isLoading: true,
      isAuthenticated: false
    }
  },
  componentDidMount: function () {
    let self = this;
    // self.noti('success', 'Bỏ ẩn bình luận thành công');
    // info, warning, danger, or success.
    // verify token
  	let jwt = store.get('jwt');

  	if (jwt) {
  		tokenApi.verifyAccessToken(jwt)
  			.then(userData => {
  				socket.connect(config.BASE_URL, jwt);

          self.setState({
            isAuthenticated: true,
            isLoading: false
          });
  			})
  			.catch(err => {
          self.setState({
            isAuthenticated: false,
            isLoading: false
          });
  			})
  	} else {
      self.setState({
        isAuthenticated: false,
        isLoading: false
      });
  	}
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
  render: function () {
    let self = this;

    return self.state.isLoading ?
      <FmsLoading/>
      :
      <div>
        {self.renderAlerts()}
        <FmsNavigation />
        <Switch>
          <FmsRoute exact path="/" component={FmsHome} noti={self.noti}/>
          <FmsRoute exact path="/projects" component={FmsProject} noti={self.noti} socket={socket}/>
          <FmsRoute exact path="/projects/:project_alias" component={FmsDashboard} noti={self.noti} socket={socket}/>
          <FmsRoute path="/projects/:project_alias/posts" component={FmsPosts} noti={self.noti} socket={socket}/>
          <FmsRoute path="/projects/:project_alias/settings" component={FmsSettings} noti={self.noti} socket={socket}/>
          <FmsRoute path="/login" component={FmsLogin} noti={self.noti}/>
        </Switch>
      </div>
  }
});

module.exports = FmsApp;
