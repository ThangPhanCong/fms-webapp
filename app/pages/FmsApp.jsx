import React, {Component} from 'react';
import {connect} from 'react-redux';
import { AlertList, Alert, AlertContainer } from "react-bs-notifier";
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import * as store from '../helpers/storage';
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
import FmsAuthen from 'FmsAuthen';
import tokenApi from 'TokenApi';
import * as socket from '../socket';
import {ALERT_TIME_DISMIS} from '../constants/utils';
import config from 'CONFIG';

class FmsApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alerts: [],
      isLoading: true
    };
  }

  componentDidMount() {
    let self = this;
    // self.noti('success', 'Bỏ ẩn bình luận thành công');
    // info, warning, danger, or success.

    // verify access token
    let jwt = store.get('jwt');
    if (jwt) {
      tokenApi.verifyAccessToken(jwt)
        .then(userData => {
          socket.connect(config.BASE_URL, jwt);
          FmsAuthen.isAuthenticated = true;
        })
        .catch(err => {
          FmsAuthen.clean();
          FmsAuthen.isAuthenticated = false;
        })
        .then(() => {
          self.setState({ isLoading: false });
        })
    } else {
      FmsAuthen.clean();
      FmsAuthen.isAuthenticated = false;
      self.setState({ isLoading: false });
    }
  }

  noti(type, message) {
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
  }

  removeNoti(a_id) {
    let self = this;

    let alerts = self.state.alerts;
    let filterAlerts = alerts.filter(a => a.id != a_id);

    self.setState({alerts: filterAlerts});
  }

  renderAlerts() {
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
  }

  render() {
    let self = this;

    if (self.state.isLoading) {
      return (
        <FmsLoading/>
      )
    } else {
      if (FmsAuthen.isAuthenticated) {
        return (
          <div>
            {self.renderAlerts()}
            <FmsNavigation />
            <Switch>
              <FmsRoute exact path="/" component={FmsHome} noti={self.noti.bind(this)}/>
              <FmsRoute exact path="/projects" component={FmsProject} noti={self.noti.bind(this)} />
              <FmsRoute exact path="/projects/:project_alias" component={FmsDashboard} noti={self.noti.bind(this)} />
              <FmsRoute path="/projects/:project_alias/posts" component={FmsPosts} noti={self.noti.bind(this)} />
              <FmsRoute path="/projects/:project_alias/settings" component={FmsSettings} noti={self.noti.bind(this)} />
              <FmsRoute path="/login" component={FmsLogin} noti={self.noti.bind(this)}/>
            </Switch>
          </div>
        )
      } else {
        return (
          <Switch>
            <FmsRoute exact path="/" component={FmsHome} noti={self.noti.bind(this)}/>
            <FmsRoute path="/login" component={FmsLogin} noti={self.noti.bind(this)}/>
            <Redirect to="/"/>
          </Switch>
        )
      }
    }
  }
}

export default FmsApp;
