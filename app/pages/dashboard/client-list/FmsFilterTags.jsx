const React = require('react');
const uuid = require('uuid');

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
			return <div className={"filter-tag" + opacity} style={style} key={uuid()}
				onClick={() => { this.handleTagClick(tag._id) }}></div>;
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