import React, {Component} from 'react';
import {getViettelExtraServices, getViettelServices} from "../../../../api/ViettelPostApi";
import propTypes from "prop-types";
import {toDatetimeLocal} from "../../../../utils/datetime-utils";

class GiaoHangNhanhServiceInfoPanel extends Component {
    state = {
        services: [],
        extraServices: [],
        isLoading: false
    };

    onChangeInput(refName, newValue = this.refs[refName].value) {
        const {
            onChangeInput
        } = this.props;

        onChangeInput(refName, newValue);
    }

    componentDidMount() {
        // const loadServicePromise = getViettelServices()
        //     .then(services => this.setState({services}));
        //
        // const loadExtraServicePromise = getViettelExtraServices()
        //     .then(extraServices => this.setState({extraServices}));
        //
        // Promise.all([loadServicePromise, loadExtraServicePromise])
        //     .then(() => this.setState({isLoading: false}));
    }

    render() {

        /**
         check('Note').exists(),
         check('NoteCode').exists(), // Allowed values: CHOTHUHANG, CHOXEMHANGKHONGTHU, KHONGCHOXEMHANG
         check('ServiceID').exists(), // Extra Service ID to use
         check('ShippingOrderCosts').exists(), // Service information. object
         check('CoDAmount').exists(), // Amount cash to collect. Default value: 0
         */

        const {
            disabled,

            Note,
            NoteCode,
            ServiceID,
            CoDAmount
        } = this.props;

        const {
            isLoading,
            services,
            extraServices
        } = this.state;

        const code = [
            {
                name: 'CHOTHUHANG',
                display_name: 'Cho thử hàng'
            },
            {
                name: 'CHOXEMHANGKHONGTHU',
                display_name: 'Cho hàng không thử'
            },
            {
                name: 'KHONGCHOXEMHANG',
                display_name: 'Không cho xem hàng'
            }
        ];

        return (
            <div className='row'>
                <div className="col-md-6 form-group">
                    <div className="col-sm-5">
                        <label className="control-label required-field">Yêu cầu</label>
                    </div>
                    <div className="col-sm-7">
                        <select className="form-control required-field"
                                disabled={disabled || isLoading}
                                ref='NoteCode'
                                value={NoteCode || ''}
                                onChange={() => {
                                    this.onChangeInput('NoteCode')
                                }}
                        >
                            <option value=""/>
                            {
                                code.map(
                                    c => <option key={c.name} value={c.name}>{c.display_name}</option>
                                )
                            }
                        </select>
                    </div>
                </div>

                {/*<div className="col-md-6 form-group">*/}
                    {/*<div className="col-sm-5">*/}
                        {/*<label className="control-label required-field">Dịch vụ</label>*/}
                    {/*</div>*/}
                    {/*<div className="col-sm-7">*/}
                        {/*<select className="form-control"*/}
                                {/*disabled={disabled || isLoading}*/}
                                {/*ref='ORDER_SERVICE'*/}
                                {/*value={ORDER_SERVICE || ''}*/}
                                {/*onChange={() => {*/}
                                    {/*this.onChangeInput('ORDER_SERVICE')*/}
                                {/*}}*/}
                        {/*>*/}
                            {/*<option value=""/>*/}
                            {/*{*/}
                                {/*services.length > 0 && services.map(s => {*/}
                                    {/*return <option value={s.SERVICE_CODE} key={s.SERVICE_CODE}>{s.SERVICE_NAME}</option>*/}
                                {/*})*/}
                            {/*}*/}
                        {/*</select>*/}
                    {/*</div>*/}
                {/*</div>*/}

                <div className="col-md-6 form-group">
                    <div className="col-sm-5">
                        <label className="control-label required-field">Ghi chú</label>
                    </div>
                    <div className="col-sm-7">
                        <input type='text'
                               className="form-control"
                               disabled={disabled || isLoading}
                               ref='Note'
                               value={Note || ''}
                               onChange={() => {
                                   this.onChangeInput('Note')
                               }}
                        />
                    </div>
                </div>

                <div className="col-md-6 form-group">
                    <div className="col-sm-5">
                        <label className="control-label required-field">Tiền thu hộ</label>
                    </div>
                    <div className="col-sm-7">
                        <input type='number'
                               className="form-control"
                               disabled={disabled || isLoading}
                               ref='CoDAmount'
                               value={CoDAmount || ''}
                               onChange={() => {
                                   this.onChangeInput('CoDAmount')
                               }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

GiaoHangNhanhServiceInfoPanel.propTypes = {
    onChangeInput: propTypes.func,
    disabled: propTypes.bool,

};

export default GiaoHangNhanhServiceInfoPanel;