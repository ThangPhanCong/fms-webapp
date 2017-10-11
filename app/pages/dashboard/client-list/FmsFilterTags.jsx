const React = require('react');
const ReactDOM = require('react-dom');

let FmsToolTip = require('FmsToolTip');

let FmsFilterTags = React.createClass({
	getInitialState: function () {
		return {
			filters: this.props.filters
		}
	},
	handleTagClick: function (_id) {
		let newFilters = this.props.filters;
		newFilters.forEach((filter) => {
			if (filter.isTag && filter.type == _id) {
				filter.isActive = !filter.isActive;
			}
		});
		this.setState({ filters: newFilters });
		this.props.handleFilter(newFilters);
	},
	renderFilterTag: function () {
		if (!this.props.tags) return;
		return this.props.tags.map((tag) => {
			let style = { backgroundColor: tag.color };
			let opacity;
			if (this.state.filters) {
				let selected = this.state.filters.filter((filter) => {
					return filter.isTag && filter.isActive && filter.type == tag._id
				});
				opacity = (selected.length != 0) ? " selected-filter-tag" : " very-blur";
			} else opacity = " very-blur";
			return <FmsToolTip message={tag.name} direction="top" key={tag._id}><div className={"filter-tag" + opacity} 
						 style={style} onClick={() => { this.handleTagClick(tag._id) }}></div></FmsToolTip>;
		});
	},
	render: function () {
		return (
			<div className="filter-tag-bar">
				{this.renderFilterTag()}
			</div>
		)
	}
});

module.exports = FmsFilterTags;