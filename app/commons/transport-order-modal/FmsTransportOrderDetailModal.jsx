import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';
import {getTransportOrderInfo} from '../../api/TransportProviderApi';
import {updateShopNoteViettel} from '../../api/ViettelPostApi';
import FmsTimeline from '../FmsTimeline/FmsTimeline';
import {toReadableDatetime, toDatetimeLocal} from 'utils/datetime-utils.js';
import {cloneDeep} from 'utils/object-utils.js';
import ViettelPostOptionActionPanel from "./panels/viettel-post/ViettelPostOptionActionPanel";
import FmsGeneralTransportOrderInfo from "./panels/commons/FmsGeneralTransportOrderInfo";
import OtherProviderOptionActionPanel from "./panels/other-provider/OtherProviderOptionActionPanel";
import GiaoHangNhanhOptionActionPanel from "./panels/giao-hang-nhanh/GiaoHangNhanhOptionActionPanel";

class FmsTransportOrderDetailModal extends Component {
    state = {
        transportOrder: null,
        isLoading: false,
        shop_note: {}
    };

    updateTransportOrderInfo(order_id = this.state.transportOrder.order_id) {
        this.setState({isLoading: true});

        getTransportOrderInfo(order_id)
            .then(
                res => this.setState({transportOrder: res,}),
                err => alert(err.message)
            )
            .then(() => this.setState({isLoading: false}));

    }

    onCloseButtonClick() {
        this.closeModal();
    }

    closeModal(shouldUpdate) {
        this.setState({shop_note: {}, transportOrder: null});
        this.props.onClose(shouldUpdate);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isShown) {
            const {order_id} = nextProps;

            this.updateTransportOrderInfo(order_id);
        }
    }

    render() {
        const {isShown} = this.props;
        const {
            transportOrder,
            isLoading,
        } = this.state;

        let created_time = '';
        let timelineItems = [];
        if (transportOrder) {
            created_time = toReadableDatetime(transportOrder.created_time);

            let transport_shop_notes = cloneDeep(transportOrder.transport_shop_notes);
            transport_shop_notes.forEach(item => {
                item.class = 'shop_note';
                let datetime = toReadableDatetime(item.created_time);
                item.created_time = datetime.date + ' ' + datetime.time;
            });

            let transport_status = cloneDeep(transportOrder.transport_status);
            transport_status.forEach(item => {
                item.class = 'status';
                let datetime = toReadableDatetime(item.created_time);
                item.created_time = datetime.date + ' ' + datetime.time;
            });

            timelineItems = transport_shop_notes.concat(transport_status);
            timelineItems.sort((a, b) => {
                return new Date(a.created_time) - new Date(b.created_time);
            });
        }

        return (
            <Modal show={isShown} backdrop='static' keyboard={false} bsSize='large'>
                <div className='inmodal'>
                    <Modal.Header
                        closeButton={true}
                        onHide={this.onCloseButtonClick.bind(this)}
                    >
                        <h4 className='modal-title'>Vận đơn
                            #{transportOrder ? transportOrder.transport_tracking_id : ''}</h4>
                        <small className="font-bold">Ngày tạo:
                            <strong> {created_time.date + ' ' + created_time.time}</strong>
                        </small>
                    </Modal.Header>

                    <Modal.Body>
                        <FmsGeneralTransportOrderInfo
                            transportOrder={transportOrder}
                            timelineItems={timelineItems}
                        />

                        {
                            (transportOrder && transportOrder.transport_provider
                                && transportOrder.transport_provider.provider_name === "VIETTEL") ?
                                <ViettelPostOptionActionPanel
                                    transportOrder={transportOrder}
                                    disabled={isLoading}

                                    onUpdateTransportOrder={() => this.updateTransportOrderInfo()}
                                /> : null
                        }

                        {
                            (transportOrder && transportOrder.transport_provider
                                && transportOrder.transport_provider.provider_name === "GHN") ?
                                <GiaoHangNhanhOptionActionPanel
                                    transportOrder={transportOrder}
                                    disabled={isLoading}

                                    onUpdateTransportOrder={() => this.updateTransportOrderInfo()}
                                /> : null
                        }

                        {
                            (
                                transportOrder && transportOrder.transport_provider
                                && transportOrder.transport_provider.provider_name !== "VIETTEL"
                                && transportOrder.transport_provider.provider_name !== "SHIPCHUNG"
                                && transportOrder.transport_provider.provider_name !== "GHTK"
                                && transportOrder.transport_provider.provider_name !== "GHN"
                            ) ?
                                <OtherProviderOptionActionPanel
                                    transportOrder={transportOrder}
                                    disabled={isLoading}

                                    onUpdateTransportOrder={() => this.updateTransportOrderInfo()}
                                /> : null
                        }

                    </Modal.Body>

                    <Modal.Footer>
                        <button
                            className='btn btn-white'
                            onClick={this.onCloseButtonClick.bind(this)}
                            disabled={isLoading}>Đóng
                        </button>
                    </Modal.Footer>
                </div>
            </Modal>
        );
    }
}

FmsTransportOrderDetailModal.propTypes = {
    isShown: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired,
    order_id: propTypes.string,
    providers: propTypes.array
};

export default FmsTransportOrderDetailModal;
