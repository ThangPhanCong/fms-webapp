import React, {Component} from 'react';
import propTypes from 'prop-types';
import * as ghtkApi from '../../../../api/GiaoHangTietKiemApi';
import {convert_case} from 'utils/location-string-utils';

class OtherProviderPanel extends Component {
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
        const newValue = this.refs['province'].value;

        if (newValue === '') {
            this.setState({districts: [], wards: []});

            onChangeInput('province', '');
        } else {
            ghtkApi.getAllDistricts(newValue)
                .then(res => this.setState({districts: res, wards: []}));
            onChangeInput('province', newValue);
        }
    }

    onChangeDistrict() {
        const {onChangeInput} = this.props;
        const newValue = this.refs['district'].value;

        if (newValue === '') {
            this.setState({wards: []});

            onChangeInput('district', '');
        } else {
            ghtkApi.getAllWards(newValue)
                .then(res => this.setState({wards: res}));
            onChangeInput('district', newValue);
        }
    }

    componentDidMount() {
        const {province, district} = this.props.providerInfo;

        ghtkApi.getProvinces()
            .then(provinces => this.setState({provinces}));

        if (province !== '' && province !== undefined) {
            ghtkApi.getAllDistricts(province)
                .then(res => this.setState({districts: res}));
        }
        if (district !== '' && district !== undefined) {
            ghtkApi.getAllWards(district)
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
                <p style={{marginBottom: 30}}>Nhà vận chuyển khác là nhà vận chuyển chưa được Adsbold hỗ trợ. Khi tạo
                    vận đơn của nhà vận chuyển này, bạn phải tự cập nhật trạng thái của vận đơn.</p>

                <div className="panel panel-primary">
                    <div className="panel-heading">Thông tin tài khoản</div>
                    <div className="panel-body">
                        <div className="row">

                            <div className="form-group col-sm-6">
                                <div className="col-sm-4">
                                    <label className="control-label">Tên nhà vận chuyển</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text"
                                           className="form-control"
                                           ref='provider_display_name'
                                           value={providerInfo.provider_display_name || ''}
                                           onChange={() => {
                                               this.onChangeInput('provider_display_name')
                                           }}
                                           disabled={disabled}
                                    />
                                </div>
                            </div>

                            <div className="form-group col-sm-6">
                                <div className="col-sm-4">
                                    <label className="control-label">Giới thiệu nhà vận chuyển</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text"
                                           className="form-control"
                                           ref='introduction'
                                           value={providerInfo.introduction || ''}
                                           onChange={() => {
                                               this.onChangeInput('introduction')
                                           }}
                                           disabled={disabled}
                                    />
                                </div>
                            </div>

                            <div className="form-group col-sm-6">
                                <div className="col-sm-4">
                                    <label className="control-label">Tên người đại diện</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text"
                                           className="form-control"
                                           ref='fullname'
                                           value={providerInfo.fullname || ''}
                                           onChange={() => {
                                               this.onChangeInput('fullname')
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
                                    <input type="text"
                                           className="form-control"
                                           ref='phone'
                                           value={providerInfo.phone || ''}
                                           onChange={() => {
                                               this.onChangeInput('phone')
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
                                            ref='province'
                                            value={providerInfo.province || ''}
                                            onChange={() => {
                                                this.onChangeProvince()
                                            }}
                                            disabled={disabled}
                                    >
                                        <option value=""/>
                                        {
                                            provinces.length > 0 && provinces.map(p => (
                                                <option value={p.PROVINCE_NAME} key={p.PROVINCE_ID}>
                                                    {p.PROVINCE_NAME}
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
                                            ref='district'
                                            value={providerInfo.district || ''}
                                            onChange={() => {
                                                this.onChangeDistrict()
                                            }}
                                            disabled={disabled}
                                    >
                                        <option value=""/>
                                        {
                                            districts.length > 0 && districts.map(p => (
                                                <option value={p.DISTRICT_NAME} key={p.DISTRICT_ID}>
                                                    {convert_case(p.DISTRICT_NAME)}
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
                                            ref='ward'
                                            value={providerInfo.ward || ''}
                                            onChange={() => {
                                                this.onChangeInput('ward')
                                            }}
                                            disabled={disabled}
                                    >
                                        <option value=""/>
                                        {
                                            wards.length > 0 && wards.map(p => (
                                                <option value={p.WARDS_NAME} key={p.WARDS_ID}>
                                                    {convert_case(p.WARDS_NAME)}
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
                                           ref='address'
                                           value={providerInfo.address || ''}
                                           onChange={() => {
                                               this.onChangeInput('address')
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

OtherProviderPanel.propTypes = {
    providerInfo: propTypes.object,
    onChangeInput: propTypes.func,
    disabled: propTypes.bool
};

export default OtherProviderPanel;
