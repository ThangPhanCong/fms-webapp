'use strict';

import React from 'react';
import { AlertList, Alert, AlertContainer } from "react-bs-notifier";
import {Switch, Route} from 'react-router-dom';
import uuid from 'uuid';

import FmsHome from 'FmsHome';
import FmsProject from 'FmsProject';
import FmsDashboard from 'FmsDashboard';
import FmsLogin from 'FmsLogin';
import FmsNavigation from 'FmsNavigation';
import FmsPosts from 'FmsPosts';
import FmsSettings from 'FmsSettings';

import {ALERT_TIME_DISMIS} from 'constant';

let FmsApp = React.createClass({
  getInitialState: function () {
    return {
      alerts: []
    }
  },
  componentDidMount: function () {
    let self = this;
    // self.noti('success', 'Bỏ ẩn bình luận thành công');
    // info, warning, danger, or success.
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

    return (
      <div>
        {self.renderAlerts()}
        <FmsNavigation />
        <Switch>
          <Route exact path="/" component={FmsHome}/>
          <Route exact path="/projects" component={FmsProject}/>
          <Route exact path="/projects/:project_alias" component={FmsDashboard}/>
          <Route path="/projects/:project_alias/posts" component={FmsPosts}/>
          <Route path="/projects/:project_alias/settings" component={FmsSettings}/>
          <Route path="/login" component={FmsLogin}/>
        </Switch>
      </div>
    );
  }
});

module.exports = FmsApp;
