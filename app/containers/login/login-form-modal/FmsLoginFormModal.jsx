import React, { Component } from 'react';
import propTypes from 'prop-types';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import FmsTabs from '../../../commons/FmsTabs/FmsTabs';
import FmsTab from '../../../commons/FmsTabs/FmsTab';
import {StaffLogIn} from '../../../api/StaffApi';
import {projectsLoaded} from '../../../actions/project/project';
import {BASE_URL, REDIRECT_TO} from "CONFIG";
import {AuthenService} from "../../../services/AuthenService";

class FmsLoginFormModal extends Component {
    state = {
        staff: {},
        isLoading: false,
        tabActive: 0,
        error: ''
    };

    logInWithFacebook() {
        this.setState({isLoading: true});
        window.location = `${BASE_URL}/api/a/user/oauth/fb?redirect_to=${REDIRECT_TO}`;
    }

    switchTab(value) {
        this.setState({tabActive: value});
    }

    onChangeInput(refName, newValue = this.refs[refName].value) {
        const newStaff = {...this.state.staff};
        newStaff[refName] = newValue;

        this.setState({staff: newStaff, error: ''});
    }

    staffLogIn() {
        this.setState({isLoading: true});
        const {dispatch} = this.props;
        const {staff} = this.state;
        StaffLogIn(staff)
            .then(res => {
                this.setState({error: '', isLoading: false});
                dispatch(projectsLoaded(res.projects));
                AuthenService.verifyAccessToken(res.access_token);
                this.props.history.push('/?access_token=' + res.access_token);
            }) 
            .catch(() => {this.setState({error: 'Sai thông tin đăng nhập', isLoading: false})})
    }

    render() {
        const {isShown, onClose} = this.props;
        const {isLoading, tabActive, error} = this.state;

        return (
            <Modal
                show={isShown}
                onHide={onClose}
            >
                <div className='fms-login-modal inmodal'>
                    <Modal.Header closeButton>
                        <h4>Đăng nhập</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <FmsTabs tabActive={tabActive} onHandleChange={this.switchTab.bind(this)}>
                            <FmsTab title='Chủ cửa hàng đăng nhập'>
                                {/*{isLoading ? <FmsSpin center size={20}/> : null}*/}
                                <div className="loginForm animated fadeInDown">
                                    <div className="row">
                                        <div className="col-md-8 col-md-offset-2">
                                            <div className="ibox-content">
                                                <div className="m-t">
                                                    <button
                                                        className="btn btn-success btn-outline btn-block btn-facebook text-center"
                                                        onClick={this.logInWithFacebook.bind(this)}
                                                        disabled={isLoading}
                                                    >
                                                        <i className="fa fa-facebook"> </i> Đăng nhập với Facebook
                                                    </button>
                                                    <br/>
                                                    {/*<p className="text-muted text-center">*/}
                                                        {/*<small>Bạn là nhân viên? </small>*/}
                                                        {/*<a className='text-center' onClick={this.switchTab.bind(this, 1)}>*/}
                                                            {/*<small>Đăng nhập</small>*/}
                                                        {/*</a>*/}
                                                    {/*</p>*/}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FmsTab>

                            <FmsTab title='Nhân viên đăng nhập'>
                                {/*{isLoading ? <FmsSpin center size={20}/> : null}*/}
                                {
                                    error ?
                                        <p className="help-block help-block-login">{error}</p>
                                        : null
                                }
                                <div className="loginForm animated fadeInDown">
                                    <div className="row">
                                        <div className="col-md-8 col-md-offset-2">
                                            <div className="ibox-content">
                                                <form className={"m-t " + (error!=='' ? 'has-error' : null)}>
                                                    <fieldset className="form-group">
                                                        <input
                                                            className="form-control"
                                                            type="email"
                                                            ref='email'
                                                            placeholder='Email'
                                                            onChange={() => {
                                                                this.setState({error: null});
                                                                this.onChangeInput('email');
                                                            }}/>
                                                    </fieldset>
                                                    <fieldset className="form-group">
                                                        <input type="password" className="form-control" ref='password'
                                                            placeholder='Mật khẩu'
                                                            onChange={() => {
                                                                this.setState({error: null});
                                                                this.onChangeInput('password')
                                                            }}/>
                                                    </fieldset>
                                                    <button type="submit" 
                                                        className="btn btn-primary block full-width m-b"
                                                        onClick={() => this.staffLogIn()}
                                                        disabled={isLoading}
                                                    >
                                                        Đăng nhập
                                                    </button>

                                                    <p className="text-muted text-center">
                                                        <Link to='/forget-password' replace>
                                                            <small>Quên mật khẩu?</small>
                                                        </Link>
                                                    </p>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FmsTab>

                        </FmsTabs>
                        
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
