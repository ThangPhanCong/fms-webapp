const Cookie = require('universal-cookie');
const axios = require('axios');

module.exports = {
  getPosts: function() {
    let posts = [
      {
        fb_id: '23142342342334',
        message: 'Hom nay la thu high',
        img: 'https://scontent.xx.fbcdn.net/v/t1.0-9/s720x720/20525302_698424647034142_194183038564561297_n.jpg?oh=8a35af7c300370d90ecba8c179a15799&oe=5A2996A5',
        isHidedComment: true,
        created_time: '29-11-2017'
      }, {
        fb_id: '23142342434234',
        message: 'Hom nay la thu bar',
        img: 'https://scontent.xx.fbcdn.net/v/t1.0-9/s720x720/20525302_698424647034142_194183038564561297_n.jpg?oh=8a35af7c300370d90ecba8c179a15799&oe=5A2996A5',
        isHidedComment: false,
        created_time: '29-11-2017'
      }, {
        fb_id: '23142434234234',
        message: 'Hom nay la thu too',
        img: 'https://scontent.xx.fbcdn.net/v/t1.0-9/s720x720/20525302_698424647034142_194183038564561297_n.jpg?oh=8a35af7c300370d90ecba8c179a15799&oe=5A2996A5',
        isHidedComment: false,
        created_time: '29-11-2017'
      }, {
        fb_id: '23142342342234',
        message: 'Hom nay la thu numb',
        img: 'https://scontent.xx.fbcdn.net/v/t1.0-9/s720x720/20525302_698424647034142_194183038564561297_n.jpg?oh=8a35af7c300370d90ecba8c179a15799&oe=5A2996A5',
        isHidedComment: true,
        created_time: '29-11-2017'
      }
    ];

    return Promise.resolve(posts);
  }
};
