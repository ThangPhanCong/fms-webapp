'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import FmsToolTip from 'FmsToolTip';

class FmsFilterTags extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filters: this.props.filters
		}
	}
	handleTagClick(_id) {
		let newFilters = this.props.filters;
		newFilters.forEach((filter) => {
			if (filter.isTag && filter.type == _id) {
				filter.isActive = !filter.isActive;
			}
		});
		this.setState({ filters: newFilters });
		this.props.handleFilter(newFilters);
	}
	renderFilterTag() {
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
	}
	render() {
		return (
			<div className="filter-tag-bar">
				{this.renderFilterTag()}
			</div>
		)
	}
}

module.exports = FmsFilterTags;