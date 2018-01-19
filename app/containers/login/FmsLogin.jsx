import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {logIn} from '../../actions/auth';


class FmsLogin extends Component {

    state = {
        isLoading: false
    };

    onClickLoginBtn() {
        const {dispatch} = this.props;
        dispatch(logIn());

        this.setState({isLoading: true});
    }

    render() {
        const {isLoading} = this.state;

        return (
            <div className='login-form'>
                <h1 className='animated fadeIn'>Adsbold</h1>

                <div className="center-block login-box text-center animated fadeInDown">

                    <p>Công cụ quản lí bán hàng qua Facebook, chăm sóc khách hàng, tích hợp các dịch vụ bên vận chuyển
                        và các tiện ích.</p>

                    <button
                        className="btn btn-primary block full-width m-b"
                        disabled={isLoading}
                        onClick={this.onClickLoginBtn.bind(this)}>Vào bảng điều khiển
                    </button>

                    <p className="m-t">
                        <small>Bản quyền thuộc về Adsbold &copy; 2017</small>
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
