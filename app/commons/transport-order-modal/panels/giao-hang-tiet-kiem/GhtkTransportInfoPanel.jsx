import React, {Component} from 'react';
import propTypes from 'prop-types';
import * as ghtkApi from '../../../../api/GiaoHangTietKiemApi';
import {toDatetimeLocal} from 'utils/datetime-utils';
import {convert_case} from 'utils/location-string-utils';

class GhtkTransportInfoPanel extends Component {
    state = {
        provinces: [],
        districts: []
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
            ghtkApi.getDistricts(newValue)
                .then(districts => this.setState({districts}));

            onChangeInput('province', newValue);
        }
    }

    onChangeDistrict() {
        const {onChangeInput} = this.props;
        const newValue = this.refs['district'].value;

        onChangeInput('district', newValue);
    }

    async componentDidMount() {
        const {province} = this.props;

        await ghtkApi.getProvinces()
            .then(provinces => this.setState({provinces}));

        if (province) {
            await ghtkApi.getAllDistricts(province)
                .then(districts => this.setState({districts}));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.province && nextProps.province !== this.props.province) {
            ghtkApi.getAllDistricts(nextProps.province)
                .then(districts => this.setState({districts}));
        }
    }

    render() {
        const {
            disabled,
            name,
            tel,
            province,
            district,
            address
        } = this.props;

        const {
            provinces,
            districts,
        } = this.state;
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    Thông tin giao hàng
                </div>
                <div className="panel-body">
                    <div className="row form-group">
                        <div className="col-md-6">
                            <div className="col-sm-4">
                                <label className="control-label">Tên khách hàng</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="text"
                                       className="form-control"
                                       ref='name'
                                       value={name || ''}
                                       onChange={() => {this.onChangeInput('name')}}
                                       disabled={disabled}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="col-sm-4">
                                <label className="control-label">Tỉnh/Thành phố</label>
                            </div>
                            <div className="col-sm-8">
                                <select className="form-control"
                                        ref='province'
                                        value={province || ''}
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

                    </div>

                    <div className="row form-group">
                        <div className="col-md-6">
                            <div className="col-sm-4">
                                <label className="control-label">Điện thoại</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="text"
                                       className="form-control"
                                       ref='tel'
                                       value={tel || ''}
                                       onChange={() => {this.onChangeInput('tel')}}
                                       disabled={disabled}
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="col-sm-4">
                                <label className="control-label">Quận/Huyện</label>
                            </div>
                            <div className="col-sm-8">
                                <select className="form-control"
                                        ref='district'
                                        value={district || ''}
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
                    </div>

                    <div className="row form-group">
                        <div className="col-md-6">
                            <div className="col-sm-4">
                                <label className="control-label">Địa chỉ</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="text"
                                       className="form-control"
                                       ref='address'
                                       value={address || ''}
                                       onChange={() => {this.onChangeInput('address')}}
                                       disabled={disabled}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

GhtkTransportInfoPanel.propTypes = {
    onChangeInput: propTypes.func,
    disabled: propTypes.bool,

    name: propTypes.string,
    tel: propTypes.string,
    province: propTypes.string,
    district: propTypes.string,
    address: propTypes.string,
};

export default GhtkTransportInfoPanel;