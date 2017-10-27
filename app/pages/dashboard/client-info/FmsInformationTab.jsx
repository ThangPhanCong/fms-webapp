'use strict';

import React from 'react';
import notepadImg from 'notepad.png';

class FmsInformationTab extends React.Component {
  render() {
    return (
      <div className="information-tab">
        <img src={notepadImg} className="note-icon" />
        <input type="text" className="note-form" placeholder="Nhập nội dung ghi chú" />
      </div>
    );
  }
}

module.exports = FmsInformationTab;
