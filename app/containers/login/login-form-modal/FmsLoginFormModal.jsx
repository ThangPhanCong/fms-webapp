import React, { Component } from 'react';
import propTypes from 'prop-types';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {logIn} from '../../../actions/auth';
import FmsSpin from '../../../commons/FmsSpin/FmsSpin';
import FmsTabs from '../../../commons/FmsTabs/FmsTabs';
import FmsTab from '../../../commons/FmsTabs/FmsTab';

class FmsLoginFormModal extends Component {
    state = {
        isLoading: false,
        tabActive: 0
    };

    logInWithFacebook() {
        this.setState({isLoading: true});
        const {dispatch} = this.props;
        dispatch(logIn());
    }

    switchTab(value) {
        this.setState({tabActive: value});
    }

    render() {
        const {isShown, onClose} = this.props;
        const {isLoading, tabActive} = this.state;

        return (
            <Modal
                show={isShown}
                onHide={onClose}
            >
                <div className='order-detail-modal inmodal'>
                    <Modal.Header closeButton>
                        <h4>Đăng nhập</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <FmsTabs tabActive={tabActive} onHandleChange={this.switchTab.bind(this)}>
                            <FmsTab title='Chủ cửa hàng đăng nhập'>
                                {isLoading ? <FmsSpin center size={20}/> : null}
                                <div className="loginForm animated fadeInDown">
                                    <div className="row">
                                        <div className="col-md-8 col-md-offset-2">
                                            <div className="ibox-content">
                                                <div className="m-t">
                                                    <a className="btn btn-success btn-outline btn-block btn-facebook text-center"
                                                        onClick={this.logInWithFacebook.bind(this)}
                                                    >
                                                        <i className="fa fa-facebook"> </i> Đăng nhập với Facebook
                                                    </a>
                                                    <br/>
                                                    <p className="text-muted text-center">
                                                        <small>Bạn là nhân viên? </small>
                                                        <a className='text-center' onClick={this.switchTab.bind(this, 1)}>
                                                            <small>Đăng nhập</small>
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FmsTab>

                            <FmsTab title='Nhân viên đăng nhập'>
                                {isLoading ? <FmsSpin center size={20}/> : null}
                                <div className="loginForm animated fadeInDown">
                                    <div className="row">
                                        <div className="col-md-8 col-md-offset-2">
                                            <div className="ibox-content">
                                                <div className="m-t">
                                                    <div className="form-group">
                                                        <input type="email" className="form-control" placeholder="Email" />
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="password" className="form-control" placeholder="Mật khẩu" />
                                                    </div>
                                                    <button type="submit" 
                                                        className="btn btn-primary block full-width m-b"
                                                        disabled={isLoading}
                                                    >
                                                        Đăng nhập
                                                    </button>

                                                    <p className="text-muted text-center">
                                                        <a href="#" className='text-center'>
                                                            <small>Quên mật khẩu?</small>
                                                        </a>
                                                    </p>
                                                </div>
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
