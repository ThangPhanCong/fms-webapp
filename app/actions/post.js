import PostsApi from '../api/PostsApi';

export const POSTS_LOADING = 'POSTS_LOADING';
export const POSTS_LOADED = 'POSTS_LOADED';
export const MORE_POSTS_LOADING = 'MORE_POSTS_LOADING';
export const MORE_POSTS_LOADED = 'MORE_POSTS_LOADED';

export const getPosts = (project_alias, nextPosts) => dispatch => {
  if (nextPosts) {
    dispatch({type: MORE_POSTS_LOADING});
    PostsApi.getPostsOfProject(project_alias, nextPosts)
      .then(data => {
        if (data) {
          let posts = data.data;
          let paging = data.paging ? data.paging : null;
          dispatch({type: MORE_POSTS_LOADED, posts, paging});
        } else {
          throw new Error("Posts not found");
        }
      })
      .catch(err => alert(err.message));
  } else {
    dispatch({type: POSTS_LOADING});
    PostsApi.getPostsOfProject(project_alias)
      .then(data => {
        if (data) {
          let posts = data.data;
          let paging = data.paging ? data.paging : null;
          dispatch({type: POSTS_LOADED, posts, paging});
        } else {
          throw new Error("Posts not found");
        }
      })
      .catch(err => alert(err.message));
  }

};

export const toggleChange = (posts, post_id, noti) => () => {
  let postChange = posts.find((post) => {
    return post._id === post_id;
  });
  PostsApi.hideComment(post_id, !postChange.hide_comment)
    .then(() => {
      postChange.hide_comment = !postChange.hide_comment;

      for (let post of posts) {
        if (post._id === post_id) {
          if (post.hide_comment) {
            noti('success', 'Ẩn bình luận thành công');
          } else {
            noti('success', 'Bỏ ẩn bình luận thành công');
          }
        }
      }
    })
    .catch(err => alert(err.message));
};
