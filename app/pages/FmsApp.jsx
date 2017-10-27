import React, {Component} from 'react';
import {connect} from 'react-redux';
import { AlertList, Alert, AlertContainer } from "react-bs-notifier";
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import * as store from '../helpers/storage';
import uuid from 'uuid';

import FmsHome from 'FmsHome';
import FmsProject from 'FmsProject';
import FmsDashboard from 'FmsDashboard';
import FmsNavigation from 'FmsNavigation';
import FmsPosts from 'FmsPosts';
import FmsSettings from 'FmsSettings';
import FmsLoading from 'FmsLoading';
import FmsRoute from 'FmsRoute';
import tokenApi from 'TokenApi';
import * as socket from '../socket';
import {ALERT_TIME_DISMIS} from '../constants/utils';
import config from 'CONFIG';
import {logIn, verifyAccessToken} from '../actions/auth';

class FmsApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alerts: [],
      isLoading: true
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;

    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const access_token = params.get('access_token');

    dispatch(verifyAccessToken(access_token));
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
    self.setState({ alerts: alerts });

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
        <Alert key={alert.id} type={alert.type} onDismiss={() => { self.removeNoti(alert.id) }}>{alert.message}</Alert>
      )
    })

    return (
      <AlertContainer>
        {alertItems}
      </AlertContainer>
    )
  }

  render() {
    let self = this;

    const {isLoading, isAuthenticated} = this.props;

    if (isLoading) {
      return (
        <FmsLoading />
      )
    } else {
      if (isAuthenticated) {
        return (
          <div>
            {self.renderAlerts()}
            <FmsNavigation />
            <Switch>
              <FmsRoute exact path="/projects" component={FmsProject} noti={self.noti.bind(this)} />
              <FmsRoute exact path="/projects/:project_alias" component={FmsDashboard} noti={self.noti.bind(this)} />
              <FmsRoute path="/projects/:project_alias/posts" component={FmsPosts} noti={self.noti.bind(this)} />
              <FmsRoute path="/projects/:project_alias/settings" component={FmsSettings} noti={self.noti.bind(this)} />
              <Redirect to="/projects"/>
            </Switch>
          </div>
        )
      } else {
        return (
          <Switch>
            <FmsRoute exact path="/" component={FmsHome} noti={self.noti.bind(this)}/>
            <Redirect to="/"/>
          </Switch>
        )
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.isLoading,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  }
}

export default withRouter(connect(mapStateToProps)(FmsApp));
