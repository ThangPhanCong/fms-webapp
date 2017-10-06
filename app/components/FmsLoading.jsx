'use strict';

import React from 'react';

import FmsSpin from 'FmsSpin';

let FmsLoading =  React.createClass({
  render: function() {
    return (
      <div className="loading-wrapper">
        <div className="center">
          <FmsSpin size={50}></FmsSpin>
        </div>
      </div>
    )
  }
});

module.exports = FmsLoading;
