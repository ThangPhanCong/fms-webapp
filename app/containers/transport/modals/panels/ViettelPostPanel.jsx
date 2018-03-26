import React, {Component} from 'react';
import propTypes from 'prop-types';
import {
    getProvincesCache,
    getDistrictsCache,
    getWardsCache,
    getViettelInfoAccount,
    getViettelWebhookLink
} from '../../../../api/ViettelPostApi';
import {convert_case} from 'utils/location-string-utils';

class ViettelPostPanel extends Component {
    state = {
        provinces: [],
        districts: [],
        wards: [],
        webhook_link: ''
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
        const newValue = this.refs['PROVINCE_ID'].value;

        if (newValue === '') {
            this.setState({districts: [], wards: []});

            onChangeInput('PROVINCE_ID', '');
        } else {
            getDistrictsCache(newValue)
                .then(res => this.setState({districts: res, wards: []}));
            onChangeInput('PROVINCE_ID', newValue);
        }
    }

    onChangeDistrict() {
        const {onChangeInput} = this.props;
        const newValue = this.refs['DISTRICT_ID'].value;

        if (newValue === '') {
            this.setState({wards: []});

            onChangeInput('DISTRICT_ID', '');
        } else {
            getWardsCache(newValue)
                .then(res => this.setState({wards: res}));
            onChangeInput('DISTRICT_ID', newValue);
        }
    }

    componentDidMount() {
        const {PROVINCE_ID, DISTRICT_ID} = this.props.providerInfo;

        getViettelWebhookLink()
            .then(({link}) => this.setState({webhook_link: link}));

        getProvincesCache()
            .then(provinces => this.setState({provinces}));

        if (PROVINCE_ID !== '' && PROVINCE_ID !== undefined) {
            getDistrictsCache(PROVINCE_ID)
                .then(res => this.setState({districts: res}));
        }

        if (DISTRICT_ID !== '' && DISTRICT_ID !== undefined) {
            getWardsCache(DISTRICT_ID)
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
            wards,
            webhook_link
        } = this.state;

        return (
            <div>
                {/*<p style={{marginBottom: 30}}>Để cấu hình nhà vận chuyển Viettel Post, bạn phải tạo tài khoản Viettel*/}
                {/*Post mới thông qua Adsbold.*/}
                {/*Tài khoản này có thể dùng như tài khoản Viettel Post bình thường.</p>*/}
                <p style={{marginBottom: 30}}>Để cấu hình nhà vận chuyển Viettel Post, bạn phải là khách hàng của
                    Viettel Post và <strong>cấu hình URL nhận hành trình</strong> của Adsbold cho Viettel Post</p>

                <div className="row form-group">
                    <div className="col-sm-4">
                        <label className="control-label">Đường dẫn nhận hành trình</label>
                    </div>
                    <div className="col-sm-8">
                        <input type="text"
                               className="form-control"
                               ref='webhook_link'
                               value={webhook_link || ''}
                               disabled={true}
                        />
                    </div>
                </div>

                <div className="panel panel-primary">
                    <div className="panel-heading">Thông tin tài khoản</div>
                    <div className="panel-body">

                        <div className="row">
                            <div className="form-group col-sm-6">
                                <div className="col-sm-4">
                                    <label className="control-label">Họ và Tên</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text"
                                           className="form-control"
                                           ref='NAME'
                                           value={providerInfo.NAME || ''}
                                           onChange={() => {
                                               this.onChangeInput('NAME')
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
                                           ref='PHONE'
                                           value={providerInfo.PHONE || ''}
                                           onChange={() => {
                                               this.onChangeInput('PHONE')
                                           }}
                                           disabled={disabled}
                                    />
                                </div>
                            </div>

                            <div className="form-group col-sm-6">
                                <div className="col-sm-4">
                                    <label className="control-label">Email</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text"
                                           className="form-control"
                                           ref='EMAIL'
                                           value={providerInfo.EMAIL || ''}
                                           onChange={() => {
                                               this.onChangeInput('EMAIL')
                                           }}
                                           disabled={disabled}
                                    />
                                </div>
                            </div>

                            <div className="form-group col-sm-6">
                                <div className="col-sm-4">
                                    <label className="control-label">Mật khẩu</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text"
                                           className="form-control"
                                           ref='PASSWORD'
                                           value={providerInfo.PASSWORD || ''}
                                           onChange={() => {
                                               this.onChangeInput('PASSWORD')
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
                                            ref='PROVINCE_ID'
                                            value={providerInfo.PROVINCE_ID || ''}
                                            onChange={() => {
                                                this.onChangeProvince()
                                            }}
                                            disabled={disabled}
                                    >
                                        <option value=""/>
                                        {
                                            provinces.length > 0 && provinces.map(p => {
                                                return <option value={p.PROVINCE_ID} key={p.PROVINCE_ID}>
                                                    {p.PROVINCE_NAME}
                                                </option>
                                            })
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
                                            ref='DISTRICT_ID'
                                            value={providerInfo.DISTRICT_ID || ''}
                                            onChange={() => {
                                                this.onChangeDistrict()
                                            }}
                                            disabled={disabled}
                                    >
                                        <option value=""/>
                                        {
                                            districts.length > 0 && districts.map(d => {
                                                return <option value={d.DISTRICT_ID} key={d.DISTRICT_ID}>
                                                    {convert_case(d.DISTRICT_NAME)}
                                                </option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="form-group col-sm-6">
                                <div className="col-sm-5">
                                    <label className="control-label">Phường/Xã</label>
                                </div>
                                <div className="col-sm-7">
                                    <select className="form-control"
                                            ref='WARDS_ID'
                                            value={providerInfo.WARDS_ID || ''}
                                            onChange={() => {
                                                this.onChangeInput('WARDS_ID')
                                            }}
                                            disabled={disabled}
                                    >
                                        <option value=""/>
                                        {
                                            wards.length > 0 && wards.map(w => {
                                                return <option value={w.WARDS_ID} key={w.WARDS_ID}>
                                                    {convert_case(w.WARDS_NAME)}
                                                </option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="form-group col-sm-6">
                                <div className="col-sm-5">
                                    <label className="control-label">Địa chỉ</label>
                                </div>
                                <div className="col-sm-7">
                                    <input type="text"
                                           className="form-control"
                                           ref='ADDRESS'
                                           value={providerInfo.ADDRESS || ''}
                                           onChange={() => {
                                               this.onChangeInput('ADDRESS')
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

ViettelPostPanel.propTypes = {
    providerInfo: propTypes.object,
    onChangeInput: propTypes.func,
    disabled: propTypes.bool
};

export default ViettelPostPanel;