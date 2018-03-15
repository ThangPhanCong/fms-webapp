import React from 'react';
import {connect} from 'react-redux';


import FmsToolTip from '../../../../commons/FmsToolTip/FmsToolTip';
import {handleTagFilterClick, handleTypeFilterClick} from '../../../../actions/dashboard/filters';
import unreadImg from '../../../../assets/images/unread.png';
import unreadActiveImg from '../../../../assets/images/unread_active.png';

class FmsFilterTags extends React.Component {
    handleTagFilterClick(_id) {
        this.props.dispatch(handleTagFilterClick(this.props.alias, _id));
    }

    renderFilterTag() {
        if (!this.props.tags) return;

        let srcUnread = unreadImg;
        this.props.filters.forEach(f => {
            if (f.type === 'unread' && f.isActive) srcUnread = unreadActiveImg;
        });

        let unread = <FmsToolTip message="Chưa đọc" direction="top" key={12}>
            <div onClick={() => {
                this.props.dispatch(handleTagFilterClick(this.props.alias, 'unread'));
            }} className="unread-filter clickable">
                <img src={srcUnread}/>
            </div>
        </FmsToolTip>;
        let filters = this.props.tags.map((tag) => {
            let style = {backgroundColor: tag.color};
            let opacity;
            if (Array.isArray(this.props.filters)) {
                let selected = this.props.filters.filter((filter) => {
                    return filter.isTag && filter.isActive && filter.type === tag._id
                });
                opacity = (selected.length !== 0) ? " selected-filter-tag" : " very-blur";
            } else opacity = " very-blur";
            return <FmsToolTip message={tag.name} direction="top" key={tag._id}>
                <div className={"filter-tag" + opacity}
                     style={style} onClick={() => {
                    this.handleTagFilterClick(tag._id)
                }}/>
            </FmsToolTip>;
        });
        filters.unshift(unread);
        return filters;
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
};

export default connect(mapStateToProps)(FmsFilterTags);
