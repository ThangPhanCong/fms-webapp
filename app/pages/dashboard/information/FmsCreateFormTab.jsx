import React from 'react';
import { connect } from 'react-redux';

import { createNewOrder } from '../../../actions/dashboard/chat/createOrder';

class FmsCreateFormTab extends React.Component {
  createOrder() {
    let r = this.refs;
    let phone = r.phone.value;
    let address = r.address.value;
    let name = r.name.value;
    if (phone == "" || address == "" || name == "") {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    this.props.dispatch(createNewOrder(r.phone.value, r.address.value, this.props.noti));
    r.phone.value = "";
    r.address.value = "";
  }
  render() {
    let c = this.props.conversation;
    let name = (c && c.customer) ? c.customer.name : "";
    return (
      <div className="create-form-tab">
        <div className="form-in-tab">
          <i className="glyphicon glyphicon-user icon-in-tabform"></i>
          <input ref="name" type="text" className="input-in-tab" placeholder="Tên" defaultValue={name} key={name}/>
        </div>
        <div className="form-in-tab">
          <i className="glyphicon glyphicon-phone icon-in-tabform"></i>
          <input ref="phone" type="text" className="input-in-tab" placeholder="Số điện thoại" />
        </div>
        <div className="form-in-tab">
          <i className="glyphicon glyphicon-home icon-in-tabform"></i>
          <input ref="address" type="text" className="input-in-tab" placeholder="Địa chỉ" />
        </div>
        <button className="create-form-button" onClick={this.createOrder.bind(this)}>Tạo</button>
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
