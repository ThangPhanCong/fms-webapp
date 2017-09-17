'use strict';

const React = require('react');

const notepadImg = require('notepad.png');

let FmsInformationTab = React.createClass({
  render: function () {
    return (
      <div className="information-tab">
        <img src={notepadImg} className="note-icon"/>
        <input type="text" className="note-form" placeholder="Nhập nội dung ghi chú"/>
      </div>
    );
  }
});

module.exports = FmsInformationTab;
