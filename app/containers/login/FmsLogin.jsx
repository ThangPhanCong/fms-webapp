import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {logIn} from '../../actions/auth';


class FmsLogin extends Component {

    onClickLoginBtn() {
        const {dispatch} = this.props;
        dispatch(logIn());
    }

    render() {
        return (
            <div className='login-form'>
                <h1>Adsbold</h1>

                <div className="center-block login-box text-center animated fadeInDown">

                    <p>Perfectly designed and precisely prepared admin theme with over 50 pages with extra new web app
                        views.
                    </p>
                    <p>Login in. To see it in action.</p>

                    <button
                        className="btn btn-primary block full-width m-b"
                        onClick={this.onClickLoginBtn.bind(this)} >Login
                    </button>

                    <p className="m-t">
                        <small>Inspinia we app framework base on Bootstrap 3 &copy; 2014</small>
                    </p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
};

export default withRouter(connect(mapStateToProps)(FmsLogin));
