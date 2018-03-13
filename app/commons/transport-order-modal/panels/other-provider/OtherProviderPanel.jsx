import React, {Component} from 'react';
import propTypes from 'prop-types';
import * as ghtkApi from 'api/GiaoHangTietKiemApi';
import {toReadableDatetime} from "../../../../utils/datetime-utils";
import OtherTransportInfoPanel from "./OtherTransportInfoPanel";
import OtherServiceInfoPanel from "./OtherServiceInfoPanel";

class OtherProviderPanel extends Component {

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
            transportOrder.receiver_fullname = order.customer_name;
        }

        if (order.customer_phone) {
            transportOrder.receiver_phone = order.customer_phone;
        }

        if (order.full_address) {
            transportOrder.receiver_address = order.full_address;
        }

        if (order.province) {
            const cacheProvinces = await ghtkApi.getProvinces();
            const findProvince = cacheProvinces.find(p => p.PROVINCE_NAME === order.province);
            transportOrder.receiver_province = findProvince.PROVINCE_NAME;

            if (findProvince) {
                const cacheDistricts = await ghtkApi.getAllDistricts(findProvince.PROVINCE_NAME);
                const findDistrict = cacheDistricts.find(d => d.DISTRICT_NAME === order.district);
                transportOrder.receiver_district = findDistrict.DISTRICT_NAME;

                if (findDistrict) {
                    const cacheWards = await ghtkApi.getAllWards(findDistrict.DISTRICT_NAME);
                    const findWard = cacheWards.find(w => w.WARDS_NAME === order.ward);
                    transportOrder.receiver_ward = findWard.WARDS_NAME;
                }
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
                    <OtherTransportInfoPanel
                        receiver_fullname={transportOrder.receiver_fullname}
                        receiver_phone={transportOrder.receiver_phone}
                        receiver_province={transportOrder.receiver_province}
                        receiver_district={transportOrder.receiver_district}
                        receiver_ward={transportOrder.receiver_ward}
                        receiver_address={transportOrder.receiver_address}

                        onChangeInput={this.onChangeInput.bind(this)}
                        disabled={disabled}
                    />
                </div>

                <div className="col-sm-12">
                    <OtherServiceInfoPanel
                        tracking_id={transportOrder.tracking_id}
                        money_transport={transportOrder.money_transport}
                        money_collection={transportOrder.money_collection}

                        onChangeInput={this.onChangeInput.bind(this)}
                        disabled={disabled}
                    />
                </div>
            </div>
        )
    }
}

OtherProviderPanel.propTypes = {
    transportOrder: propTypes.object,
    onChangeInput: propTypes.func,
    disabled: propTypes.bool
};

export default OtherProviderPanel;
