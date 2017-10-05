'use strict';

const React = require('react');
import { AlertList, Alert, AlertContainer } from "react-bs-notifier";
import uuid from 'uuid';

const FmsNavigation = require('FmsNavigation');

const ALERT_TIME_DISMIS = 2500;

let FmsApp = React.createClass({
  getInitialState: function () {
    return {
      alerts: []
    }
  },
  componentDidMount: function () {
    let self = this;
    // self.noti('success', 'Bỏ ẩn bình luận thành công');
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
        <FmsNavigation location={this.props.location} params={this.props.params}/>
        {React.cloneElement(this.props.children, {noti: self.noti} )}
      </div>
    );
  }
});

module.exports = FmsApp;
