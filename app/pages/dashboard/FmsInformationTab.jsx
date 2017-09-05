const React = require('react');

let FmsInformationTab = React.createClass({
  render: function () {
    return (
      <div className="information-tab">
        <img src="/img/note.png" className="note-icon"/>
        <input type="text" className="note-form" placeholder="Nhập nội dung ghi chú"/>
      </div>
    );
  }
});

module.exports = FmsInformationTab;