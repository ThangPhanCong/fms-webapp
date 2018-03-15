import React, {Component} from "react";
import propTypes from 'prop-types';
import {toDatetimeLocal, toReadableDatetime} from "../../../../utils/datetime-utils";
import {updateShopNoteViettel} from "../../../../api/ViettelPostApi";

class ViettelPostOptionActionPanel extends Component {

    state = {
        shopNote: {},
        isLoading: false
    };

    createShopNote() {
        const {shopNote} = this.state;
        const {
            transportOrder,
            onUpdateTransportOrder
        } = this.props;
        const {order_id} = transportOrder;

        this.setState({isLoading: true});

        //call api
        updateShopNoteViettel(shopNote, order_id)
            .then(
                res => {
                    onUpdateTransportOrder();

                    this.setState({shopNote: {}});
                },
                err => {
                    alert(err.message);
                }
            )
            .then(() => this.setState({isLoading: false}));
    }


    onShopNoteChange(refName, newValue = this.refs[refName].value) {
        const newShopNote = {
            ...this.state.shopNote,
            [refName]: newValue
        };

        if (refName === 'DATE') {
            const datetime = toReadableDatetime(newValue);
            newShopNote.DATE = datetime.date + ' ' + datetime.time + ':00';
        }

        if (refName === 'TYPE') {
            const TYPE = parseInt(newValue);
            newShopNote.TYPE = TYPE;
        }

        this.setState({shopNote: newShopNote});
    }

    render() {
        const {
            transportOrder,
            disabled
        } = this.props;

        const {
            shopNote,
            isLoading
        } = this.state;

        const noteTypes = [
            {key: 1, name: 'Duyệt đơn hàng'},
            {key: 2, name: 'Duyệt chuyển hàng'},
            {key: 3, name: 'Phát tiếp'},
            {key: 4, name: 'Hủy đơn hàng'},
            {key: 5, name: 'Lấy lại đơn hàng'},
        ];

        return (
            <div>
                <a
                    className='btn btn-success'
                    data-toggle="collapse"
                    href={'#toogle'}>Gửi yêu cầu
                </a>
                <br/>
                <div id='toogle' className='collapse' style={{marginTop: '20px'}}>
                    <div className="row form-group">
                        <div className="col-sm-2">
                            <label className="control-label">Trạng thái</label>
                        </div>
                        <div className="col-sm-4">
                            <select className="form-control"
                                    ref='TYPE'
                                    value={shopNote && shopNote.TYPE || ''}
                                    onChange={() => {
                                        this.onShopNoteChange('TYPE')
                                    }}
                                    disabled={disabled || isLoading}
                            >
                                <option value=""/>
                                {
                                    noteTypes.map(
                                        t => <option key={t.key} value={t.key}>{t.name}</option>
                                    )
                                }
                            </select>
                        </div>

                        <div className="col-sm-2">
                            <label className="control-label">Ngày tháng</label>
                        </div>
                        <div className="col-sm-4">
                            <input type='datetime-local'
                                   className="form-control"
                                   ref='DATE'
                                   value={toDatetimeLocal(shopNote && shopNote.DATE) || ''}
                                   onChange={() => {
                                       this.onShopNoteChange('DATE')
                                   }}
                                   disabled={disabled || isLoading}
                            />
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-sm-2">
                            <label className="control-label">Yêu cầu</label>
                        </div>
                        <div className="col-sm-10">
                            <textarea
                                className="form-control"
                                ref='NOTE'
                                value={shopNote && shopNote.NOTE || ''}
                                onChange={() => {
                                    this.onShopNoteChange('NOTE')
                                }}
                                rows='2'
                                disabled={disabled || isLoading}
                            />
                        </div>
                    </div>

                    <button
                        className='btn btn-primary pull-right'
                        onClick={() => this.createShopNote()}
                        disabled={disabled || isLoading}>Gửi
                    </button>
                    <br/>
                </div>
            </div>
        )
    }
}

ViettelPostOptionActionPanel.propTypes = {
    transportOrder: propTypes.object,
    onUpdateTransportOrder: propTypes.func,

    disabled: propTypes.bool
};

export default ViettelPostOptionActionPanel;