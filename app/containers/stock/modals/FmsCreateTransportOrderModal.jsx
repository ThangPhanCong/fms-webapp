import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';
import {providers} from '../../../constants/transporting-provider';
import ViettelPostPanel from './panels/viettel-post/ViettelPostPanel';
import GiaoHangTietKiemPanel from './panels/giao-hang-tiet-kiem/GiaoHangTietKiemPanel';

import {
    getProvincesCache, 
    getDistrictsCache, 
    getWardsCache, 
    getViettelInventories, 
    createViettelTransportOrder
} from '../../../api/ViettelPostApi';
import {toReadableDatetime} from 'utils/datetime-utils.js';

class FmsCreateTransportOrderModal extends Component {

    state = {
        transportOrder: {},
        isLoading: false,
        transportingProvider: ''
    };

    onCreateTransportOrder() {
        const type = this.state.transportingProvider;
        switch(type) {
            case 'viettel-post':
                this.createViettelPostTransportOrder();
                break;
            case 'giao-hang-tiet-kiem':
                break;
        }
    }

    createViettelPostTransportOrder() {
        const order_id = this.props.order._id;
        const {transportOrder} = this.state;

        createViettelTransportOrder(transportOrder, order_id)
            .then(res => {
                console.log(res);
                let shouldUpdate = true;
                this.closeModal(shouldUpdate);
            })
            .catch(err => alert(err));
    }

    onCloseButtonClick() {
        this.setState({transportOrder: {}});
        this.closeModal();
    }

    closeModal(shouldUpdate) {
        this.props.onClose(shouldUpdate);
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
                const datetime = toReadableDatetime(newValue);
                newTransportOrder.DELIVERY_DATE = datetime.date + ' ' + datetime.time + ':00';
                break;
            default:
                newTransportOrder[refName] = newValue;
        }

        this.setState({transportOrder: newTransportOrder});
    }

    onChangeTransportingProvider(e) {
        this.setState({transportingProvider: e.target.value});
        const type = e.target.value;
        switch(type) {
            case 'viettel-post':
                this.onSelectViettelPost();
                break;
            case 'giao-hang-tiet-kiem':
                break;
        }
    }

    async onSelectViettelPost() {
        const {order} = this.props;

        const viettelInventoriesResponse = await getViettelInventories();
        const transportOrder = {
            ...this.state.transportOrder,
            CUS_ID: viettelInventoriesResponse[0].CUS_ID,
            GROUPADDRESS_ID: viettelInventoriesResponse[0].GROUPADDRESS_ID,
            RECEIVER_FULLNAME: order.customer_name || '',
            RECEIVER_PHONE: order.customer_phone || '',
            RECEIVER_ADDRESS: order.full_address || '',
            RECEIVER_EMAIL: order.customer_email || ''
        }

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
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isShown) {
            this.setState({transportingProvider: '', isLoading: false});
        }
    }

    render() {
        const {
            isShown,
            order
        } = this.props;

        const {
            isLoading,
            transportOrder,
            transportingProvider
        } = this.state;

        let panel = null;
        switch(transportingProvider) {
            case 'viettel-post':
                panel = <ViettelPostPanel onChangeInput={this.onChangeInput.bind(this)}
                                            transportOrder={transportOrder} />;
                break;
            case 'giao-hang-tiet-kiem':
                panel = <GiaoHangTietKiemPanel onChangeInput={this.onChangeInput.bind(this)}
                                                transportOrder={transportOrder} />;
                break;
            default:
                break;
        }
        return (
            <Modal show={isShown} backdrop='static' keyboard={false}bsSize='large'>
                <div className='inmodal'>
                    <Modal.Header
                        closeButton={true}
                        onHide={this.onCloseButtonClick.bind(this)}
                    >
                        <h4 className='modal-title'>Tạo vận đơn {order ? order.id : ''}</h4>

                    </Modal.Header>

                    <Modal.Body>
                        <div className="form-group row">
                            <div className="col-sm-3">
                                <label className="control-label">Đơn vị vận chuyển</label>
                            </div>
                            <div className="col-sm-9">
                                <select
                                       className="form-control"
                                       disabled={isLoading}
                                       value={transportingProvider}
                                       onChange={this.onChangeTransportingProvider.bind(this)}
                                >
                                    <option value=""></option>
                                    {
                                        providers.map(p => {
                                            if (p.status === 'active')
                                            return <option value={p.name_slug} key={p.id} >{p.name}</option>;
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        {panel}
                    </Modal.Body>

                    <Modal.Footer>
                        <button
                            className='btn btn-white'
                            onClick={this.onCloseButtonClick.bind(this)}
                            disabled={isLoading}>Hủy
                        </button>

                        <button
                            className='btn btn-primary'
                            onClick={this.onCreateTransportOrder.bind(this)}
                            disabled={isLoading}>Thêm mới
                        </button>
                    </Modal.Footer>
                </div>
            </Modal>
        );
    }
}

FmsCreateTransportOrderModal.propTypes = {
    isShown: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired
};

export default FmsCreateTransportOrderModal;
