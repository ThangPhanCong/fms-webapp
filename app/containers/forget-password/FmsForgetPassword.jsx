import React, {Component} from 'react';
import forgetPassApi from '../../api/ForgetPasswordApi';

class FmsForgetPassword extends Component {
    state = {
        email: '',
        isLoading: false,
        isSendEmail: false
    };

    sendForgetPassReq() {
        const {email} = this.state;
        if (!email) return alert('Email không được để trống');

        this.setState({isLoading: true});

        forgetPassApi.sendForgetPasswordReq({email})
            .then(
                res => {
                    this.setState({isSendEmail: true});
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
        const {email, isLoading, isSendEmail} = this.state;

        return (
            <div>
                <div className="col-md-4 col-md-offset-4">
                    <div className="ibox-content">
                        <h2>Quên mật khẩu</h2>

                        {
                            isSendEmail ?
                                (
                                    <p>Một đường dẫn thay đổi mật khẩu đã được gửi về hòm thư <strong>{email}</strong></p>
                                )
                                : (
                                    <form className="m-t null">
                                        <fieldset className="form-group">
                                            <input type="text"
                                                   ref='email'
                                                   className="form-control"
                                                   placeholder="Email của bạn"
                                                   value={email || ''}
                                                   onChange={() => this.onInputChange('email')}
                                            />
                                        </fieldset>
                                        <button
                                            type='submit'
                                            className="btn btn-primary block full-width m-b"
                                            style={{margin: 0}}
                                            disabled={isLoading}
                                            onClick={() => this.sendForgetPassReq()}
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

export default FmsForgetPassword;