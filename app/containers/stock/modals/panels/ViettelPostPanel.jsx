import React, { Component } from 'react';
import propTypes from 'prop-types';
import {getProvincesCache, getDistrictsCache, getWardsCache, getViettelServices, getViettelExtraServices} from '../../../../api/ViettelPostApi';

class ViettelPostPanel extends Component {
    state = {
        provinces: [],
        districts: [],
        wards: [],
        services: [],
        extraServices: []
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
        const newValue = this.refs['RECEIVER_PROVINCE'].value;

        if (newValue === '') {
            this.setState({districts: []});
            
            onChangeInput('RECEIVER_PROVINCE', '');
        } else {
            getDistrictsCache(newValue)
                .then(districts => this.setState({districts}));

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
        const {transportOrder} = this.props;
        getProvincesCache()
            .then(provinces => this.setState({provinces}));

        getViettelServices()
            .then(services => this.setState({services}));
        
        getViettelExtraServices()
            .then(extraServices => this.setState({extraServices}));

        if (transportOrder.RECEIVER_PROVINCE) {
            getDistrictsCache(transportOrder.RECEIVER_PROVINCE)
                .then(districts => this.setState({districts}));
        }
        if (transportOrder.RECEIVER_DISTRICT) {
            getWardsCache(transportOrder.RECEIVER_DISTRICT)
                .then(wards => this.setState({wards}));
        }
    }

    render() {
        const {disabled, transportOrder} = this.props;
        const {
            provinces,
            districts,
            wards,
            services,
            extraServices
        } = this.state;

        return (
            <div className='row'>
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
                                        ref='RECEIVER_FULLNAME'
                                        value={transportOrder.RECEIVER_FULLNAME || ''}
                                        onChange={() => {this.onChangeInput('RECEIVER_FULLNAME')}}
                                        disabled={disabled}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="col-sm-4">
                                    <label className="control-label">Điện thoại</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text"
                                        className="form-control"
                                        ref='RECEIVER_PHONE'
                                        value={transportOrder.RECEIVER_PHONE || ''}
                                        onChange={() => {this.onChangeInput('RECEIVER_PHONE')}}
                                        disabled={disabled}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-6">
                                <div className="col-sm-4">
                                    <label className="control-label">Email</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text"
                                        className="form-control"
                                        ref='RECEIVER_EMAIL'
                                        value={transportOrder.RECEIVER_EMAIL || ''}
                                        onChange={() => {this.onChangeInput('RECEIVER_EMAIL')}}
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
                                        ref='RECEIVER_PROVINCE'
                                        value={transportOrder.RECEIVER_PROVINCE || ''}
                                        onChange={() => {this.onChangeProvince()}}
                                        disabled={disabled}
                                    >
                                        <option value=""></option>
                                        {
                                            provinces.length > 0 && provinces.map(p => {
                                                return <option value={p.PROVINCE_ID} key={p.PROVINCE_ID}>{p.PROVINCE_NAME}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-6">
                                <div className="col-sm-4">
                                    <label className="control-label">Quận/Huyện</label>
                                </div>
                                <div className="col-sm-8">
                                    <select className="form-control"
                                        ref='RECEIVER_DISTRICT'
                                        value={transportOrder.RECEIVER_DISTRICT || ''}
                                        onChange={() => {this.onChangeDistrict()}}
                                        disabled={disabled}
                                    >
                                        <option value=""></option>
                                        {
                                            districts.length > 0 && districts.map(d => {
                                                return <option value={d.DISTRICT_ID} key={d.DISTRICT_ID}>{d.DISTRICT_NAME}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="col-sm-4">
                                    <label className="control-label">Phường/Xã</label>
                                </div>
                                <div className="col-sm-8">
                                    <select className="form-control"
                                        ref='RECEIVER_WARD'
                                        value={transportOrder.RECEIVER_WARD || ''}
                                        onChange={() => {this.onChangeInput('RECEIVER_WARD')}}
                                        disabled={disabled}
                                    >
                                        <option value=""></option>
                                        {
                                            wards.length > 0 && wards.map(w => {
                                                return <option value={w.WARDS_ID} key={w.WARDS_ID}>{w.WARDS_NAME}</option>
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
                                        ref='RECEIVER_ADDRESS'
                                        value={transportOrder.RECEIVER_ADDRESS || ''}
                                        onChange={() => {this.onChangeInput('RECEIVER_ADDRESS')}}
                                        disabled={disabled}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="col-sm-4">
                                    <label className="control-label">Ngày giao hàng</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="datetime-local"
                                        className="form-control"
                                        ref='DELIVERY_DATE'
                                        value={transportOrder.DELIVERY_DATE || ''}
                                        onChange={() => {this.onChangeInput('DELIVERY_DATE')}}
                                        disabled={disabled}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="panel panel-success">
                    <div className="panel-heading">
                        Thông tin sản phẩm
                    </div>
                    <div className="panel-body">
                        <div className="row form-group">
                            <div className="col-md-6">
                                <div className="col-sm-4">
                                    <label className="control-label">Tên sản phẩm</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text"
                                        className="form-control"
                                        ref='PRODUCT_NAME'
                                        value={transportOrder.PRODUCT_NAME || ''}
                                        onChange={() => {this.onChangeInput('PRODUCT_NAME')}}
                                        disabled={disabled}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="col-sm-4">
                                    <label className="control-label">Miêu tả sản phẩm</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text"
                                        className="form-control"
                                        ref='PRODUCT_DESCRIPTION'
                                        value={transportOrder.PRODUCT_DESCRIPTION || ''}
                                        onChange={() => {this.onChangeInput('PRODUCT_DESCRIPTION')}}
                                        disabled={disabled}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-6">
                                <div className="col-sm-4">
                                    <label className="control-label">Số lượng</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="number"
                                        className="form-control"
                                        ref='PRODUCT_QUANTITY'
                                        value={transportOrder.PRODUCT_QUANTITY || ''}
                                        onChange={() => {this.onChangeInput('PRODUCT_QUANTITY')}}
                                        disabled={disabled}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="col-sm-4">
                                    <label className="control-label">Giá</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="number"
                                        className="form-control"
                                        ref='PRODUCT_PRICE'
                                        value={transportOrder.PRODUCT_PRICE || ''}
                                        onChange={() => {this.onChangeInput('PRODUCT_PRICE')}}
                                        disabled={disabled}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-6">
                                <div className="col-sm-4">
                                    <label className="control-label">Khối lượng</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="number"
                                        className="form-control"
                                        ref='PRODUCT_WEIGHT'
                                        value={transportOrder.PRODUCT_WEIGHT || ''}
                                        onChange={() => {this.onChangeInput('PRODUCT_WEIGHT')}}
                                        disabled={disabled}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="col-sm-4">
                                    <label className="control-label">Chiều dài</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="number"
                                        className="form-control"
                                        ref='PRODUCT_LENGTH'
                                        value={transportOrder.PRODUCT_LENGTH || ''}
                                        onChange={() => {this.onChangeInput('PRODUCT_LENGTH')}}
                                        disabled={disabled}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-6">
                                <div className="col-sm-4">
                                    <label className="control-label">Chiều rộng</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="number"
                                        className="form-control"
                                        ref='PRODUCT_WIDTH'
                                        value={transportOrder.PRODUCT_WIDTH || ''}
                                        onChange={() => {this.onChangeInput('PRODUCT_WIDTH')}}
                                        disabled={disabled}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="col-sm-4">
                                    <label className="control-label">Chiều cao</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="number"
                                        className="form-control"
                                        ref='PRODUCT_HEIGHT'
                                        value={transportOrder.PRODUCT_HEIGHT || ''}
                                        onChange={() => {this.onChangeInput('PRODUCT_HEIGHT')}}
                                        disabled={disabled}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-md-6">
                        <div className="col-sm-4">
                            <label className="control-label">Loại vận đơn</label>
                        </div>
                        <div className="col-sm-8">
                            <select className="form-control"
                                    disabled={disabled}
                                    ref='ORDER_PAYMENT'
                                    value={transportOrder.ORDER_PAYMENT || ''}
                                    onChange={() => {this.onChangeInput('ORDER_PAYMENT')}}
                            >
                                <option value=""></option>
                                <option value="1">Không thu tiền</option>
                                <option value="2">Thu hộ tiền cước và tiền hàng</option>
                                <option value="3">Thu hộ tiền hàng</option>
                                <option value="4">Thu hộ tiền cước</option>
                            </select>
                        </div>
                    </div>   

                    <div className="col-md-6">
                        <div className="col-sm-4">
                            <label className="control-label">Dịch vụ</label>
                        </div>
                        <div className="col-sm-8">
                            <select className="form-control"
                                    disabled={disabled}
                                    ref='ORDER_SERVICE'
                                    value={transportOrder.ORDER_SERVICE || ''}
                                    onChange={() => {this.onChangeInput('ORDER_SERVICE')}}
                            >
                                <option value=""></option>
                                {
                                    services.length > 0 && services.map(s => {
                                        return <option value={s.SERVICE_CODE} key={s.SERVICE_CODE}>{s.SERVICE_NAME}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-group row"> 
                    <div className="col-md-6">
                        <div className="col-sm-4">
                            <label className="control-label">Dịch vụ cộng thêm</label>
                        </div>
                        <div className="col-sm-8">
                            <select className="form-control"
                                    disabled={disabled}
                                    ref='ORDER_SERVICE_ADD'
                                    value={transportOrder.ORDER_SERVICE_ADD || ''}
                                    onChange={() => {this.onChangeInput('ORDER_SERVICE_ADD')}}
                            >
                                <option value=""></option>
                                {
                                    extraServices.length > 0 && extraServices.map(s => {
                                        return <option value={s.SERVICE_CODE} key={s.SERVICE_CODE}>{s.SERVICE_NAME}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="col-sm-4">
                            <label className="control-label">Ghi chú</label>
                        </div>
                        <div className="col-sm-8">
                            <input type='text'
                                    className="form-control"
                                    disabled={disabled}
                                    ref='ORDER_NOTE'
                                    value={transportOrder.ORDER_NOTE || ''}
                                    onChange={() => {this.onChangeInput('ORDER_NOTE')}}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-md-6">
                        <div className="col-sm-4">
                            <label className="control-label">Tiền thu hộ</label>
                        </div>
                        <div className="col-sm-8">
                            <input type='number'
                                    className="form-control"
                                    disabled={disabled}
                                    ref='MONEY_COLLECTION'
                                    value={transportOrder.MONEY_COLLECTION || ''}
                                    onChange={() => {this.onChangeInput('MONEY_COLLECTION')}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ViettelPostPanel.propTypes = {
    transportOrder: propTypes.object,
    onChangeInput: propTypes.func,
    disabled: propTypes.bool
};

export default ViettelPostPanel;
