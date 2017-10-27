

const React = require('react');

const spinnerImg = require('spinner.png');

let FmsSpin = React.createClass({
  // getInitialState: function () {
	// 	return {
	// 		loading: true
	// 	}
	// },
	getDefaultProps: function() {
		return {
			size: 35
		};
	},
	render: function () {
		let size = this.props.size;

		return (
			<div className="fms-spin">
				<img className="spinner" src={spinnerImg} height={size + 'px'} width={size + 'px'}></img>
			</div>
		);
	}
});

module.exports = FmsSpin;
