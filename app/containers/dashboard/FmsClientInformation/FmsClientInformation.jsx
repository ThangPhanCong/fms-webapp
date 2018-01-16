import React from 'react'
import FmsTabs from '../../../commons/FmsTabs/FmsTabs';
import FmsTab from '../../../commons/FmsTabs/FmsTab';
import FmsOrdersTab from "./FmsOrdersTab/FmsOrdersTab";
import FmsInformationTab from "./FmsInformationTab/FmsInformationTab";

class FmsClientInformation extends React.Component {
    render() {
        return (
            <FmsTabs>
                <FmsTab title="Đơn hàng">
                    <FmsOrdersTab alias={this.props.alias}/>
                </FmsTab>
                <FmsTab title="Thông tin">
                    <FmsInformationTab/>
                </FmsTab>
            </FmsTabs>
        )
    }
}

export default FmsClientInformation;