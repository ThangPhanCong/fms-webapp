import React from 'react'
import FmsTabs from '../../../commons/FmsTabs/FmsTabs';
import FmsTab from '../../../commons/FmsTabs/FmsTab';
import FmsOrdersTab from "./FmsOrdersTab/FmsOrdersTab";

class FmsClientInformation extends React.Component {
    render() {
        return (
            <FmsTabs>
                <FmsTab title="Đơn hàng">
                    <FmsOrdersTab alias={this.props.alias}/>
                </FmsTab>
                <FmsTab title="Thông tin">
                    <div>Thông tin khách hàng</div>
                </FmsTab>
            </FmsTabs>
        )
    }
}

export default FmsClientInformation;