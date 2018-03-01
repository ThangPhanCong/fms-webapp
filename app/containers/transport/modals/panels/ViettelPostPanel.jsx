import React, { Component } from 'react';
import propTypes from 'prop-types';
import {getProvinces, getDistricts, getWards, getViettelInfoAccount} from '../../../../api/ViettelPostApi';

class ViettelPostPanel extends Component {
    state = {
        provinces: [],
        districts: [],
        wards: [],
        districtfilter: [],
        wardfilter: []
    }

    onChangeInput(refName) {
        const newValue = this.refs[refName].value;
        const {
            onChangeInput
        } = this.props;

        onChangeInput(refName, newValue);
    }

    onChangeProvince() {
        const {onChangeInput} = this.props;
        let districts = this.state.districts;
        const newValue = this.refs['PROVINCE_ID'].value;

        if (newValue === '') {
            this.setState({districtfilter: []});
            
            onChangeInput('PROVINCE_ID', '');
        } else {
            let districtfilter = districts.filter(d => d.PROVINCE_ID === newValue);
            this.setState({districtfilter});
    
            onChangeInput('PROVINCE_ID', newValue);
        }
    }

    onChangeDistrict() {
        const {onChangeInput} = this.props;
        let wards = this.state.wards;
        const newValue = this.refs['DISTRICT_ID'].value;

        if (newValue === '') {
            this.setState({wardfilter: []});
            
            onChangeInput('DISTRICT_ID', '');
        } else {
            let wardfilter = wards.filter(w => w.DISTRICT_ID === newValue);
            this.setState({wardfilter});
            
            onChangeInput('DISTRICT_ID', newValue);
        }

    }

    componentDidMount() {
        getWards()
            .then(wards => {
                if (this.refs['DISTRICT_ID'] && this.refs['DISTRICT_ID'].value !== '') {
                    let wardfilter = wards.filter(w => w.DISTRICT_ID === this.refs['DISTRICT_ID'].value);
                    this.setState({wards, wardfilter});
                } else {
                    this.setState({wards});
                }
            });

        getDistricts()
            .then(districts => {
                if (this.refs['PROVINCE_ID'] && this.refs['PROVINCE_ID'].value !== '') {
                    let districtfilter = districts.filter(d => d.PROVINCE_ID === this.refs['PROVINCE_ID'].value);
                    this.setState({districts, districtfilter});
                } else {
                    this.setState({districts});
                }
            });

        getProvinces()
            .then(provinces => this.setState({provinces}));
    }

