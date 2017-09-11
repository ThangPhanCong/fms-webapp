'use strict';

const React = require('react');

let FmsCreateFormTab = React.createClass({
  render: function() {
    return (
      <div className="create-form-tab">
        <form>
          <div className="form-in-tab">
            <i className="glyphicon glyphicon-user icon-in-tabform"></i>
            <input type="text" className="input-in-tab" placeholder="Tên"/>
          </div>
          <div className="form-in-tab">
            <i className="glyphicon glyphicon-phone icon-in-tabform"></i>
            <input type="text" className="input-in-tab" placeholder="Số điện thoại"/>
          </div>
          <div className="form-in-tab">
            <i className="glyphicon glyphicon-home icon-in-tabform"></i>
            <input type="text" className="input-in-tab" placeholder="Địa chỉ"/>
          </div>
        </form>
      </div>
    )
  }
});

module.exports = FmsCreateFormTab;
