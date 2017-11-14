import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import FmsToolTip from '../../../components/FmsToolTip';
import { handleTagFilterClick } from '../../../actions/dashboard/filters';

class FmsFilterTags extends React.Component {
	handleTagFilterClick(_id) {
		this.props.dispatch(handleTagFilterClick(_id));
	}
	renderFilterTag() {
		if (!this.props.tags) return;
		return this.props.tags.map((tag) => {
			let style = { backgroundColor: tag.color };
			let opacity;
			if (this.props.filters) {
				let selected = this.props.filters.filter((filter) => {
					return filter.isTag && filter.isActive && filter.type == tag._id
				});
				opacity = (selected.length != 0) ? " selected-filter-tag" : " very-blur";
			} else opacity = " very-blur";
			return <FmsToolTip message={tag.name} direction="top" key={tag._id}><div className={"filter-tag" + opacity}
				style={style} onClick={() => { this.handleTagFilterClick(tag._id) }}></div></FmsToolTip>;
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

const mapStateToProps = state => {
  return {
		filters: state.dashboard.filters.filters,
		tags: state.dashboard.filters.tags
  }
}

export default connect(mapStateToProps)(FmsFilterTags);