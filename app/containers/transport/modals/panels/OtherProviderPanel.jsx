import React, { Component } from 'react';
import propTypes from 'prop-types';
import {getProvincesCache, getDistrictsCache, getWardsCache} from '../../../../api/ViettelPostApi';
import {convert_case} from 'utils/location-string-utils';

class OtherProviderPanel extends Component {
    state = {
        provinces: [],
        districts: [],
        wards: []
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
        const newValue = this.refs['PROVINCE_ID'].value;

        if (newValue === '') {
            this.setState({districts: [], wards: []});
            
            onChangeInput('PROVINCE_ID', '');
        } else {
            getDistrictsCache(newValue)
                .then(res => this.setState({districts: res, wards: []}));
            onChangeInput('PROVINCE_ID', newValue);
        }
    }

    onChangeDistrict() {
        const {onChangeInput} = this.props;
        const newValue = this.refs['DISTRICT_ID'].value;

        if (newValue === '') {
            this.setState({wards: []});
            
            onChangeInput('DISTRICT_ID', '');
        } else {
            getWardsCache(newValue)
                .then(res => this.setState({wards: res}));
            onChangeInput('DISTRICT_ID', newValue);
        }
    }

    componentDidMount() {
        const {PROVINCE_ID, DISTRICT_ID} = this.props.providerInfo;
        
        getProvincesCache()
            .then(provinces => this.setState({provinces}));

        if (PROVINCE_ID !== '' && PROVINCE_ID !== undefined) {
            getDistrictsCache(PROVINCE_ID)
                .then(res => this.setState({districts: res}));
        }
        if (DISTRICT_ID !== '' && DISTRICT_ID !== undefined) {
            getWardsCache(DISTRICT_ID)
                .then(res => this.setState({wards: res}));
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

        return (
            <div>
                <div className="row">
                    <div className="form-group col-sm-6">
                        <div className="col-sm-4">
                            <label className="control-label">Tên đơn vị vận chuyển</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="text"
                                className="form-control"
                                ref='provider_display_name'
                                value={providerInfo.provider_display_name || ''}
                                onChange={() => {this.onChangeInput('provider_display_name')}}
                                disabled={disabled}
                            />
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
                            <label className="control-label">Họ tên</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="text"
                                className="form-control"
                                ref='fullname'
                                value={providerInfo.fullname || ''}
                                onChange={() => {this.onChangeInput('fullname')}}
                                disabled={disabled}
                            />
                        </div>
                    </div>
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
                                    districts.length > 0 && districts.map(d => {
                                        return <option value={d.DISTRICT_ID} key={d.DISTRICT_ID}>
                                                {convert_case(d.DISTRICT_NAME)}
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
                            <label className="control-label">Điện thoại</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="text"
                                className="form-control"
                                ref='phone'
                                value={providerInfo.phone || ''}
                                onChange={() => {this.onChangeInput('phone')}}
                                disabled={disabled}
                            />
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
                                    wards.length > 0 && wards.map(w => {
                                        return <option value={w.WARDS_ID} key={w.WARDS_ID}>
                                                {convert_case(w.WARDS_NAME)}
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
                </div>
            </div>
        )
    }
}

OtherProviderPanel.propTypes = {
    providerInfo: propTypes.object,
    onChangeInput: propTypes.func,
    disabled: propTypes.bool
};

export default OtherProviderPanel;