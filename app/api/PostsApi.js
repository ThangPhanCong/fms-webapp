'use strict';

let apiSender = require('ApiSender');
import uuid from 'uuid';

module.exports = {
  getPostsOfPage: (page_id) => {
    let route = `/api/pages/${page_id}/posts`;

    return apiSender.get(route);
  },
  getPostsOfProject: (project_id) => {
    let route = `/api/projects/${project_id}/posts`;

    return apiSender.get(route);
  },
  autoHideComment: (post_id) => {
    let route = `/api/posts/${post_id}/hidecomment`;

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
