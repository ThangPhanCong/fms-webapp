import React, {Component} from 'react';
import propTypes from 'prop-types';
import * as ghtkApi from 'api/GiaoHangTietKiemApi';
import {toReadableDatetime} from "../../../../utils/datetime-utils";
import GhtkTransportInfoPanel from "./GhtkTransportInfoPanel";
import GhtkServiceInfoPanel from "./GhtkServiceInfoPanel";

class GiaoHangTietKiemPanel extends Component {

    state = {
        transportOrder: {}
    };

    onChangeInput(refName, newValue) {
        const newTransportOrder = {...this.state.transportOrder};

        switch (refName) {
            default:
                newTransportOrder[refName] = newValue;
        }

        this.setState({transportOrder: newTransportOrder});

        const {
            onChangeTransportOrderInfo
        } = this.props;

        onChangeTransportOrderInfo(newTransportOrder);
    }

    async componentDidMount() {
        const {order} = this.props;
        const transportOrder = {...this.state.transportOrder};

        if (order.customer_name) {
            transportOrder.name = order.customer_name;
        }

        if (order.customer_phone) {
            transportOrder.tel = order.customer_phone;
        }

        if (order.full_address) {
            transportOrder.address = order.full_address;
        }

        if (order.province) {
            const cacheProvinces = await ghtkApi.getProvinces();
            const findProvince = cacheProvinces.find(p => p.PROVINCE_NAME === order.province);
            transportOrder.province = findProvince.PROVINCE_NAME;

            if (findProvince) {
                const cacheDistricts = await ghtkApi.getAllDistricts(findProvince.PROVINCE_NAME);
                const findDistrict = cacheDistricts.find(d => d.DISTRICT_NAME === order.district);
                transportOrder.district = findDistrict.DISTRICT_NAME;
            }
        }

        this.setState({transportOrder});

        const {
            onChangeTransportOrderInfo
        } = this.props;

        onChangeTransportOrderInfo(transportOrder);
    }

    render() {
        const {
            disabled
        } = this.props;

        const {
            transportOrder
        } = this.state;

        return (
            <div className='row'>
                <div className="col-sm-12">
                    <GhtkTransportInfoPanel
                        tel={transportOrder.tel}
                        name={transportOrder.name}
                        province={transportOrder.province}
                        district={transportOrder.district}
                        address={transportOrder.address}

                        onChangeInput={this.onChangeInput.bind(this)}
                        disabled={disabled}
                    />
                </div>

                <div className="col-sm-12">
                    <GhtkServiceInfoPanel
                        note={transportOrder.note}
                        value={transportOrder.value}
                        pick_money={transportOrder.pick_money}

                        onChangeInput={this.onChangeInput.bind(this)}
                        disabled={disabled}
                    />
                </div>
            </div>
        )
    }
}

GiaoHangTietKiemPanel.propTypes = {
    transportOrder: propTypes.object,
    onChangeInput: propTypes.func,
    disabled: propTypes.bool
};

export default GiaoHangTietKiemPanel;
