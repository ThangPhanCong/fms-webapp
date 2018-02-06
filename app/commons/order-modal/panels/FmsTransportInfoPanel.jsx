import React, {Component} from 'react';
import propTypes from 'prop-types';
import {locations} from '../../../constants/location';

class FmsTransportInfoPanel extends Component {

    state = {
        districts: []
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

        if (this.refs['province'].value === '') {
            this.setState({districts: []});
            
            onChangeInput('province', '');
        } else {
            let province = locations.find((item) => {
                return item.name === this.refs['province'].value;
            });
            let districts = Object.values(province.districts);
            this.setState({districts: districts});
    
            onChangeInput('province', province.name);
        }
    }

    render() {
        const {
            transport_address,
            transport_method,
            transport_fee,
            province,
            district,
            disabled
        } = this.props;

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
                                        locations.map(item => {
                                            return <option value={item.name} key={item.name}>{item.name}</option>
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
                                           this.onChangeInput('district')
                                       }}
                                       disabled={disabled}
                                >
                                    <option value=""></option>
                                    {
                                        this.state.districts.map(item => {
                                            return <option value={item} key={item}>{item}</option>   
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
                                       ref='transport_address'
                                       value={transport_address || ''}
                                       onChange={() => {
                                           this.onChangeInput('transport_address')
                                       }}
                                       disabled={disabled}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
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
                                <button className='btn btn-success'>
                                    Thêm   
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
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
                    </div>
                </div>
            </div>
        )
    }
}

FmsTransportInfoPanel.propTypes = {
    onChangeInput: propTypes.func,
    transport_address: propTypes.string,
    transport_method: propTypes.string,
    transport_fee: propTypes.string,
    disabled: propTypes.bool
};

export default FmsTransportInfoPanel;