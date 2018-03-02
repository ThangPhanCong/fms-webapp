import React, {Component} from 'react';
import propTypes from 'prop-types';
import {getProvincesCache, getDistrictsCache, getWardsCache} from '../../../api/ViettelPostApi';

class FmsTransportInfoPanel extends Component {

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
        const {provinces} = this.state;
        const newValue = this.refs['province'].value;
        if (newValue === '') {
            this.setState({districts: []});
            
            onChangeInput('province', '');
        } else {
            provinces.map(p => {
                if (p.PROVINCE_NAME === newValue) {
                    getDistrictsCache(p.PROVINCE_ID)
                        .then(districts => this.setState({districts}))
                }
            })
    
            onChangeInput('province', newValue);
        }
    }

    onChangeDistrict() {
        const {onChangeInput} = this.props;
        const {districts} = this.state;
        const newValue = this.refs['district'].value;
        if (newValue === '') {
            this.setState({wards: []});
            
            onChangeInput('district', '');
        } else {
            districts.map(d => {
                if (d.DISTRICT_NAME === newValue) {
                    getWardsCache(d.DISTRICT_ID) 
                        .then(wards => this.setState({wards}))
                }
            })
    
            onChangeInput('district', newValue);
        }

    }

    componentDidMount() {
        let provinces = [];
        const {province, district, ward} = this.props;

        getProvincesCache()
        .then(provinces => {
            this.setState({provinces});
            province && provinces.map(p => {
                if (p.PROVINCE_NAME === province) {
                    getDistrictsCache(p.PROVINCE_ID)
                    .then(districts => {
                        this.setState({districts});
                        district && districts.map(d => {
                            if (d.DISTRICT_NAME === district) {
                                getWardsCache(d.DISTRICT_ID)
                                .then(wards => {
                                    this.setState({wards});
                                });
                            }
                        })
                    });
                }
            })
        });
        
    }

    render() {
        const {
            full_address,
            transport_method,
            transport_fee,
            province,
            district,
            ward,
            disabled
        } = this.props;

        const {provinces, districts, wards} = this.state;

        return (
            <div className="panel panel-success">
                <div className="panel-heading">
                    Thông tin vận chuyển
                </div>
                <div className="panel-body">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-4">
                                <label className="control-label">Tỉnh/Thành phố</label>
                            </div>
                            <div className="col-sm-8">
                                <select className="form-control"
                                       ref='province'
                                       value={province || ''}
                                       onChange={() => {
                                           this.onChangeProvince()
                                       }}
                                       disabled={disabled}
                                >
                                    <option value=""></option>
                                    {
                                        provinces.length > 0 && provinces.map(p => {
                                            return <option value={p.PROVINCE_NAME} key={p.PROVINCE_ID}>{p.PROVINCE_NAME}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-4">
                                <label className="control-label">Quận/huyện</label>
                            </div>
                            <div className="col-sm-8">
                                <select className="form-control"
                                       ref='district'
                                       value={district || ''}
                                       onChange={() => {
                                           this.onChangeDistrict()
                                       }}
                                       disabled={disabled}
                                >
                                    <option value=""></option>
                                    {
                                        districts.length > 0 && districts.map(d => {
                                            return <option value={d.DISTRICT_NAME} key={d.DISTRICT_ID}>{d.DISTRICT_NAME}</option>   
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-4">
                                <label className="control-label">Phường/xã</label>
                            </div>
                            <div className="col-sm-8">
                                <select className="form-control"
                                       ref='ward'
                                       value={ward || ''}
                                       onChange={() => {
                                           this.onChangeInput('ward')
                                       }}
                                       disabled={disabled}
                                >
                                    <option value=""></option>
                                    {
                                        wards.length > 0 && wards.map(w => {
                                            return <option value={w.WARDS_NAME} key={w.WARDS_ID}>{w.WARDS_NAME}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-4">
                                <label className="control-label">Địa chỉ (số nhà, đường,...)</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="text"
                                       className="form-control"
                                       ref='full_address'
                                       value={full_address || ''}
                                       onChange={() => {
                                           this.onChangeInput('full_address')
                                       }}
                                       disabled={disabled}
                                />
                            </div>
                        </div>
                    </div>

                    {/* <div className="form-group">
                        <div className="row">
                            <div className="col-sm-4">
                                <label className="control-label">Phương thức</label>
                            </div>
                            <div className="col-sm-5">
                                <select className="form-control"
                                        ref='transport_method'
                                        value={transport_method || ''}
                                        onChange={() => {
                                            this.onChangeInput('transport_method')
                                        }}
                                        disabled={disabled}
                                >
                                    <option value="" defaultValue/>
                                    <option value="TONG_BUU_DIEN">Tổng bưu điện</option>
                                    <option value="VIETTEL_POST">Viettel Post</option>
                                    <option value="EMS">EMS</option>
                                    <option value="SHOPEE">Shopee</option>
                                    <option value="SELF">Tự vận chuyển</option>
                                </select>
                            </div>
                            <div className="col-sm-3">
                                <button className='btn btn-success' onClick={this.onOpenModal.bind(this)}>
                                    Thêm
                                </button>
                            </div>
                        </div>
                    </div> */}

                    {/* <div className="form-group">
                        <div className="row">
                            <div className="col-sm-4">
                                <label className="control-label">Phí</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="text"
                                       className="form-control"
                                       ref='transport_fee'
                                       value={transport_fee || ''}
                                       onChange={() => {
                                           this.onChangeInput('transport_fee')
                                       }}
                                       disabled={disabled}
                                />
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        )
    }
}

FmsTransportInfoPanel.propTypes = {
    onChangeInput: propTypes.func,
    province: propTypes.string,
    district: propTypes.string,
    ward: propTypes.string,
    full_address: propTypes.string,
    transport_method: propTypes.string,
    transport_fee: propTypes.string,
    disabled: propTypes.bool
};

export default FmsTransportInfoPanel;