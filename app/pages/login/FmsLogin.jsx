'use strict';

import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import store from 'store';
import 'url-search-params-polyfill';

import FmsAuthen from 'FmsAuthen';
import FmsSpin from 'FmsSpin';
import tokenApi from 'TokenApi';

let FmsLogin =  React.createClass({
  getInitialState: function () {
    return {
      isAuthenticate: false,
      isLoading: true
    }
  },
  componentDidMount: function () {
    let self = this;

    const search = self.props.location.search;
    const params = new URLSearchParams(search);
    const access_token = params.get('access_token');

    if (access_token) {
      tokenApi.verifyAccessToken(access_token)
        .then(userData => {
          store.set('jwt', access_token);
          store.set('user', userData);
        })
        .catch(err => {
          alert(err);
          store.clearAll('jwt');
        })
        .then(() => {
          self.setState({isLoading: false});
        })
    } else {
      FmsAuthen.login();
    }
  },
  render: function() {
    let self = this;

    if (self.state.isLoading) {
      return (
        <div className="login-callback-wrapper">
          <div className="center">
            <FmsSpin size={50}></FmsSpin>
          </div>
        </div>
      )
    }

    if (self.state.isAuthenticate) {
      return <Redirect to='/projects'/>
    } else {
      return <Redirect to='/'/>
    }
  }
});

module.exports = FmsLogin;
