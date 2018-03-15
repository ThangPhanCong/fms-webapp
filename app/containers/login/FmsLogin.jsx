import React, {Component} from 'react';
import FmsLoginFormModal from './login-form-modal/FmsLoginFormModal';

class FmsLogin extends Component {

    state = {
        isLoading: false,
        isShowLoginFormModal: false
    };

    onClickLoginBtn() {
        this.setState({isShowLoginFormModal: true});
    }

    onCloseModal() {
        this.setState({isShowLoginFormModal: false});
    }

    render() {
        const {isLoading, isShowLoginFormModal} = this.state;

        return (
            <div className='login-form'>
                <h1 className='animated fadeIn'>Adsbold</h1>

                <div className="center-block login-box text-center animated fadeInDown">

                    <p>Công cụ quản lí bán hàng qua Facebook, chăm sóc khách hàng, tích hợp các dịch vụ bên vận chuyển
                        và các tiện ích.</p>

                    <button
                        className="btn btn-primary block full-width m-b-sm"
                        disabled={isLoading}
                        onClick={this.onClickLoginBtn.bind(this)}>Vào bảng điều khiển
                    </button>

                    <FmsLoginFormModal 
                        isShown={isShowLoginFormModal} 
                        onClose={this.onCloseModal.bind(this)}  
                    />

                    <p className="m-t">
                        <small>Hỗ trợ: <i className='fa fa-envelope'> </i> 
                            <strong><a href="mailto:support@adsbold.com"> support@adsbold.com</a></strong>
                        </small>
                        <br/>
                        <small>Bản quyền thuộc về Adsbold &copy; 2017</small>
                    </p>
                </div>
            </div>
        )
    }
}

export default FmsLogin;
