import React, {Component} from 'react';
import propTypes from 'prop-types';
import {toReadableDatetime} from "../../../../utils/datetime-utils";
import * as orderCalculateUtils from 'utils/order-calculate-price-utils';
import * as shipchungApi from "../../../../api/ShipChungApi";
import ShipChungTransportInfoPanel from "./ShipChungTransportInfoPanel";
import ShipChungProductInfoPanel from "./ShipChungProductInfoPanel";
import ShipChungServiceInfoPanel from "./ShipChungServiceInfoPanel";

class ShipChungPanel extends Component {

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
         check('To.Name').exists(),
         check('To.Phone').exists(),

         check('To.City').exists(),
         check('To.Province').exists(),
         check('To.Ward').exists(),
         check('To.Address').exists(),

         check('Order.Amount').exists(),
         check('Order.Weight').exists(),
         check('Order.Code').exists(),
         check('Order.Quantity').exists(),
         check('Order.ProductName').exists(),

         // check('Type').exists(), // “Type”: “excel” : We auto select best courier. You don’t define params Courier.

         check('Config.Service').exists(), // 	Shipping method:1. Economy delivery service,2. Express delivery service.
         check('Config.CoD').exists(),   // Cash On Delivery (COD) 1: Use; 2: Don’t use.
         check('Config.Protected').exists(), // 1 / 0 :Bảo hiểm
         check('Config.Checking').exists(), // 1/0	Accept receiver view item in order before confirm received or not.
         */

        const transportOrder = {
            ...this.state.transportOrder,

            "To_Name": order.customer_name || '',
            "To_Phone": order.customer_phone || '',

            "To_Address": order.full_address || '',

            "Order_Amount": orderCalculateUtils.calculateTotalPrice(order),
            "Order_Weight": "0",
            "Order_Quantity": order && order.products && order.products.length || 0,
            "Order_ProductName": "0",

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
                    <ShipChungTransportInfoPanel
                        To_Name={transportOrder.To_Name}
                        To_Phone={transportOrder.To_Phone}

                        To_City={transportOrder.To_City}
                        To_Province={transportOrder.To_Province}
                        To_Ward={transportOrder.To_Ward}
                        To_Address={transportOrder.To_Address}

                        onChangeInput={this.onChangeInput.bind(this)}
                        disabled={disabled}
                    />
                </div>

                <div className="col-sm-12">
                    <ShipChungProductInfoPanel
                        Order_ProductName={transportOrder.Order_ProductName}
                        Order_Weight={transportOrder.Order_Weight}
                        Order_Quantity={transportOrder.Order_Quantity}

                        onChangeInput={this.onChangeInput.bind(this)}
                        disabled={disabled}
                    />
                </div>

                <div className="col-sm-12">
                    <ShipChungServiceInfoPanel
                        Order_Amount={transportOrder.Order_Amount}
                        Config_Service={transportOrder.Config_Service}
                        Config_CoD={transportOrder.Config_CoD}
                        Config_Protected={transportOrder.Config_Protected}
                        Config_Checking={transportOrder.Config_Checking}

                        onChangeInput={this.onChangeInput.bind(this)}
                        disabled={disabled}
                    />
                </div>
            </div>
        )
    }
}

ShipChungPanel.propTypes = {
    transportOrder: propTypes.object,
    onChangeInput: propTypes.func,
    disabled: propTypes.bool
};

export default ShipChungPanel;
