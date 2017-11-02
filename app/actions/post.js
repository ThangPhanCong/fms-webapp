import * as store from '../helpers/storage';
import PostsApi from '../api/PostsApi';

export const POSTS_LOADING = 'POSTS_LOADIND';
export const POSTS_LOAD_MORE = 'POSTS_LOAD_MORE';

export const MORE_POSTS_LOADING = 'MORE_POSTS_LOADING';
export const MORE_POSTS_LOADED = 'MORE_POSTS_LOADED';

export const getPosts = (project_alias, nextPosts) => dispatch => {
  dispatch({type: POSTS_LOADING});

  PostsApi.getPostsOfProject(project_alias, nextPosts)
    .then(data => {
      let posts = data.data;
      let next = data.paging ? (data.paging.next ? data.paging.next : null) : null;
      dispatch({type: POSTS_LOAD_MORE, posts, next});
    })
}

export const toggleChange = (posts, fb_post_id, noti) => dispatch => {
  let postChange = posts.find((post) => {
    return post.fb_id == fb_post_id;
  });
  PostsApi.hideComment(fb_post_id, !postChange.hide_comment)
    .then(() => {
      postChange.hide_comment = !postChange.hide_comment;

      for (let post of posts) {
        if (post.fb_id == fb_post_id) {
          if (post.hide_comment) {
            noti('success', 'Ẩn bình luận thành công');
          } else {
            noti('success', 'Bỏ ẩn bình luận thành công');
          }
        }
      }
    })
    .catch(err => alert(err.message));
}
