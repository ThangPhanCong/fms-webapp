import React, {Component} from 'react';
import {AuthenService} from "../../../services/AuthenService";
import shopOwnerSettingsApi from "../../../api/ShopOwnerSettingsApi";
import staffSettingsApi from "../../../api/StaffSettingsApi";

class FmsUserSettingsGeneral extends Component {

    state = {
        name: '',
        email: '',
        isLoading: false
    };

    async updateUserInfo() {
        const {name, email} = this.state;
        if (!name || !email) return alert('Tên và Email không được để trống!');

        this.setState({isLoading: true});

        const userInfo = AuthenService.getUser();
        try {
            let response;
            if (userInfo.role === 'SHOP_OWNER') {
                response = await shopOwnerSettingsApi.updateGeneralInfo(userInfo._id, {email, name});
            } else if (userInfo.role === 'STAFF') {
                response = await staffSettingsApi.updateGeneralInfo(userInfo._id, {email, name});
            }

            AuthenService.setUser(response.user_info);
            AuthenService.setAccessToken(response.access_token);
            alert('Cập nhật thông tin thành công');
        } catch (err) {
            alert(err.message);
        }

        this.setState({isLoading: false});
    }

    onInputChange(refName, newValue = this.refs[refName].value) {
        const newState = {...this.state};
        newState[refName] = newValue;

        this.setState(newState);
    }

    componentDidMount() {
        const userInfo = AuthenService.getUser();
        this.setState({
            name: userInfo.name,
            email: userInfo.email
        });
    }

    render() {
        const {name, email, isLoading} = this.state;

        return (
            <div>
                <h2>Thông tin chung</h2>
                <div className='ibox'>
                    <div className="ibox-content">
                        <div className="form-group">
                            <label>Họ và tên</label>
                            <input
                                className='form-control'
                                type="text"
                                value={name || ''}
                                ref='name'
                                onChange={() => this.onInputChange('name')}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                className='form-control'
                                type="text"
                                value={email || ''}
                                ref='email'
                                onChange={() => this.onInputChange('email')}
                            />
                        </div>

                        <button
                            className='btn btn-primary'
                            disabled={isLoading}
                            onClick={() => this.updateUserInfo()}
                        >Cập nhật</button>
                    </div>
                </div>

            </div>
        )
    }
}

export default FmsUserSettingsGeneral;