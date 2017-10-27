'use strict';

import React from 'react';

import spinnerImg from 'spinner.png';

class FmsSpin extends React.Component {
	render() {
		let size = this.props.size;
		return (
			<div className="fms-spin">
				<img className="spinner" src={spinnerImg} height={size + 'px'} width={size + 'px'}></img>
			</div>
		);
	}
}
FmsSpin.defaultProps = {
	size: 35
}

module.exports = FmsSpin;
