import React, { Component } from 'react';
import propTypes from 'prop-types';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {logIn} from '../../../actions/auth';
import FmsSpin from '../../../commons/FmsSpin/FmsSpin';

class FmsLoginFormModal extends Component {
    state = {
        isLoading: false
    };

    logInWithFacebook() {
        const {dispatch} = this.props;
        dispatch(logIn());

        this.setState({isLoading: true});
    }

    render() {
        const {isShown, onClose, onClickSignInWithFacebook} = this.props;
        const {isLoading} = this.state;

        return (
            <Modal
                show={isShown}
                onHide={onClose}
            >
                <div className='order-detail-modal inmodal'>
                    <Modal.Header closeButton>
                        <h4>Login</h4>
                    </Modal.Header>
                    <Modal.Body>
                        {isLoading ? <FmsSpin center size={20}/> : null}
                        <div className="loginForm animated fadeInDown">
                            <div className="row">
                                <div className="col-md-8 col-md-offset-2">
                                    <div className="ibox-content">
                                        <div className="m-t">
                                            <div className="form-group">
                                                <input type="email" className="form-control" placeholder="Username" required="" />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control" placeholder="Password" required="" />
                                            </div>
                                            <button type="submit" 
                                                className="btn btn-primary block full-width m-b"
                                                disabled={isLoading}
                                            >
                                                Login
                                            </button>

                                            <a href="#">
                                                <small>Forgot password?</small>
                                            </a>

                                            <p className="text-muted text-center">
                                                <small>Do not have an account?</small>
                                            </p>
                                            
                                            <a className="btn btn-success btn-outline btn-block btn-facebook text-center"
                                                onClick={this.logInWithFacebook.bind(this)}
                                            >
                                                <i className="fa fa-facebook"> </i> Sign in with Facebook
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </div>

            </Modal>
        );
    }
}

FmsLoginFormModal.propTypes = {
    isShown: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired
};

export default withRouter(connect()(FmsLoginFormModal));
