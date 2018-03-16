import React, {Component} from 'react';
import propTypes from 'prop-types';
import ViettelTransportInfoPanel from './ViettelTransportInfoPanel';
import ViettelProductInfoPanel from './ViettelProductInfoPanel';
import ViettelServiceInfoPanel from "./ViettelServiceInfoPanel";
import {toReadableDatetime} from "../../../../utils/datetime-utils";
import * as orderCalculateUtils from 'utils/order-calculate-price-utils';
import {
    getDistrictsCache, getProvincesCache, getViettelInventories,
    getWardsCache
} from "../../../../api/ViettelPostApi";

class ViettelPostPanel extends Component {

    state = {
        transportOrder: {}
    };

    formatProductsName(products) {
        if (!Array.isArray(products)) return '';

        return products.reduce(
            (acc, p, i) => {
                return acc + (p.name || '') + (i !== products.length - 1 ? ', ' : '');
            },
            ''
        )
    }

    onChangeInput(refName, newValue) {
        const newTransportOrder = {...this.state.transportOrder};

        switch (refName) {
            case 'RECEIVER_PROVINCE':
                newTransportOrder.RECEIVER_PROVINCE = newValue;
                newTransportOrder.RECEIVER_DISTRICT = '';
                newTransportOrder.RECEIVER_WARD = '';
                break;
            case 'RECEIVER_DISTRICT':
                newTransportOrder.RECEIVER_DISTRICT = newValue;
                newTransportOrder.RECEIVER_WARD = '';
                break;
            case 'DELIVERY_DATE':
                console.log('date time', newValue)
                const datetime = toReadableDatetime(newValue);
                newTransportOrder.DELIVERY_DATE = datetime.date + ' ' + datetime.time + ':00';
                break;
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

        const viettelInventoriesResponse = await getViettelInventories();

        const transportOrder = {
            ...this.state.transportOrder,
            CUS_ID: viettelInventoriesResponse[0].CUS_ID,
            GROUPADDRESS_ID: viettelInventoriesResponse[0].GROUPADDRESS_ID,
            RECEIVER_FULLNAME: order.customer_name || '',
            RECEIVER_PHONE: order.customer_phone || '',
            RECEIVER_ADDRESS: order.full_address || '',
            RECEIVER_EMAIL: order.customer_email || '',

            PRODUCT_NAME: this.formatProductsName(order.products),
            PRODUCT_DESCRIPTION: '',
            PRODUCT_QUANTITY: order.products && order.products.length || 0,
            PRODUCT_PRICE: orderCalculateUtils.calculateProductsPrice(order.products),

            ORDER_SERVICE_ADD: '',
            MONEY_COLLECTION: orderCalculateUtils.calculateTotalPrice(order),
        };

        if (order.province) {
            const cacheProvinces = await getProvincesCache();
            const findProvince = cacheProvinces.find(p => p.PROVINCE_NAME === order.province);
            transportOrder.RECEIVER_PROVINCE = findProvince.PROVINCE_ID;
            if (findProvince) {
                const cacheDistricts = await getDistrictsCache(findProvince.PROVINCE_ID);
                const findDistrict = cacheDistricts.find(d => d.DISTRICT_NAME === order.district);
                transportOrder.RECEIVER_DISTRICT = findDistrict.DISTRICT_ID;
                if (findDistrict) {
                    const cacheWards = await getWardsCache(findDistrict.DISTRICT_ID);
                    const findWard = cacheWards.find(w => w.WARDS_NAME === order.ward);
                    transportOrder.RECEIVER_WARD = findWard.WARDS_ID;
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
                    <ViettelTransportInfoPanel
                        RECEIVER_FULLNAME={transportOrder.RECEIVER_FULLNAME}
                        RECEIVER_PHONE={transportOrder.RECEIVER_PHONE}
                        RECEIVER_EMAIL={transportOrder.RECEIVER_EMAIL}
                        RECEIVER_PROVINCE={transportOrder.RECEIVER_PROVINCE}
                        RECEIVER_DISTRICT={transportOrder.RECEIVER_DISTRICT}
                        RECEIVER_WARD={transportOrder.RECEIVER_WARD}
                        RECEIVER_ADDRESS={transportOrder.RECEIVER_ADDRESS}

                        onChangeInput={this.onChangeInput.bind(this)}
                        disabled={disabled}
                    />
                </div>

                <div className="col-sm-12">
                    <ViettelProductInfoPanel
                        PRODUCT_NAME={transportOrder.PRODUCT_NAME}
                        PRODUCT_DESCRIPTION={transportOrder.PRODUCT_DESCRIPTION}
                        PRODUCT_QUANTITY={transportOrder.PRODUCT_QUANTITY}
                        PRODUCT_PRICE={transportOrder.PRODUCT_PRICE}
                        PRODUCT_WEIGHT={transportOrder.PRODUCT_WEIGHT}
                        PRODUCT_LENGTH={transportOrder.PRODUCT_LENGTH}
                        PRODUCT_WIDTH={transportOrder.PRODUCT_WIDTH}
                        PRODUCT_HEIGHT={transportOrder.PRODUCT_HEIGHT}

                        onChangeInput={this.onChangeInput.bind(this)}
                        disabled={disabled}
                    />
                </div>

                <div className="col-sm-12">
                    <ViettelServiceInfoPanel
                        DELIVERY_DATE={transportOrder.DELIVERY_DATE}
                        ORDER_PAYMENT={transportOrder.ORDER_PAYMENT}
                        ORDER_SERVICE={transportOrder.ORDER_SERVICE}
                        ORDER_SERVICE_ADD={transportOrder.ORDER_SERVICE_ADD}
                        ORDER_NOTE={transportOrder.ORDER_NOTE}
                        MONEY_COLLECTION={transportOrder.MONEY_COLLECTION}

                        onChangeInput={this.onChangeInput.bind(this)}
                        disabled={disabled}
                    />
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
