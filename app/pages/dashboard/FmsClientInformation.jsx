const React = require('react');
const FmsInformationTab = require('FmsInformationTab');
const FmsCreateFormTab = require('FmsCreateFormTab');
import Tabs from 'muicss/lib/react/tabs';
import Tab from 'muicss/lib/react/tab';

let FmsClientInformation = React.createClass({
  render: function () {
    return (
      <div>
        <Tabs justified={true}>
          <Tab value="pane-1" label="Thông tin">
            <FmsInformationTab/>
          </Tab>
          <Tab value="pane-2" label="Tạo đơn">
            <FmsCreateFormTab/>
          </Tab>
        </Tabs>
      </div>
    );
  }
});

module.exports = FmsClientInformation;
