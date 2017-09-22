'use strict';

const React = require('react');
const {browserHistory} = require('react-router');
const Cookie = require('universal-cookie');

const FmsAuthen = require('FmsAuthen');
const FmsSpin = require('FmsSpin');

const tokenApi = require('TokenApi');

let FmsLoginCallback =  React.createClass({
  componentDidMount: function () {
    let cookie = new Cookie();
    let access_token = this.props.location.query.access_token;

    tokenApi.verifyAccessToken(access_token)
      .then(userData => {
        cookie.set('jwt', access_token);
        browserHistory.push('/projects');
      })
      .catch(err => {
        alert(err);

        browserHistory.push('/');
      });
  },
  render: function() {
    return (
      <div className="login-callback-wrapper">
        <div className="center">
          <FmsSpin size={50}></FmsSpin>
        </div>
      </div>
    );
  }
});

module.exports = FmsLoginCallback;
