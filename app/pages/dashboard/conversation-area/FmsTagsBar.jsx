const React = require('react');

let DashboardAPI = require('DashboardApi');

let FmsTagsBar = React.createClass({
  getInitialState: function () {
    return {
      isHandling: false,
    }
  },
  handleTagClick: function (tag_id, tag_name) {
    if (this.state.isHandling == true) return;
    let selectedTag = this.props.conversation.tags.filter((tag) => {
      return tag._id == tag_id
    });
    this.setState({ isHandling: true });
    if (selectedTag.length == 0) {
      DashboardAPI.createTagConversation(this.props.alias, this.props.conversation.fb_id, tag_id)
          .then((res) => {
            this.props.updateClientTags(res.tags, this.props.conversation.fb_id);
            this.props.noti('success', 'Tạo tag "' + tag_name + '" thành công');
            this.setState({ isHandling: false });
          }, (err) => {
            this.setState({ isHandling: false });
            this.props.noti('danger', 'Xóa tag thất bại');
            throw new Error(err);
          });
    } else {
      DashboardAPI.deleteTagConversation(this.props.alias, this.props.conversation.fb_id, tag_id)
          .then((res) => {
            this.props.updateClientTags(res.tags, this.props.conversation.fb_id);
            this.props.noti('success', 'Xóa tag "' + tag_name + '" thành công');
            this.setState({ isHandling: false });
          }, (err) => {
            this.setState({ isHandling: false });
            this.props.noti('danger', 'Xóa tag thất bại');
            throw new Error(err);
          });
    }
  },
  render: function () {
    let renderTag = () => {
      let size = this.props.tags.length, index = 0;
      return this.props.tags.map((tag) => {
        let border = (index == 0) ? " start-tag" : ((index == size - 1) ? " end-tag" : "");
        let style = {backgroundColor: tag.color, width: 100 / size + "%"};
        let activeTag = this.props.conversation.tags.filter((_tag) => {return _tag._id == tag._id});
        let opacity = (activeTag.length != 0) ? "" : " blur";
        index++;
        return <div className={"client-tag" + border + opacity} onClick= {() => {this.handleTagClick(tag._id, tag.name)}}
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