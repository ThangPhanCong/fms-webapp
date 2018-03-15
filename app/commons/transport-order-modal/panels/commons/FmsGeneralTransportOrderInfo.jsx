import React, {Component, Fragment} from "react";
import propTypes from 'prop-types';
import FmsTimeline from "../../../FmsTimeline/FmsTimeline";

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

                {
                    timelineItems.length > 0 ? (
                        <div className='row'>
                            <FmsTimeline items={timelineItems}/>

                            <div className='m-l-xl'>

                                        <span className='m-l-lg'>
                                            <i className="fa fa-circle" style={{color: '#7b9d6f'}}/>
                                            {' '} Trạng thái đơn hàng
                                        </span>

                                <span className='m-l-lg'>
                                            <i className="fa fa-circle" style={{color: '#e91b3d'}}/>
                                    {' '} Yêu cầu của shop
                                        </span>
                            </div>
                            <hr/>
                        </div>
                    ) : null
                }
            </Fragment>
        )
    }
}

FmsGeneralTransportOrderInfo.propTypes = {
    transportOrder: propTypes.object,
    timelineItems: propTypes.array,
};

export default FmsGeneralTransportOrderInfo;