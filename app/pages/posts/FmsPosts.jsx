const React = require('react');
const {browserHistory} = require('react-router');

let FmsPostItem = require('FmsPostItem');
let postApi = require('PostsApi');

let FmsPosts = React.createClass({
  getInitialState: function() {
    return {
      posts: []
    }
  },
  componentDidMount: function() {
    let self = this;

    postApi.getPosts()
      .then(
        posts => {
          self.setState({
            posts: posts
          });
        },
        err => {
          alert('Can\'t get posts');
        }
      )
  },
  onToggleChange: function(fb_post_id) {
    let posts = this.state.posts;
    let postChange = posts.filter((post) => {
      return post.fb_id == fb_post_id;
    });

    for (let post of posts) {
      if (post.fb_id == fb_post_id) {
        post.isHidedComment = !post.isHidedComment;
        // todo: request to hide cmts
      }
    }

    this.setState({
      posts: posts
    });
  },
  renderPosts() {
    let self = this;
    let posts = this.state.posts;

    return posts.map((post) => {
      return (
        <div className="col-sm-6 col-md-4" key={post.fb_id}>
          <FmsPostItem  data={post} key={post.fb_id} onToggleChange={this.onToggleChange}/>
        </div>
      )
    });
  },
  render: function() {
    return (
      <div className="container page">
        <div className="posts-wrapper">
          <p>List posts here</p>
          <div className="row">
            {this.renderPosts()}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = FmsPosts;