    render() {
        const {
            providerInfo,
            disabled
        } = this.props;

        const {
            provinces,
            districts,
            wards,
            districtfilter,
            wardfilter,
        } = this.state;

        return (
            <div>
                <div className="row">
                    <div className="form-group col-sm-6">
                        <div className="col-sm-4">
                            <label className="control-label">Tên</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="text"
                                className="form-control"
                                ref='FIRSTNAME'
                                value={providerInfo.FIRSTNAME || ''}
                                onChange={() => {this.onChangeInput('FIRSTNAME')}}
                                disabled={disabled}
                            />
                        </div>
                    </div>
                    <div className="form-group col-sm-6">
                        <div className="col-sm-4">
                            <label className="control-label">Họ</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="text"
                                className="form-control"
                                ref='LASTNAME'
                                value={providerInfo.LASTNAME || ''}
                                onChange={() => {this.onChangeInput('LASTNAME')}}
                                disabled={disabled}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-sm-6">
                        <div className="col-sm-4">
                            <label className="control-label">Email</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="text"
                                className="form-control"
                                ref='EMAIL'
                                value={providerInfo.EMAIL || ''}
                                onChange={() => {this.onChangeInput('EMAIL')}}
                                disabled={disabled}
                            />
                        </div>
                    </div>
                    <div className="form-group col-sm-6">
                        <div className="col-sm-4">
                            <label className="control-label">Mật khẩu</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="text"
                                className="form-control"
                                ref='PASSWORD'
                                value={providerInfo.PASSWORD || ''}
                                onChange={() => {this.onChangeInput('PASSWORD')}}
                                disabled={disabled}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-sm-6">
                        <div className="col-sm-4">
                            <label className="control-label">Điện thoại</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="text"
                                className="form-control"
                                ref='PHONE'
                                value={providerInfo.PHONE || ''}
                                onChange={() => {this.onChangeInput('PHONE')}}
                                disabled={disabled}
                            />
                        </div>
                    </div>
                    <div className="form-group col-sm-6">
                        <div className="col-sm-4">
                            <label className="control-label">Tên hiển thị</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="text"
                                className="form-control"
                                ref='DISPLAYNAME'
                                value={providerInfo.DISPLAYNAME || ''}
                                onChange={() => {this.onChangeInput('DISPLAYNAME')}}
                                disabled={disabled}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-sm-6">
                        <div className="col-sm-4">
                            <label className="control-label">Giới tính</label>
                        </div>
                        <div className="col-sm-8">
                            <select className="form-control"
                                ref='SEX'
                                value={providerInfo.SEX || ''}
                                onChange={() => {this.onChangeInput('SEX')}}
                                disabled={disabled}
                            >
                                <option value=""></option>
                                <option value="1">Nam</option>
                                <option value="0">Nữ</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group col-sm-6">
                        <div className="col-sm-4">
                            <label className="control-label">Tỉnh/Thành phố</label>
                        </div>
                        <div className="col-sm-8">
                            <select className="form-control"
                                ref='PROVINCE_ID'
                                value={providerInfo.PROVINCE_ID || ''}
                                onChange={() => {this.onChangeProvince()}}
                                disabled={disabled}
                            >
                                <option value=""></option>
                                {
                                    provinces.length > 0 && provinces.map(p => {
                                        return <option value={p.PROVINCE_ID} key={p.PROVINCE_ID}>
                                                {p.PROVINCE_NAME}
                                                </option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-sm-6">
                        <div className="col-sm-4">
                            <label className="control-label">Quận/Huyện</label>
                        </div>
                        <div className="col-sm-8">
                            <select className="form-control"
                                ref='DISTRICT_ID'
                                value={providerInfo.DISTRICT_ID || ''}
                                onChange={() => {this.onChangeDistrict()}}
                                disabled={disabled}
                            >
                                <option value=""></option>
                                {
                                    districtfilter.length > 0 && districtfilter.map(d => {
                                        return <option value={d.DISTRICT_ID} key={d.DISTRICT_ID}>
                                                {d.DISTRICT_NAME}
                                                </option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-group col-sm-6">
                        <div className="col-sm-4">
                            <label className="control-label">Phường/Xã</label>
                        </div>
                        <div className="col-sm-8">
                            <select className="form-control"
                                ref='WARDS_ID'
                                value={providerInfo.WARDS_ID || ''}
                                onChange={() => {this.onChangeInput('WARDS_ID')}}
                                disabled={disabled}
                            >
                                <option value=""></option>
                                {
                                    wardfilter.length > 0 && wardfilter.map(w => {
                                        return <option value={w.WARDS_ID} key={w.WARDS_ID}>
                                                {w.WARDS_NAME}
                                                </option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-sm-6">
                        <div className="col-sm-4">
                            <label className="control-label">Địa chỉ</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="text"
                                className="form-control"
                                ref='ADDRESS'
                                value={providerInfo.ADDRESS || ''}
                                onChange={() => {this.onChangeInput('ADDRESS')}}
                                disabled={disabled}
                            />
                        </div>
                    </div>
                    <div className="form-group col-sm-6">
                        <div className="col-sm-4">
                            <label className="control-label">Giới thiệu</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="text"
                                className="form-control"
                                ref='INTRODUCTION'
                                value={providerInfo.INTRODUCTION || ''}
                                onChange={() => {this.onChangeInput('INTRODUCTION')}}
                                disabled={disabled}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ViettelPostPanel.propTypes = {
    providerInfo: propTypes.object,
    onChangeInput: propTypes.func,
    disabled: propTypes.bool
};

export default ViettelPostPanel;
