import React, {Component, Fragment} from "react";
import propTypes from 'prop-types';

class FmsGeneralTransportOrderInfo extends Component {

    render() {
        const {
            transportOrder,
            timelineItems
        } = this.props;

        if (!transportOrder) return null;

        return (
            <Fragment>
                <div className="form-group row">
                    <div className="col-sm-3">
                        <label className='control-label'>Đơn vị vận chuyển</label>
                    </div>
                    <div className="col-sm-9">
                        <input type="text"
                               className='form-control'
                               value={
                                   transportOrder && transportOrder.transport_provider
                                       ? transportOrder.transport_provider.provider_display_name
                                       : ''
                               }
                               disabled={true}
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-sm-3">
                        <label className='control-label'>Mã vận chuyển</label>
                    </div>
                    <div className="col-sm-9">
                        <input type="text" className='form-control'
                               value={transportOrder ? transportOrder.transport_tracking_id : ''} disabled={true}/>
                    </div>
                </div>

                <div className="ibox">
                    <div className="ibox-title">
                        <h5>Lịch trình đơn hàng</h5>
                    </div>
                    <div className="ibox-content">
                        <div className="table-responsive">
                            <table className='table table-striped'>
                                <thead>
                                <tr>
                                    <th>Thời gian</th>
                                    <th>Trạng thái</th>
                                    <th>Địa điểm</th>
                                    <th>Ghi chú</th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    timelineItems && timelineItems.map(i => (
                                        <tr key={i.created_time}>
                                            <td>{i.created_time}</td>
                                            <td>{i.content}</td>
                                            <td>{i.location || ''}</td>
                                            <td>{i.note}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </Fragment>
        )
    }
}

FmsGeneralTransportOrderInfo.propTypes = {
    transportOrder: propTypes.object,
    timelineItems: propTypes.array,
};

export default FmsGeneralTransportOrderInfo;