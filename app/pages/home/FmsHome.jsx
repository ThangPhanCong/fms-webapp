import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect, withRouter} from 'react-router-dom';
import * as store from '../../helpers/storage';
import {logIn} from '../../actions/auth';

class FmsHome extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  onClickLoginBtn() {
    const {dispatch} = this.props;
    dispatch(logIn());
  }

  render() {
    return (
      <div className="container-fluid homepage page">
        <h1 className="page-title">Facebook Marketing Suite</h1>
        <p className="page-description">Tools for conversation management, customers, selling at stall, integrated transportation and supporting utilities</p>

        <a to='/login' className="button" onClick={this.onClickLoginBtn.bind(this)}>ENTER DASHBOARD</a>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default withRouter(connect(mapStateToProps)(FmsHome));
