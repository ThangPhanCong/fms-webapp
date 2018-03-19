import React, {Component} from 'react';
import forgetPassApi from '../../api/ForgetPasswordApi';
import {Link} from "react-router-dom";

class FmsResetPassword extends Component {
    state = {
        password: '',
        rePassword: '',
        isLoading: false,
        isSendPass: false
    };

    sendResetPassReq() {
        const {password, rePassword} = this.state;
        const {location} = this.props;

        if (!password || !rePassword) return alert('Mật khẩu không được để trống');
        if (rePassword !== password) return alert('Mật khẩu không khớp');

        this.setState({isLoading: true});

        const params = new URLSearchParams(location.search);
        const access_token = params.get('t');

        forgetPassApi.sendResetPasswordReq(access_token, {password})
            .then(
                res => {
                    this.setState({isSendPass: true});
                },
                err => {
                    alert(err.message);
                }
            )
            .then(() => this.setState({isLoading: false}));
    }

    onInputChange(refName, newValue = this.refs[refName].value) {
        const newState = {
            ...this.state,
            [refName]: newValue
        };

        this.setState(newState);
    }

    render() {
        const {password, rePassword, isLoading, isSendPass} = this.state;

        return (
            <div>
                <div className="col-md-4 col-md-offset-4">
                    <div className="ibox-content">
                        <h2>Cập nhật mật khẩu</h2>
                        {
                            isSendPass ?
                                (
                                    <div>
                                        <p>Cập nhật mật khẩu thành công!</p>
                                        <Link
                                            className='btn btn-primary'
                                            to='/'
                                            replace
                                        >Đăng nhập ngay</Link>
                                    </div>
                                )
                                : (
                                    <form className="m-t null">
                                        <fieldset className="form-group">
                                            <input type="password"
                                                   ref='password'
                                                   className="form-control"
                                                   placeholder="Mật khẩu mới"
                                                   value={password || ''}
                                                   onChange={() => this.onInputChange('password')}
                                            />
                                        </fieldset>

                                        <fieldset className="form-group">
                                            <input type="password"
                                                   ref='rePassword'
                                                   className="form-control"
                                                   placeholder="Nhập lại mật khẩu"
                                                   value={rePassword || ''}
                                                   onChange={() => this.onInputChange('rePassword')}
                                            />
                                        </fieldset>

                                        <button
                                            type='submit'
                                            className="btn btn-primary block full-width m-b"
                                            style={{margin: 0}}
                                            disabled={isLoading}
                                            onClick={() => this.sendResetPassReq()}
                                        >Xác nhận</button>
                                    </form>
                                )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default FmsResetPassword;