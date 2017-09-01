'use strict';

const io = require('socket.io-client');
const constant = require('constant');
let socket = null;

let subscribePage = (page_fb_id) => {
  if (socket) {
    socket.emit(constant.SUBSCRIBE_PAGE_EVENT, page_fb_id);
  } else {
    retryConnect(subscribePage, page_fb_id);
  }
};

let retryConnect = (func, params) => {
  setTimeout(func, 1000, params);
}

let connect = (jwt) => {
  let query = {access_token: jwt};
	let _socket = io.connect('localhost:3001', {query});

  _socket.on('connect', () => {
    socket = _socket;
    console.log('Connect socket successfully!');
  });

  _socket.on('error', (err) => {
    console.log('Connect socket fail', err);
  });
};

exports.connect = connect;
exports.subscribePage = subscribePage;
