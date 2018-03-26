import React, {Component} from 'react';
import propTypes from 'prop-types';
import * as ghnApi from '../../../../api/GiaoHangNhanhApi';
import {toDatetimeLocal} from 'utils/datetime-utils';
import {convert_case} from 'utils/location-string-utils';

class GiaoHangNhanhTransportInfoPanel extends Component {
    state = {
        provinces: [],
        districts: [],
        wards: []
    };

    onChangeInput(refName) {
        const newValue = this.refs[refName].value;

        this.props.onChangeInput(refName, newValue);
    }

    onChangeProvince() {
        const {onChangeInput} = this.props;
        const newValue = this.refs['ToProvinceID'].value;

        if (newValue === '') {
            this.setState({districts: [], wards: []});
            
            onChangeInput('ToProvinceID', '');
        } else {
            ghnApi.getDistricts(newValue)
                .then(districts => this.setState({districts, wards: []}));

            onChangeInput('ToProvinceID', newValue);
        }
    }

    onChangeDistrict() {
        const {onChangeInput} = this.props;
        const newValue = this.refs['ToDistrictID'].value;

        if (newValue === '') {
            this.setState({wards: []});
            
            onChangeInput('ToDistrictID', '');
        } else {
            ghnApi.getWards(newValue)
                .then(res => this.setState({wards: res.Wards}));

            onChangeInput('ToDistrictID', newValue);
        }
    }

    componentDidMount() {
        const {ToProvinceID, ToDistrictID} = this.props;

        ghnApi.getProvinces()
            .then(provinces => this.setState({provinces}));

        if (ToProvinceID) {
            ghnApi.getDistricts(ToProvinceID)
                .then(districts => this.setState({districts}));
        }
        if (ToDistrictID) {
            ghnApi.getWards(ToDistrictID)
                .then(res => this.setState({wards: res.Wards}));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.ToProvinceID && nextProps.ToProvinceID !== this.props.ToProvinceID) {
            ghnApi.getDistricts(nextProps.ToProvinceID)
                .then(districts => this.setState({districts}));
        }
        if (nextProps.ToDistrictID && nextProps.ToDistrictID !== this.props.ToDistrictID) {
            ghnApi.getWards(nextProps.ToDistrictID)
                .then(res => this.setState({wards: res.Wards}));
        }
    }

    render() {
        const {
            disabled,

            CustomerName,
            CustomerPhone,

            ToProvinceID,
            ToDistrictID,
            ToWardCode,
            ShippingAddress,
        } = this.props;

        const {
            provinces,
            districts,
            wards
        } = this.state;

         /**
         check('CustomerName').exists(),
         check('CustomerPhone').exists(),

         check('ToProvinceID').exists(),
         check('ToDistrictID').exists(),
         check('ToWardCode').exists(),
         check('ShippingAddress').exists(),
         */

        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    Thông tin giao hàng
                </div>

                <div className="panel-body">
                    <div className="row">

                        <div className="col-sm-6">
                            <div className="col-md-12 form-group">
                                <div className="col-sm-5">
                                    <label className="control-label required-field">Tên khách hàng</label>
                                </div>
                                <div className="col-sm-7">
                                    <input type="text"
                                           className="form-control"
                                           ref='CustomerName'
                                           value={CustomerName || ''}
                                           onChange={() => {this.onChangeInput('CustomerName')}}
                                           disabled={disabled}
                                    />
                                </div>
                            </div>

                            <div className="col-md-12 form-group">
                                <div className="col-sm-5">
                                    <label className="control-label required-field">Điện thoại</label>
                                </div>
                                <div className="col-sm-7">
                                    <input type="text"
                                           className="form-control"
                                           ref='CustomerPhone'
                                           value={CustomerPhone || ''}
                                           onChange={() => {this.onChangeInput('CustomerPhone')}}
                                           disabled={disabled}
                                    />
                                </div>
                            </div>

                        </div>


                        <div className="col-sm-6">

                            <div className="col-md-12 form-group">
                                <div className="col-sm-5">
                                    <label className="control-label required-field">Tỉnh/Thành phố</label>
                                </div>
                                <div className="col-sm-7">
                                    <select className="form-control"
                                            ref='ToProvinceID'
                                            value={ToProvinceID || ''}
                                            onChange={() => {this.onChangeProvince()}}
                                            disabled={disabled}
                                    >
                                        <option value=""/>
                                        {
                                            provinces.length > 0 && provinces.map(p => {
                                                return <option value={p.ProvinceID} key={p.ProvinceID}>{p.ProvinceName}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-12 form-group">
                                <div className="col-sm-5">
                                    <label className="control-label required-field">Quận/Huyện</label>
                                </div>
                                <div className="col-sm-7">
                                    <select className="form-control"
                                            ref='ToDistrictID'
                                            value={ToDistrictID || ''}
                                            onChange={() => {this.onChangeDistrict()}}
                                            disabled={disabled}
                                    >
                                        <option value=""/>
                                        {
                                            districts.length > 0 && districts.map(d => {
                                                return <option value={d.DistrictID} key={d.DistrictID}>{d.DistrictName}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-12 form-group">
                                <div className="col-sm-5">
                                    <label className="control-label required-field">Phường/Xã</label>
                                </div>
                                <div className="col-sm-7">
                                    <select className="form-control"
                                            ref='ToWardCode'
                                            value={ToWardCode || ''}
                                            onChange={() => {this.onChangeInput('ToWardCode')}}
                                            disabled={disabled}
                                    >
                                        <option value=""/>
                                        {
                                            wards.length > 0 && wards.map(w => {
                                                return <option value={w.WardCode} key={w.WardCode}>{convert_case(w.WardName)}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-12 form-group">
                                <div className="col-sm-5">
                                    <label className="control-label required-field">Địa chỉ chi tiết</label>
                                </div>
                                <div className="col-sm-7">
                                    <input type="text"
                                           className="form-control"
                                           ref='ShippingAddress'
                                           value={ShippingAddress || ''}
                                           onChange={() => {this.onChangeInput('ShippingAddress')}}
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

GiaoHangNhanhTransportInfoPanel.propTypes = {
    onChangeInput: propTypes.func,
    disabled: propTypes.bool,

};

export default GiaoHangNhanhTransportInfoPanel;