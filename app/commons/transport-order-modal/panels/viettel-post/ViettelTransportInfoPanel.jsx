import React, {Component} from 'react';
import propTypes from 'prop-types';
import {getProvincesCache, getDistrictsCache, getWardsCache} from '../../../../api/ViettelPostApi';
import {toDatetimeLocal} from 'utils/datetime-utils';
import {convert_case} from 'utils/location-string-utils';

class ViettelTransportInfoPanel extends Component {
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
        const newValue = this.refs['RECEIVER_PROVINCE'].value;

        if (newValue === '') {
            this.setState({districts: [], wards: []});
            
            onChangeInput('RECEIVER_PROVINCE', '');
        } else {
            getDistrictsCache(newValue)
                .then(districts => this.setState({districts, wards: []}));

            onChangeInput('RECEIVER_PROVINCE', newValue);
        }
    }

    onChangeDistrict() {
        const {onChangeInput} = this.props;
        const newValue = this.refs['RECEIVER_DISTRICT'].value;

        if (newValue === '') {
            this.setState({wards: []});
            
            onChangeInput('RECEIVER_DISTRICT', '');
        } else {
            getWardsCache(newValue)
                .then(wards => this.setState({wards}));

            onChangeInput('RECEIVER_DISTRICT', newValue);
        }
    }

    componentDidMount() {
        const {RECEIVER_PROVINCE, RECEIVER_DISTRICT} = this.props;

        getProvincesCache()
            .then(provinces => this.setState({provinces}));

        if (RECEIVER_PROVINCE) {
            getDistrictsCache(RECEIVER_PROVINCE)
                .then(districts => this.setState({districts}));
        }
        if (RECEIVER_DISTRICT) {
            getWardsCache(RECEIVER_DISTRICT)
                .then(wards => this.setState({wards}));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.RECEIVER_PROVINCE && nextProps.RECEIVER_PROVINCE !== this.props.RECEIVER_PROVINCE) {
            getDistrictsCache(nextProps.RECEIVER_PROVINCE)
                .then(districts => this.setState({districts}));
        }
        if (nextProps.RECEIVER_DISTRICT && nextProps.RECEIVER_DISTRICT !== this.props.RECEIVER_DISTRICT) {
            getWardsCache(nextProps.RECEIVER_DISTRICT)
                .then(wards => this.setState({wards}));
        }
    }

    render() {
        const {
            disabled,

            RECEIVER_FULLNAME,
            RECEIVER_PHONE,
            RECEIVER_EMAIL,
            RECEIVER_PROVINCE,
            RECEIVER_DISTRICT,
            RECEIVER_WARD,
            RECEIVER_ADDRESS
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
                            <div className="col-md-12 form-group">
                                <div className="col-sm-5">
                                    <label className="control-label required-field">Tên khách hàng</label>
                                </div>
                                <div className="col-sm-7">
                                    <input type="text"
                                           className="form-control"
                                           ref='RECEIVER_FULLNAME'
                                           value={RECEIVER_FULLNAME || ''}
                                           onChange={() => {this.onChangeInput('RECEIVER_FULLNAME')}}
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
                                           ref='RECEIVER_PHONE'
                                           value={RECEIVER_PHONE || ''}
                                           onChange={() => {this.onChangeInput('RECEIVER_PHONE')}}
                                           disabled={disabled}
                                    />
                                </div>
                            </div>

                            <div className="col-md-12 form-group">
                                <div className="col-sm-5">
                                    <label className="control-label">Email</label>
                                </div>
                                <div className="col-sm-7">
                                    <input type="text"
                                           className="form-control"
                                           ref='RECEIVER_EMAIL'
                                           value={RECEIVER_EMAIL || ''}
                                           onChange={() => {this.onChangeInput('RECEIVER_EMAIL')}}
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
                                            ref='RECEIVER_PROVINCE'
                                            value={RECEIVER_PROVINCE || ''}
                                            onChange={() => {this.onChangeProvince()}}
                                            disabled={disabled}
                                    >
                                        <option value=""/>
                                        {
                                            provinces.length > 0 && provinces.map(p => {
                                                return <option value={p.PROVINCE_ID} key={p.PROVINCE_ID}>{p.PROVINCE_NAME}</option>
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
                                            ref='RECEIVER_DISTRICT'
                                            value={RECEIVER_DISTRICT || ''}
                                            onChange={() => {this.onChangeDistrict()}}
                                            disabled={disabled}
                                    >
                                        <option value=""/>
                                        {
                                            districts.length > 0 && districts.map(d => {
                                                return <option value={d.DISTRICT_ID} key={d.DISTRICT_ID}>{convert_case(d.DISTRICT_NAME)}</option>
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
                                            ref='RECEIVER_WARD'
                                            value={RECEIVER_WARD || ''}
                                            onChange={() => {this.onChangeInput('RECEIVER_WARD')}}
                                            disabled={disabled}
                                    >
                                        <option value=""/>
                                        {
                                            wards.length > 0 && wards.map(w => {
                                                return <option value={w.WARDS_ID} key={w.WARDS_ID}>{convert_case(w.WARDS_NAME)}</option>
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
                                           ref='RECEIVER_ADDRESS'
                                           value={RECEIVER_ADDRESS || ''}
                                           onChange={() => {this.onChangeInput('RECEIVER_ADDRESS')}}
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

ViettelTransportInfoPanel.propTypes = {
    onChangeInput: propTypes.func,
    disabled: propTypes.bool,

    RECEIVER_FULLNAME: propTypes.string,
    RECEIVER_PHONE: propTypes.string,
    RECEIVER_EMAIL: propTypes.string,
    RECEIVER_PROVINCE: propTypes.string,
    RECEIVER_DISTRICT: propTypes.string,
    RECEIVER_WARD: propTypes.string,
    RECEIVER_ADDRESS: propTypes.string,
    DELIVERY_DATE: propTypes.string
};

export default ViettelTransportInfoPanel;