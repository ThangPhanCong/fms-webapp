import React, {Component} from "react";
import propTypes from 'prop-types';
import {toDatetimeLocal, toReadableDatetime} from "../../../../utils/datetime-utils";
import * as ghnApi from "../../../../api/GiaoHangNhanhApi";

class GiaoHangNhanhOptionActionPanel extends Component {

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
        ghnApi.updateTransportOrderStatus(shopNote, order_id)
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

        if (refName === 'type') {
            newShopNote.type = parseInt(newValue);
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
            {key: "2", name: 'Hủy đơn hàng'},
            {key: "3", name: 'Phát hoàn hàng về'},
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
                            <label className="control-label">Nội dung</label>
                        </div>
                        <div className="col-sm-4">
                            <select className="form-control"
                                    ref='type'
                                    value={shopNote && shopNote.type || ''}
                                    onChange={() => {
                                        this.onShopNoteChange('type')
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


                    </div>

                    {/*<div className="row form-group">*/}
                        {/*<div className="col-sm-2">*/}
                            {/*<label className="control-label">Ghi chú</label>*/}
                        {/*</div>*/}
                        {/*<div className="col-sm-10">*/}
                            {/*<textarea*/}
                                {/*className="form-control"*/}
                                {/*ref='NOTE'*/}
                                {/*value={shopNote && shopNote.NOTE || ''}*/}
                                {/*onChange={() => {*/}
                                    {/*this.onShopNoteChange('NOTE')*/}
                                {/*}}*/}
                                {/*rows='2'*/}
                                {/*disabled={disabled || isLoading}*/}
                            {/*/>*/}
                        {/*</div>*/}
                    {/*</div>*/}

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

GiaoHangNhanhOptionActionPanel.propTypes = {
    transportOrder: propTypes.object,
    onUpdateTransportOrder: propTypes.func,

    disabled: propTypes.bool
};

export default GiaoHangNhanhOptionActionPanel;