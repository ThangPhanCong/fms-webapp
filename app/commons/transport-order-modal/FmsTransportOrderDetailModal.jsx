import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';
import {getTransportOrderInfo} from '../../api/TransportProviderApi';
import {updateShopNoteViettel} from '../../api/ViettelPostApi';
import FmsTimeline from '../FmsTimeline/FmsTimeline';
import {toReadableDatetime, toDatetimeLocal} from 'utils/datetime-utils.js';
import {cloneDeep} from 'utils/object-utils.js';

class FmsTransportOrderDetailModal extends Component {
    state = {
        transportOrder: null,
        isLoading: false,
        transportProvider: '',
        shop_note: {}
    };

    onChangeInput(refName) {
        const newValue = this.refs[refName].value;
        const shop_note = {...this.state.shop_note};
        
        switch (refName) {
            case 'TYPE':
                shop_note.TYPE = parseInt(newValue);
                break;
            case 'DATE':
                const datetime = toReadableDatetime(newValue);
                shop_note.DATE = datetime.date + ' ' + datetime.time + ':00';
                break;
            default:
                shop_note[refName] = newValue;
        }

        this.setState({shop_note});
    }

    onUpdateTransportOrder() {
        const {order_id} = this.props;
        const {shop_note} = this.state;
        this.setState({isLoading: true});

        updateShopNoteViettel(shop_note, order_id)
            .then(
                res => {
                    const shouldUpdate = true;
                    this.closeModal(shouldUpdate);
                },
                err => {
                    alert(err.message);
                }
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
            getTransportOrderInfo(nextProps.order_id)
                .then(res => {
                    this.setState({transportOrder: res});
                    if (nextProps.providers) {
                        const findProvider = nextProps.providers.find(p => p._id === res.transport_provider);
                        this.setState({transportProvider: findProvider.provider_display_name});
                    }
                });
        }
    }

    render() {
        const {isShown, providers} = this.props;
        const {
            transportOrder, 
            isLoading, 
            transportProvider,
            shop_note
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
            timelineItems.sort((a,b) => {
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
                        <h4 className='modal-title'>Thông tin vận đơn đơn hàng {transportProvider}</h4>
                        <small className="font-bold">Ngày tạo:
                            <strong> {created_time.date + ' ' + created_time.time}</strong>
                        </small>
                    </Modal.Header>

                    <Modal.Body>
                        {
                            timelineItems.length > 0 ? (
                                <div className='row'>
                                    <FmsTimeline items={timelineItems} />

                                    <div className='m-l-xl'>
                                        
                                        <span className='m-l-lg'>
                                            <i className="fa fa-circle" style={{color: '#7b9d6f'}}></i>
                                            {' '} Trạng thái đơn hàng
                                        </span>

                                        <span className='m-l-lg'>
                                            <i className="fa fa-circle" style={{color: '#e91b3d'}}></i>
                                            {' '} Yêu cầu của shop
                                        </span>
                                    </div>
                                    <hr/>
                                </div>
                            ) : null
                        }
                        
                        <label
                            className='btn btn-success'
                            data-toggle="collapse"
                            href={'#toogle'}>Gửi yêu cầu
                        </label>
                        <br/>
                        <div id='toogle' className='collapse' style={{marginTop: '20px'}}>
                            <div className="row form-group">
                                <div className="col-sm-2">
                                    <label className="control-label">Trạng thái</label>
                                </div>
                                <div className="col-sm-4">
                                    <select className="form-control"
                                            ref='TYPE'
                                            value={shop_note.TYPE || ''}
                                            onChange={() => {this.onChangeInput('TYPE')}}
                                    >
                                        <option value=""></option>
                                        <option value="1">Duyệt đơn hàng</option>
                                        <option value="2">Duyệt chuyển hoàn</option>
                                        <option value="3">Phát tiếp</option>
                                        <option value="4">Hủy đơn hàng</option>
                                        <option value="5">Lấy lại đơn hàng</option>
                                    </select>
                                </div>

                                <div className="col-sm-2">
                                    <label className="control-label">Ngày tháng</label>
                                </div>
                                <div className="col-sm-4">
                                    <input type='datetime-local'
                                            className="form-control"
                                            ref='DATE'
                                            value={toDatetimeLocal(shop_note.DATE) || ''}
                                            onChange={() => {this.onChangeInput('DATE')}}
                                    />
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-sm-2">
                                    <label className="control-label">Yêu cầu</label>
                                </div>
                                <div className="col-sm-10">
                                    <textarea className="form-control"
                                            ref='NOTE'
                                            value={shop_note.NOTE || ''}
                                            onChange={() => {this.onChangeInput('NOTE')}}
                                            rows='2'
                                    >
                                    </textarea>
                                </div>
                            </div>

                            <button
                                className='btn btn-primary pull-right'
                                onClick={this.onUpdateTransportOrder.bind(this)}
                                disabled={isLoading}>Gửi
                            </button>
                            <br/>
                        </div>

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
