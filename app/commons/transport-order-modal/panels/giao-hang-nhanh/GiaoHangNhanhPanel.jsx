import React, {Component} from 'react';
import propTypes from 'prop-types';
import {toReadableDatetime} from "../../../../utils/datetime-utils";
import * as orderCalculateUtils from 'utils/order-calculate-price-utils';
import * as ghnApi from "../../../../api/GiaoHangNhanhApi";
import GiaoHangNhanhTransportInfoPanel from "./GiaoHangNhanhTransportInfoPanel";
import GiaoHangNhanhProductInfoPanel from "./GiaoHangNhanhProductInfoPanel";
import GiaoHangNhanhServiceInfoPanel from "./GiaoHangNhanhServiceInfoPanel";

class GiaoHangNhanhPanel extends Component {

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

        this.props.onChangeTransportOrderInfo(newTransportOrder);
    }

    async componentDidMount() {
        const {order} = this.props;

        /**
         check('CustomerName').exists(),
         check('CustomerPhone').exists(),

         check('ToProvinceID').exists(),
         check('ToDistrictID').exists(),
         check('ToWardCode').exists(),
         check('ShippingAddress').exists(),

         check('Weight').exists(),
         check('Length').exists(),
         check('Width').exists(),
         check('Height').exists(),

         check('Note').exists(),
         check('NoteCode').exists(), // Allowed values: CHOTHUHANG, CHOXEMHANGKHONGTHU, KHONGCHOXEMHANG
         check('ShippingOrderCosts').exists(), // Service information. object
         check('CoDAmount').exists(), // Amount cash to collect. Default value: 0
         */

        const transportOrder = {
            ...this.state.transportOrder,

            CustomerName: order.customer_name || '',
            CustomerPhone: order.customer_phone || '',

            ShippingAddress: order.full_address || '',

            Weight: 0,
            Length: 0,
            Width: 0,
            Height: 0,

            Note: '',
            NoteCode: '',

            CoDAmount: orderCalculateUtils.calculateTotalPrice(order),
        };

        // if (order.province) {
        //     const cacheProvinces = await ghnApi.getProvinces();
        //     const findProvince = cacheProvinces.find(p => p.PROVINCE_NAME === order.province);
        //     transportOrder.RECEIVER_PROVINCE = findProvince.PROVINCE_ID;
        //     if (findProvince) {
        //         const cacheDistricts = await getDistrictsCache(findProvince.PROVINCE_ID);
        //         const findDistrict = cacheDistricts.find(d => d.DISTRICT_NAME === order.district);
        //         transportOrder.RECEIVER_DISTRICT = findDistrict.DISTRICT_ID;
        //         if (findDistrict) {
        //             const cacheWards = await getWardsCache(findDistrict.DISTRICT_ID);
        //             const findWard = cacheWards.find(w => w.WARDS_NAME === order.ward);
        //             transportOrder.RECEIVER_WARD = findWard.WARDS_ID;
        //         }
        //     }
        // }

        this.setState({transportOrder});

        this.props.onChangeTransportOrderInfo(transportOrder);
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
                    <GiaoHangNhanhTransportInfoPanel
                        CustomerName={transportOrder.CustomerName}
                        CustomerPhone={transportOrder.CustomerPhone}
                        ToProvinceID={transportOrder.ToProvinceID}
                        ToDistrictID={transportOrder.ToDistrictID}
                        ToWardCode={transportOrder.ToWardCode}
                        ShippingAddress={transportOrder.ShippingAddress}

                        onChangeInput={this.onChangeInput.bind(this)}
                        disabled={disabled}
                    />
                </div>

                <div className="col-sm-12">
                    <GiaoHangNhanhProductInfoPanel
                        Weight={transportOrder.Weight}
                        Length={transportOrder.Length}
                        Width={transportOrder.Width}
                        Height={transportOrder.Height}

                        onChangeInput={this.onChangeInput.bind(this)}
                        disabled={disabled}
                    />
                </div>

                <div className="col-sm-12">
                    <GiaoHangNhanhServiceInfoPanel
                        Note={transportOrder.Note}
                        NoteCode={transportOrder.NoteCode}
                        ServiceID={transportOrder.ServiceID}
                        CoDAmount={transportOrder.CoDAmount}

                        onChangeInput={this.onChangeInput.bind(this)}
                        disabled={disabled}
                    />
                </div>
            </div>
        )
    }
}

GiaoHangNhanhPanel.propTypes = {
    transportOrder: propTypes.object,
    onChangeInput: propTypes.func,
    disabled: propTypes.bool
};

export default GiaoHangNhanhPanel;
