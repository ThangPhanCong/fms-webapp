

import React from 'react';

import FmsSpin from 'FmsSpin';

class FmsLoading extends React.Component {
  render () {
    return (
      <div className="loading-wrapper">
        <div className="center">
          <FmsSpin size={50}></FmsSpin>
        </div>
      </div>
    )
  }
}

module.exports = FmsLoading;
