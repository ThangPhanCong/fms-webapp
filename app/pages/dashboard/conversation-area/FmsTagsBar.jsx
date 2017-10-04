const React = require('react');

let FmsTagsBar = React.createClass({
  getInitialState: function () {
    return {
      isHandling: false
    }
  },
  handleTagClick: function (tag_id) {
    if (this.state.isHandling == true) return;
  },
  render: function () {
    let renderTag = () => {
      let size = this.props.tags.length, index = 0;
      return this.props.tags.map((tag) => {
        let border = (index == 0) ? " start-tag" : ((index == size - 1) ? " end-tag" : "");
        let style = {backgroundColor: tag.color, width: 100 / size + "%"};
        index++;
        return <div className={"client-tag" + border} onClick= {() => {this.handleTagClick(tag._id)}}
                style={style} key={index}>{tag.name}</div>
      });
    };
    return (
      <div className="client-tags-bar">
        {renderTag()}
      </div>
    )
  }
});

module.exports = FmsTagsBar;