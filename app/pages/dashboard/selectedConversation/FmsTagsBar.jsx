import React from 'react';
import { connect } from 'react-redux';

import DashboardAPI from '../../../api/DashboardApi';
import { handleTagClick } from '../../../actions/dashboard/selectedConversation/tagsBar';

class FmsTagsBar extends React.Component {
  handleTagClick(tag_id, tag_name) {
    this.props.dispatch(handleTagClick(this.props.alias, tag_id, tag_name));
  }
  render() {
    let renderTag = () => {
      let size = this.props.tags.length, index = 0;
      return this.props.tags.map((tag) => {
        let border = (index == 0) ? " start-tag" : ((index == size - 1) ? " end-tag" : "");
        let style = { backgroundColor: tag.color, width: 100 / size + "%" };
        let activeTag = this.props.selectedConversation.tags.filter((_tag) => { return _tag._id == tag._id });
        let opacity = (activeTag.length != 0) ? "" : " blur";
        index++;
        return <div className={"client-tag" + border + opacity} onClick={() => { this.handleTagClick(tag._id, tag.name) }}
          style={style} key={index}>{tag.name}</div>
      });
    };
    return (
      <div className="client-tags-bar">
        {renderTag()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tags: state.dashboard.filters.tags,
    selectedConversation: state.dashboard.selectedConversation.chatArea.conversation
  }
}

export default connect(mapStateToProps)(FmsTagsBar);