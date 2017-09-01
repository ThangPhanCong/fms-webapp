const React = require('react');
const {browserHistory} = require('react-router');

let FmsPostItem = React.createClass({
  onToggleChange: function(checked) {
    this.props.onToggleChange(this.props.data.fb_id);
  },
  renderImgs: function() {
    let img = 'https://scontent.xx.fbcdn.net/v/t1.0-9/s720x720/20525302_698424647034142_194183038564561297_n.jpg?oh=8a35af7c300370d90ecba8c179a15799&oe=5A2996A5';

    return (
      <img src={img} />
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
