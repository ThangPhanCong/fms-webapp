import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {logIn} from '../../actions/auth';

import homepageImg from '../../images/homepage.jpg';

class FmsHome extends Component {
  onClickLoginBtn() {
    const {dispatch} = this.props;
    dispatch(logIn());
  }

  render() {
    let style = {
      background: `url(${homepageImg})`
    };
    return (
      <div className="container-fluid homepage page" style={style}>
        <h1 className="page-title">Facebook Marketing Suite</h1>
        <p className="page-description">Tools for conversation management, customers, selling at stall, integrated transportation and supporting utilities</p>

        <a className="button" onClick={this.onClickLoginBtn.bind(this)}>ENTER DASHBOARD</a>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
};

export default withRouter(connect(mapStateToProps)(FmsHome));
