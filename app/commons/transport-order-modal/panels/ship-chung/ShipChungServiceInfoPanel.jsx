import React, {Component} from 'react';
import * as scApi from "../../../../api/ShipChungApi";
import propTypes from "prop-types";
import {toDatetimeLocal} from "../../../../utils/datetime-utils";

class ShipChungServiceInfoPanel extends Component {
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
         Order_Amount={transportOrder.Order_Amount}
         Config_Service={transportOrder.Config_Service}
         Config_CoD={transportOrder.Config_CoD}
         Config_Protected={transportOrder.Config_Protected}
         Config_Checking={transportOrder.Config_Checking}
         */

        const {
            disabled,

            Order_Amount,
            Config_Service,
            Config_CoD,
            Config_Protected,
            Config_Checking
        } = this.props;

        const {
            isLoading
        } = this.state;

        const services = [
            {
                name: "1",
                name_display: "Economy delivery service"
            },
            {
                name: "2",
                name_display: "Express delivery service"
            }
        ];

        return (
            <div className='row'>

                <div className="col-md-6 form-group">
                    <div className="col-sm-5">
                        <label className="control-label required-field">Dịch vụ</label>
                    </div>
                    <div className="col-sm-7">
                        <select className="form-control"
                                disabled={disabled || isLoading}
                                ref='Config_Service'
                                value={Config_Service || ''}
                                onChange={() => {
                                    this.onChangeInput('Config_Service')
                                }}
                        >
                            <option value=""/>
                            {
                                services.map(s => {
                                    return <option value={s.name} key={s.name}>{s.name_display}</option>
                                })
                            }
                        </select>
                    </div>
                </div>

                <div className="col-md-6 form-group">
                    <div className="col-sm-5">
                        <label className="control-label required-field">Thu hộ tiền</label>
                    </div>
                    <div className="col-sm-7">
                        <select className="form-control"
                                disabled={disabled || isLoading}
                                ref='Config_CoD'
                                value={Config_CoD || ''}
                                onChange={() => {
                                    this.onChangeInput('Config_CoD')
                                }}
                        >
                            <option value=""/>
                            <option value="1">Có</option>
                            <option value="2">Không</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-6 form-group">
                    <div className="col-sm-5">
                        <label className="control-label required-field">Cho phép xem hàng</label>
                    </div>
                    <div className="col-sm-7">
                        <select className="form-control"
                                disabled={disabled || isLoading}
                                ref='Config_Checking'
                                value={Config_Checking || ''}
                                onChange={() => {
                                    this.onChangeInput('Config_Checking')
                                }}
                        >
                            <option value=""/>
                            <option value="1">Có</option>
                            <option value="0">Không</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-6 form-group">
                    <div className="col-sm-5">
                        <label className="control-label required-field">Bảo hiểm</label>
                    </div>
                    <div className="col-sm-7">
                        <select className="form-control"
                                disabled={disabled || isLoading}
                                ref='Config_Protected'
                                value={Config_Protected || ''}
                                onChange={() => {
                                    this.onChangeInput('Config_Protected')
                                }}
                        >
                            <option value=""/>
                            <option value="1">Có</option>
                            <option value="0">Không</option>
                        </select>
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
                               ref='Order_Amount'
                               value={Order_Amount || ''}
                               onChange={() => {
                                   this.onChangeInput('Order_Amount')
                               }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

ShipChungServiceInfoPanel.propTypes = {
    onChangeInput: propTypes.func,
    disabled: propTypes.bool,

};

export default ShipChungServiceInfoPanel;