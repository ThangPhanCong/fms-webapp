'use strict';

let apiSender = require('ApiSender');
import uuid from 'uuid';

module.exports = {
  getPostsOfPage: (page_id, next) => {
    let route = `/api/pages/${page_id}/posts`;
    if (next) route += `?next=${next}`;

    return apiSender.get(route);
  },
  getPostsOfProject: (project_alias) => {
    let route = `/api/projects/${project_alias}/posts`;

    return apiSender.get(route);
  },
  hideComment: (post_id, hide) => {
    let route;
    if (hide) route = `/api/posts/${post_id}/hidecomment`;
    else route = `/api/posts/${post_id}/unhidecomment`;

    return apiSender.post(route, {});
  },
  getMockPostsOfProject: () => {
    return Promise.resolve(
      [
        {
          "created_time": "2017-09-25T16:43:21+0000",
          "message": "adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô, adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô, adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô",
          fb_id: uuid()
        },
        {
          "created_time": "2017-09-25T16:43:21+0000",
          "message": "adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô, adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô, adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô, adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô",
          fb_id: uuid()
        },
        {
          "created_time": "2017-09-25T16:43:21+0000",
          "message": "adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô, adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô, adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô, adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô",
          fb_id: uuid()
        },
        {
          "created_time": "2017-09-25T16:43:21+0000",
          "message": "adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô, adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô, adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô, adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô",
          fb_id: uuid()
        },
        {
          "created_time": "2017-09-25T16:43:21+0000",
          "message": "adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô, adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô, adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô, adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô",
          fb_id: uuid()
        },
        {
          "created_time": "2017-09-25T16:43:21+0000",
          "message": "adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô, adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô, adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô, adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô",
          fb_id: uuid()
        },
        {
          "created_time": "2017-09-25T16:43:21+0000",
          "message": "adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô, adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô, adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô, adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô",
          fb_id: uuid()
        },
        {
          "created_time": "2017-09-25T16:43:21+0000",
          "message": "adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô, adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô, adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô, adTenSon ông ơi ra đây mà xem được giải oan rồi này. tôi biết ông vô tội mà :))) #Tô",
          fb_id: uuid()
        }
      ]
    )
  }
};
