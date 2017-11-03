import React, {Component} from 'react';
import {connect} from 'react-redux';
import { AlertList, Alert, AlertContainer } from "react-bs-notifier";
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import * as store from '../helpers/storage';
import uuid from 'uuid';
import propTypes from 'prop-types';

import FmsHome from './home/FmsHome';
import FmsProject from './project/FmsProject';
import FmsDashboard from './dashboard/FmsDashboard';
import FmsNavigation from '../components/FmsNavigation';
import FmsPosts from './posts/FmsPosts';
import FmsSettings from './settings/FmsSettings';
import FmsLoading from '../components/FmsLoading';
import FmsRoute from '../components/FmsRoute';
import tokenApi from '../api/TokenApi';
import * as socket from '../socket';
import {ALERT_TIME_DISMIS} from '../constants/utils';
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
    const {isLoading, isAuthenticated} = this.props;

    if (isLoading) {
      return (
        <FmsLoading />
      )
    } else {
      if (isAuthenticated) {
        return (
          <div>
            {this.renderAlerts()}
            <FmsNavigation />
            <Switch>
              <FmsRoute exact path="/projects" component={FmsProject} noti={this.noti.bind(this)} />
              <FmsRoute exact path="/projects/:project_alias" component={FmsDashboard} noti={this.noti.bind(this)} />
              <FmsRoute path="/projects/:project_alias/posts" component={FmsPosts} noti={this.noti.bind(this)} />
              <FmsRoute path="/projects/:project_alias/settings" component={FmsSettings} noti={this.noti.bind(this)} />
              <Redirect to="/projects"/>
            </Switch>
          </div>
        )
      } else {
        return (
          <Switch>
            <FmsRoute exact path="/" component={FmsHome} noti={this.noti.bind(this)}/>
            <Redirect to="/"/>
          </Switch>
        )
      }
    }
  }
}

FmsApp.propTypes = {
  isLoading: propTypes.bool.isRequired,
  isAuthenticated: propTypes.bool.isRequired,
  user: propTypes.object
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.isLoading,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  }
}

export default withRouter(connect(mapStateToProps)(FmsApp));
