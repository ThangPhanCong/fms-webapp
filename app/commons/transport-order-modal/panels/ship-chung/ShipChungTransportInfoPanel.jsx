import React, {Component} from 'react';
import propTypes from 'prop-types';
import * as scApi from '../../../../api/ShipChungApi';
import {toDatetimeLocal} from 'utils/datetime-utils';
import {convert_case} from 'utils/location-string-utils';

class ShipChungTransportInfoPanel extends Component {
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
        const newValue = this.refs['To_City'].value;

        if (newValue === '') {
            this.setState({districts: [], wards: []});
            
            onChangeInput('To_City', '');
        } else {
            scApi.getDistricts(newValue)
                .then(districts => this.setState({districts, wards: []}));

            onChangeInput('To_City', newValue);
        }
    }

    onChangeDistrict() {
        const {onChangeInput} = this.props;
        const newValue = this.refs['To_Province'].value;

        if (newValue === '') {
            this.setState({wards: []});
            
            onChangeInput('To_Province', '');
        } else {
            scApi.getWards(newValue)
                .then(wards => this.setState({wards}));

            onChangeInput('To_Province', newValue);
        }
    }

    componentDidMount() {
        const {To_City, To_Province} = this.props;

        scApi.getProvinces()
            .then(provinces => this.setState({provinces}));

        if (To_City) {
            scApi.getDistricts(To_City)
                .then(districts => this.setState({districts}));
        }
        if (To_Province) {
            scApi.getWards(To_Province)
                .then(wards => this.setState({wards}));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.To_City && nextProps.To_City !== this.props.To_City) {
            scApi.getDistricts(nextProps.To_City)
                .then(districts => this.setState({districts}));
        }
        if (nextProps.To_Province && nextProps.To_Province !== this.props.To_Province) {
            scApi.getWards(nextProps.To_Province)
                .then(wards => this.setState({wards}));
        }
    }

    render() {
        const {
            disabled,

            To_Name,
            To_Phone,

            To_City,
            To_Province,
            To_Ward,
            To_Address,
        } = this.props;

        const {
            provinces,
            districts,
            wards
        } = this.state;

         /**
          To_Name={transportOrder.To_Name}
          To_Phone={transportOrder.To_Phone}

          To_City={transportOrder.To_City}
          To_Province={transportOrder.To_Province}
          To_Ward={transportOrder.To_Ward}
          To_Address={transportOrder.To_Address}
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
                                           ref='To_Name'
                                           value={To_Name || ''}
                                           onChange={() => {this.onChangeInput('To_Name')}}
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
                                           ref='To_Phone'
                                           value={To_Phone || ''}
                                           onChange={() => {this.onChangeInput('To_Phone')}}
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
                                            ref='To_City'
                                            value={To_City || ''}
                                            onChange={() => {this.onChangeProvince()}}
                                            disabled={disabled}
                                    >
                                        <option value=""/>
                                        {
                                            provinces.length > 0 && provinces.map(p => {
                                                return <option value={p.CityId} key={p.CityId}>{p.CityName}</option>
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
                                            ref='To_Province'
                                            value={To_Province || ''}
                                            onChange={() => {this.onChangeDistrict()}}
                                            disabled={disabled}
                                    >
                                        <option value=""/>
                                        {
                                            districts.length > 0 && districts.map(d => {
                                                return <option value={d.ProvinceId} key={d.ProvinceId}>{d.ProvinceName}</option>
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
                                            ref='To_Ward'
                                            value={To_Ward || ''}
                                            onChange={() => {this.onChangeInput('To_Ward')}}
                                            disabled={disabled}
                                    >
                                        <option value=""/>
                                        {
                                            wards.length > 0 && wards.map(w => {
                                                return <option value={w.WardId} key={w.WardId}>{convert_case(w.WardName)}</option>
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
                                           ref='To_Address'
                                           value={To_Address || ''}
                                           onChange={() => {this.onChangeInput('To_Address')}}
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

ShipChungTransportInfoPanel.propTypes = {
    onChangeInput: propTypes.func,
    disabled: propTypes.bool,

};

export default ShipChungTransportInfoPanel;