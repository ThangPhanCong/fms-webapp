import React, {Component} from 'react';
import propTypes from 'prop-types';
import * as ghnApi from '../../../../api/GiaoHangNhanhApi';
import {convert_case} from 'utils/location-string-utils';

class GiaoHangNhanhPanel extends Component {
    state = {
        provinces: [],
        districts: [],
        wards: []
    };

    onChangeInput(refName) {
        const newValue = this.refs[refName].value;
        const {
            onChangeInput
        } = this.props;

        onChangeInput(refName, newValue);
    }

    onChangeProvince() {
        const {onChangeInput} = this.props;
        const newValue = this.refs['FromProvinceID'].value;

        if (newValue === '') {
            this.setState({districts: [], wards: []});

            onChangeInput('FromProvinceID', '');
        } else {
            ghnApi.getDistricts(newValue)
                .then(res => this.setState({districts: res, wards: []}));
            onChangeInput('FromProvinceID', newValue);
        }
    }

    onChangeDistrict() {
        const {onChangeInput} = this.props;
        const newValue = this.refs['FromDistrictID'].value;

        if (newValue === '') {
            this.setState({wards: []});

            onChangeInput('FromDistrictID', '');
        } else {
            ghnApi.getWards(newValue)
                .then(res => this.setState({wards: res['Wards']}));
            onChangeInput('FromDistrictID', newValue);
        }
    }

    componentDidMount() {
        const province = this.props.providerInfo['FromProvinceID'];
        const district = this.props.providerInfo['FromDistrictID'];

        ghnApi.getProvinces()
            .then(provinces => this.setState({provinces}));

        if (province !== '' && province !== undefined) {
            ghnApi.getDistricts(province)
                .then(res => this.setState({districts: res}));
        }
        if (district !== '' && district !== undefined) {
            ghnApi.getWards(district)
                .then(res => this.setState({wards: res['Wards']}));
        }
    }

    render() {
        const {
            providerInfo,
            disabled
        } = this.props;

        const {
            provinces,
            districts,
            wards
        } = this.state;

        /**
         check('Email').exists(),
         check('Password').exists(),

         check('ClientContactName').exists(),
         check('ClientContactPhone').exists(),

         check('FromDistrictID').exists(),
         check('FromWardCode').exists(),
         check('ClientAddress').exists(),
         */

        return (
            <div>
                <p style={{marginBottom: 30}}>Để cấu hình nhà vận chuyển Giao Hàng Nhanh, bạn phải là khách hàng của
                    Giao Hàng Nhanh, và yêu cầu GHN cung cấp những thông tin sau.</p>

                <div className="panel panel-primary">
                    <div className="panel-heading">Thông tin tài khoản</div>
                    <div className="panel-body">

                        <div className="row">
                            <div className="form-group col-sm-6">
                                <div className="col-sm-4">
                                    <label className="control-label">Email</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text"
                                           className="form-control"
                                           ref='Email'
                                           value={providerInfo['Email'] || ''}
                                           onChange={() => {
                                               this.onChangeInput('Email')
                                           }}
                                           disabled={disabled}
                                    />
                                </div>
                            </div>

                            <div className="form-group col-sm-6">
                                <div className="col-sm-4">
                                    <label className="control-label">Mật khẩu</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="password"
                                           className="form-control"
                                           ref='Password'
                                           value={providerInfo['Password'] || ''}
                                           onChange={() => {
                                               this.onChangeInput('Password')
                                           }}
                                           disabled={disabled}
                                    />
                                </div>
                            </div>

                            <div className="form-group col-sm-6">
                                <div className="col-sm-4">
                                    <label className="control-label">Họ và Tên</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text"
                                           className="form-control"
                                           ref='ClientContactName'
                                           value={providerInfo['ClientContactName'] || ''}
                                           onChange={() => {
                                               this.onChangeInput('ClientContactName')
                                           }}
                                           disabled={disabled}
                                    />
                                </div>
                            </div>

                            <div className="form-group col-sm-6">
                                <div className="col-sm-4">
                                    <label className="control-label">Số điện thoại</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="number"
                                           className="form-control"
                                           ref='ClientContactPhone'
                                           value={providerInfo['ClientContactPhone'] || ''}
                                           onChange={() => {
                                               this.onChangeInput('ClientContactPhone')
                                           }}
                                           disabled={disabled}
                                    />
                                </div>
                            </div>

                            <div className="form-group col-sm-6">
                                <div className="col-sm-4">
                                    <label className="control-label">Gói dịch vụ</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="number"
                                           className="form-control"
                                           ref='ServiceID'
                                           value={providerInfo['ServiceID'] || ''}
                                           onChange={() => {
                                               this.onChangeInput('ServiceID')
                                           }}
                                           disabled={disabled}
                                    />
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                <div className="panel panel-success">
                    <div className="panel-heading">Thông tin kho hàng</div>
                    <div className="panel-body">

                        <div className="row">
                            <div className="form-group col-sm-6">
                                <div className="col-sm-5">
                                    <label className="control-label">Tỉnh/Thành phố</label>
                                </div>
                                <div className="col-sm-7">
                                    <select className="form-control"
                                            ref='FromProvinceID'
                                            value={providerInfo['FromProvinceID'] || ''}
                                            onChange={() => {
                                                this.onChangeProvince()
                                            }}
                                            disabled={disabled}
                                    >
                                        <option value=""/>
                                        {
                                            provinces.length > 0 && provinces.map(p => (
                                                <option value={p.ProvinceID} key={p.ProvinceID}>
                                                    {p.ProvinceName}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="form-group col-sm-6">
                                <div className="col-sm-5">
                                    <label className="control-label">Quận/Huyện</label>
                                </div>
                                <div className="col-sm-7">
                                    <select className="form-control"
                                            ref='FromDistrictID'
                                            value={providerInfo['FromDistrictID'] || ''}
                                            onChange={() => {
                                                this.onChangeDistrict()
                                            }}
                                            disabled={disabled}
                                    >
                                        <option value=""/>
                                        {
                                            districts.length > 0 && districts.map(p => (
                                                <option value={p.DistrictID} key={p.DistrictID}>
                                                    {p.DistrictName}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="form-group col-sm-6">
                                <div className="col-sm-5">
                                    <label className="control-label">Làng/Xã</label>
                                </div>
                                <div className="col-sm-7">
                                    <select className="form-control"
                                            ref='FromWardCode'
                                            value={providerInfo['FromWardCode'] || ''}
                                            onChange={() => {
                                                this.onChangeInput('FromWardCode')
                                            }}
                                            disabled={disabled}
                                    >
                                        <option value=""/>
                                        {
                                            wards.length > 0 && wards.map(p => (
                                                <option value={p.WardCode} key={p.WardCode}>
                                                    {p.WardName}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="form-group col-sm-6">
                                <div className="col-sm-5">
                                    <label className="control-label">Địa chỉ</label>
                                </div>
                                <div className="col-sm-7">
                                    <input className="form-control"
                                           ref='ClientAddress'
                                           value={providerInfo['ClientAddress'] || ''}
                                           onChange={() => {
                                               this.onChangeInput('ClientAddress')
                                           }}
                                           disabled={disabled}
                                    />
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        )
    }
}

GiaoHangNhanhPanel.propTypes = {
    providerInfo: propTypes.object,
    onChangeInput: propTypes.func,
    disabled: propTypes.bool
};

export default GiaoHangNhanhPanel;