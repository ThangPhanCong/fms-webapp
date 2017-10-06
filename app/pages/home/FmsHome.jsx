'use strict';

import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import store from 'store';

import FmsAuthen from 'FmsAuthen';

let FmsHome = React.createClass({
  getInitialState: function () {
    return {
      isLogedIn: false
    }
  },
  componentDidMount: function () {
    let jwt = store.get('jwt');
    if (jwt) {
      this.setState({isLogedIn: true});
    }
  },
  render: function() {
    let self = this;

    if (self.state.isLogedIn) {
      return <Redirect to='/projects'/>
    }

    return (
      <div className="container-fluid homepage page">
        <h1 className="page-title">Facebook Management Suite</h1>
        <p className="page-description">Tools for conversation management, customers, selling at stall, integrated transportation and supporting utilities</p>

        <Link to='/login' className="button" onClick={this.enterPages}>ENTER DASHBOARD</Link>
      </div>
    );
  }
});

module.exports = FmsHome;
