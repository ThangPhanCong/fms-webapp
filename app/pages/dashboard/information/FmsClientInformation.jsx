import React from 'react';
import FmsInformationTab from './FmsInformationTab';
import FmsCreateFormTab from './FmsCreateFormTab';
import Tabs from 'muicss/lib/react/tabs';
import Tab from 'muicss/lib/react/tab';

class FmsClientInformation extends React.Component {
  render() {
    return (
      <div>
        <Tabs justified={true}>
          <Tab value="pane-1" label="Thông tin">
            <FmsInformationTab noti={this.props.noti}/>
          </Tab>
          <Tab value="pane-2" label="Tạo đơn">
            <FmsCreateFormTab />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

module.exports = FmsClientInformation;
