const React = require('react');
const FmsInformationTab = require('FmsInformationTab');
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
            Pane-2
          </Tab>
        </Tabs>
      </div>
    );
  }
});

module.exports = FmsClientInformation;