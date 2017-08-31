const React = require('react');
const {browserHistory} = require('react-router');

let FmsPostItem = React.createClass({
  onToggleChange: function(checked) {
    this.props.onToggleChange(this.props.data.fb_id);
  },
  renderImgs: function() {
    return (
      <img src={this.props.data.img} />
    );
  },
  render: function() {
    return (
      <div className="thumbnail">
        {this.renderImgs()}
        <div className="caption">
          <p>{this.props.data.message}</p>
          <div><input type="checkbox" checked={this.props.data.isHidedComment} onChange={this.onToggleChange}/> Ẩn bình luận</div>
        </div>
      </div>
    );
  }
});

module.exports = FmsPostItem;
