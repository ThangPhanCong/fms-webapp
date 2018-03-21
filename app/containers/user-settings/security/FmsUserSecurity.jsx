import React, {Component} from 'react';
import {AuthenService} from "../../../services/AuthenService";
import shopOwnerSettingsApi from "../../../api/ShopOwnerSettingsApi";
import staffSettingsApi from "../../../api/StaffSettingsApi";

class FmsUserSecurity extends Component {

    state = {
        old_password: '',
        new_password: '',
        retype_new_password: '',
        isLoading: false
    };

    async updatePassword() {
        const {old_password, new_password, retype_new_password} = this.state;
        if (!old_password || !new_password || !retype_new_password) return alert('Mật khẩu không được để trống!');
        if (new_password !== retype_new_password) return alert('Nhập lại mật khẩu không khớp!');

        this.setState({isLoading: true});

        const userInfo = AuthenService.getUser();
        try {
            if (userInfo.role === 'SHOP_OWNER') {
                await shopOwnerSettingsApi.updatePassword(userInfo._id, {old_password, new_password});
            } else if (userInfo.role === 'STAFF') {
                await staffSettingsApi.updatePassword(userInfo._id, {old_password, new_password});
            }

            alert('Cập nhật mật khẩu thành công');
            this.setState({
                old_password: '',
                new_password: '',
                retype_new_password: ''
            });
        } catch (err) {
            alert(err.message);
        }

        this.setState({
            isLoading: false
        });
    }

    onInputChange(refName, newValue = this.refs[refName].value) {
        const newState = {...this.state};
        newState[refName] = newValue;

        this.setState(newState);
    }

    render() {
        const {old_password, new_password, retype_new_password, isLoading} = this.state;

        return (
            <div>
                <h2>Bảo mật</h2>
                <div className='ibox'>
                    <div className="ibox-content">
                        <div className="form-group">
                            <label>Mật khẩu cũ</label>
                            <input
                                className='form-control'
                                type="password"
                                value={old_password || ''}
                                ref='old_password'
                                onChange={() => this.onInputChange('old_password')}
                            />
                        </div>
                        <div className="form-group">
                            <label>Mật khẩu mới</label>
                            <input
                                className='form-control'
                                type="password"
                                value={new_password || ''}
                                ref='new_password'
                                onChange={() => this.onInputChange('new_password')}
                            />
                        </div>
                        <div className="form-group">
                            <label>Nhập lại mật khẩu mới</label>
                            <input
                                className='form-control'
                                type="password"
                                value={retype_new_password || ''}
                                ref='retype_new_password'
                                onChange={() => this.onInputChange('retype_new_password')}
                            />
                        </div>

                        <button
                            className='btn btn-primary'
                            disabled={isLoading}
                            onClick={() => this.updatePassword()}
                        >Cập nhật mật khẩu
                        </button>
                    </div>
                </div>

            </div>
        )
    }
}

export default FmsUserSecurity;