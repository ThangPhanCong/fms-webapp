import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';
import * as store from '../../helpers/storage';

import FmsAuthen from 'FmsAuthen';
import FmsSpin from 'FmsSpin';
import tokenApi from 'TokenApi';
import * as socket from '../../socket';
import config from 'CONFIG';

class FmsLogin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true
    };
  }
  componentDidMount() {
    let self = this;

    const search = self.props.location.search;
    const params = new URLSearchParams(search);
    const access_token = params.get('access_token');

    if (access_token) {
      tokenApi.verifyAccessToken(access_token)
        .then(userData => {
          store.set('jwt', access_token);
          store.set('user', userData);
          socket.connect(config.BASE_URL, access_token);
          FmsAuthen.isAuthenticated = true;
        })
        .catch(err => {
          alert(err);
          store.clearAll();
        })
        .then(() => {
          self.setState({ isLoading: false });
        })
    } else {
      FmsAuthen.login();
    }
  }

  render() {
    let self = this;

    if (self.state.isLoading) {
      return (
        <div className="login-callback-wrapper">
          <div className="center">
            <FmsSpin size={50}></FmsSpin>
          </div>
        </div>
      )
    } else {
      if (FmsAuthen.isAuthenticated) {
        return <Redirect to='/projects' />
      } else {
        return <Redirect to='/' />
      }
    }
  }
}

export default FmsLogin;
