'use strict';

const React = require('react');

let { FadeLoader } =  require('react-spinners');

let FmsSpin = React.createClass({
  getInitialState: function () {
		return {
			loading: true
		}
	},
	render: function () {
		return (
			<div className="fms-spin">
				<FadeLoader loading={this.state.loading}></FadeLoader>
			</div>
		);
	}
});

module.exports = FmsSpin;
