'use strict';

const React = require('react');

const noteImg = require('note.png');

let FmsInformationTab = React.createClass({
  render: function () {
    return (
      <div className="information-tab">
        <img src={noteImg} className="note-icon"/>
        <input type="text" className="note-form" placeholder="Nhập nội dung ghi chú"/>
      </div>
    );
  }
});

module.exports = FmsInformationTab;
