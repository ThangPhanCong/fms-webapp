import React, {Component} from 'react';
import propTypes from 'prop-types';
import * as shipchungApi from '../../../../api/ShipChungApi';
import {convert_case} from 'utils/location-string-utils';

class ShipChungPanel extends Component {
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
        const newValue = this.refs['From.City'].value;

        if (newValue === '') {
            this.setState({districts: [], wards: []});

            onChangeInput('From.City', '');
        } else {
            shipchungApi.getDistricts(newValue)
                .then(res => this.setState({districts: res, wards: []}));
            onChangeInput('From.City', newValue);
        }
    }

    onChangeDistrict() {
        const {onChangeInput} = this.props;
        const newValue = this.refs['From.Province'].value;

        if (newValue === '') {
            this.setState({wards: []});

            onChangeInput('From.Province', '');
        } else {
            shipchungApi.getWards(newValue)
                .then(res => this.setState({wards: res}));

            onChangeInput('From.Province', newValue);
        }
    }

    componentDidMount() {
        const province = this.props.providerInfo['From.City'];
        const district = this.props.providerInfo['From.Province'];

        shipchungApi.getProvinces()
            .then(provinces => this.setState({provinces}));

        if (province !== '' && province !== undefined) {
            shipchungApi.getDistricts(province)
                .then(res => this.setState({districts: res}));
        }
        if (district !== '' && district !== undefined) {
            shipchungApi.getWards(district)
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

        /**
         check('ApiKey').exists(),

         check('From.Name').exists(),
         check('From.Phone').exists(),

         check('From.City').exists(),
         check('From.Province').exists(),
         check('From.Ward').exists(),
         check('From.Address').exists(),
         */

        return (
            <div>
                <p style={{marginBottom: 30}}>Để cấu hình nhà vận chuyển Ship Chung, bạn phải là khách hàng của
                    Ship Chung, và yêu cầu Ship Chung cung cấp những thông tin sau.</p>

                <div className="panel panel-primary">
                    <div className="panel-heading">Thông tin tài khoản</div>
                    <div className="panel-body">

                        <div className="row">
                            <div className="form-group col-sm-6">
                                <div className="col-sm-4">
                                    <label className="control-label">API key</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text"
                                           className="form-control"
                                           ref='ApiKey'
                                           value={providerInfo['ApiKey'] || ''}
                                           onChange={() => {
                                               this.onChangeInput('ApiKey')
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
                                           ref='From.Name'
                                           value={providerInfo['From.Name'] || ''}
                                           onChange={() => {
                                               this.onChangeInput('From.Name')
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
                                           ref='From.Phone'
                                           value={providerInfo['From.Phone'] || ''}
                                           onChange={() => {
                                               this.onChangeInput('From.Phone')
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
                                            ref='From.City'
                                            value={providerInfo['From.City'] || ''}
                                            onChange={() => {
                                                this.onChangeProvince()
                                            }}
                                            disabled={disabled}
                                    >
                                        <option value=""/>
                                        {
                                            provinces.length > 0 && provinces.map(p => (
                                                <option value={p.CityId} key={p.CiyId}>
                                                    {p.CityName}
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
                                            ref='From.Province'
                                            value={providerInfo['From.Province'] || ''}
                                            onChange={() => {
                                                this.onChangeDistrict()
                                            }}
                                            disabled={disabled}
                                    >
                                        <option value=""/>
                                        {
                                            districts.length > 0 && districts.map(p => (
                                                <option value={p.ProvinceId} key={p.ProvinceId}>
                                                    {p.ProvinceName}
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
                                            ref='From.Ward'
                                            value={providerInfo['From.Ward'] || ''}
                                            onChange={() => {
                                                this.onChangeInput('From.Ward')
                                            }}
                                            disabled={disabled}
                                    >
                                        <option value=""/>
                                        {
                                            wards.length > 0 && wards.map(p => (
                                                <option value={p.WardId} key={p.WardId}>
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
                                           ref='From.Address'
                                           value={providerInfo['From.Address'] || ''}
                                           onChange={() => {
                                               this.onChangeInput('From.Address')
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

ShipChungPanel.propTypes = {
    providerInfo: propTypes.object,
    onChangeInput: propTypes.func,
    disabled: propTypes.bool
};

export default ShipChungPanel;