import React, {Component} from 'react';
import propTypes from 'prop-types';
import * as ghtkApi from '../../../../api/GiaoHangTietKiemApi';
import {toDatetimeLocal} from 'utils/datetime-utils';
import {convert_case} from 'utils/location-string-utils';

class OtherTransportInfoPanel extends Component {
    state = {
        provinces: [],
        districts: [],
        wards: [],
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
        const newValue = this.refs['receiver_province'].value;

        if (newValue === '') {
            this.setState({districts: [], wards: []});

            onChangeInput('receiver_province', '');
        } else {
            ghtkApi.getAllDistricts(newValue)
                .then(districts => this.setState({districts}));

            onChangeInput('receiver_province', newValue);
        }
    }

    onChangeDistrict() {
        const {onChangeInput} = this.props;
        const newValue = this.refs['receiver_district'].value;

        if (newValue === '') {
            this.setState({wards: []});

            onChangeInput('receiver_district', '');
        } else {
            ghtkApi.getAllWards(newValue)
                .then(wards => this.setState({wards}));

            onChangeInput('receiver_district', newValue);
        }
    }

    componentDidMount() {
        const {receiver_province, receiver_district} = this.props;

        ghtkApi.getProvinces()
            .then(provinces => this.setState({provinces}));

        if (receiver_province) {
            ghtkApi.getAllDistricts(receiver_province)
                .then(districts => this.setState({districts}));
        }

        if (receiver_district) {
            ghtkApi.getAllWards(receiver_district)
                .then(wards => this.setState({wards}));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.receiver_province && nextProps.receiver_province !== this.props.receiver_province) {
            ghtkApi.getAllDistricts(nextProps.receiver_province)
                .then(districts => this.setState({districts}));
        }

        if (nextProps.receiver_district && nextProps.receiver_district !== this.props.receiver_district) {
            ghtkApi.getAllWards(nextProps.receiver_district)
                .then(wards => this.setState({wards}));
        }
    }

    render() {
        const {
            disabled,

            receiver_fullname,
            receiver_phone,
            receiver_email,
            receiver_province,
            receiver_district,
            receiver_ward,
            receiver_address
        } = this.props;

        const {
            provinces,
            districts,
            wards
        } = this.state;
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    Thông tin giao hàng
                </div>
                <div className="panel-body">

                    <div className="row">

                        <div className="col-sm-6">
                            <div className="col-sm-12 form-group">
                                <div className="col-sm-5">
                                    <label className="control-label required-field">Tên khách hàng</label>
                                </div>
                                <div className="col-sm-7">
                                    <input type="text"
                                           className="form-control"
                                           ref='receiver_fullname'
                                           value={receiver_fullname || ''}
                                           onChange={() => {this.onChangeInput('receiver_fullname')}}
                                           disabled={disabled}
                                    />
                                </div>
                            </div>

                            <div className="col-sm-12 form-group">
                                <div className="col-sm-5">
                                    <label className="control-label required-field">Điện thoại</label>
                                </div>
                                <div className="col-sm-7">
                                    <input type="number"
                                           className="form-control"
                                           ref='receiver_phone'
                                           value={receiver_phone || ''}
                                           onChange={() => {this.onChangeInput('receiver_phone')}}
                                           disabled={disabled}
                                    />
                                </div>
                            </div>

                            <div className="col-sm-12 form-group">
                                <div className="col-sm-5">
                                    <label className="control-label">Email</label>
                                </div>
                                <div className="col-sm-7">
                                    <input type="text"
                                           className="form-control"
                                           ref='receiver_email'
                                           value={receiver_email || ''}
                                           onChange={() => {this.onChangeInput('receiver_email')}}
                                           disabled={disabled}
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="col-sm-6">
                            <div className="col-sm-12 form-group">
                                <div className="col-sm-5">
                                    <label className="control-label required-field">Tỉnh/Thành phố</label>
                                </div>
                                <div className="col-sm-7">
                                    <select className="form-control"
                                            ref='receiver_province'
                                            value={receiver_province || ''}
                                            onChange={() => {this.onChangeProvince()}}
                                            disabled={disabled}
                                    >
                                        <option value=""/>
                                        {
                                            provinces.length > 0 && provinces.map(p => {
                                                return <option value={p.PROVINCE_NAME} key={p.PROVINCE_NAME}>{p.PROVINCE_NAME}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="col-sm-12 form-group">
                                <div className="col-sm-5">
                                    <label className="control-label required-field">Quận/Huyện</label>
                                </div>
                                <div className="col-sm-7">
                                    <select className="form-control"
                                            ref='receiver_district'
                                            value={receiver_district || ''}
                                            onChange={() => {this.onChangeDistrict()}}
                                            disabled={disabled}
                                    >
                                        <option value=""/>
                                        {
                                            districts.length > 0 && districts.map(d => {
                                                return <option value={d.DISTRICT_NAME} key={d.DISTRICT_NAME}>{convert_case(d.DISTRICT_NAME)}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="col-sm-12 form-group">
                                <div className="col-sm-5">
                                    <label className="control-label required-field">Phường/Xã</label>
                                </div>
                                <div className="col-sm-7">
                                    <select className="form-control"
                                            ref='receiver_ward'
                                            value={receiver_ward || ''}
                                            onChange={() => {this.onChangeInput('receiver_ward')}}
                                            disabled={disabled}
                                    >
                                        <option value=""/>
                                        {
                                            wards.length > 0 && wards.map(d => {
                                                return <option value={d.WARDS_NAME} key={d.WARDS_NAME}>{convert_case(d.WARDS_NAME)}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="col-sm-12 form-group">
                                <div className="col-sm-5">
                                    <label className="control-label required-field">Địa chỉ chi tiết</label>
                                </div>
                                <div className="col-sm-7">
                                    <input type="text"
                                           className="form-control"
                                           ref='receiver_address'
                                           value={receiver_address || ''}
                                           onChange={() => {this.onChangeInput('receiver_address')}}
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

OtherTransportInfoPanel.propTypes = {
    onChangeInput: propTypes.func,
    disabled: propTypes.bool,

    receiver_fullname: propTypes.string,
    receiver_phone: propTypes.string,
    receiver_email: propTypes.string,
    receiver_province: propTypes.string,
    receiver_district: propTypes.string,
    receiver_ward: propTypes.string,
    receiver_address: propTypes.string,
};

export default OtherTransportInfoPanel;