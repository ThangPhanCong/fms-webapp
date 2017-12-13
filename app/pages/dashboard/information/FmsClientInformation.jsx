import React from 'react';
import { connect } from 'react-redux';
import FmsInformationTab from './FmsInformationTab';
import FmsCreateFormTab from './FmsCreateFormTab';
import Tabs from 'muicss/lib/react/tabs';
import Tab from 'muicss/lib/react/tab';

class FmsClientInformation extends React.Component {
  renderTab1() {
    if (!this.props.conversation) return;
    return <FmsInformationTab noti={this.props.noti}/>
  }
  renderTab2() {
    if (!this.props.conversation) return;
    return <FmsCreateFormTab noti={this.props.noti}/>
  }
  render() {
    return (
      <div>
        <Tabs justified={true}>
          <Tab value="pane-1" label="Thông tin">
            {this.renderTab1()}
          </Tab>
          <Tab value="pane-2" label="Tạo đơn">
            {this.renderTab2()}
          </Tab>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    conversation: state.dashboard.chat.conversation
  }
}

export default connect(mapStateToProps)(FmsClientInformation);
