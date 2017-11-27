import React from 'react';
import { connect } from 'react-redux';

class FmsCreateFormTab extends React.Component {
  render() {
    let c = this.props.conversation;
    let name = (c && c.customer) ? c.customer.name : "";
    return (
      <div className="create-form-tab">
        <form>
          <div className="form-in-tab">
            <i className="glyphicon glyphicon-user icon-in-tabform"></i>
            <input type="text" className="input-in-tab" placeholder="Tên" defaultValue={name} key={name}/>
          </div>
          <div className="form-in-tab">
            <i className="glyphicon glyphicon-phone icon-in-tabform"></i>
            <input type="text" className="input-in-tab" placeholder="Số điện thoại" />
          </div>
          <div className="form-in-tab">
            <i className="glyphicon glyphicon-home icon-in-tabform"></i>
            <input type="text" className="input-in-tab" placeholder="Địa chỉ" />
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
		conversation: state.dashboard.chat.conversation
  }
}

export default connect(mapStateToProps)(FmsCreateFormTab);
