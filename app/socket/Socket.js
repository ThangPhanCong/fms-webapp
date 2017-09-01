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

let activePage = ({page_fb_id, onUpdate, onDone}) => {
  if (socket) {
    socket.emit(constant.ACTIVE_PAGE_EVENT, page_fb_id);

    socket.on(constant.ACTIVE_PAGE_SUCCESSFUL_EVENT, (data) => {
      console.log('ACTIVE_PAGE_SUCCESSFUL_EVENT', data);

      onDone();
    });

    socket.on(constant.ACTIVE_PAGE_FAILURE_EVENT, (data) => {
      console.log('ACTIVE_PAGE_FAILURE_EVENT',data);

      onDone();
    });
  } else {
    retryConnect(activePage, {page_fb_id, onUpdate, onDone});
  }
};

let retryConnect = (func, params) => {
  setTimeout(func, 1000, params);
}

let connect = (jwt) => {
  if (socket) {
    return;
  }
  let query = {access_token: jwt};
	let _socket = io.connect('localhost:3001', {query});

  _socket.on('connect', () => {
    socket = _socket;
    console.log('Connect socket successfully!');
  });

  _socket.on('disconnect', () => {
    console.log('Socket is disconnected');
  });

  _socket.on('error', (err) => {
    console.log('Connect socket fail', err);
  });
};

let disconnect = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

exports.connect = connect;
exports.disconnect = disconnect;
exports.subscribePage = subscribePage;
exports.activePage = activePage;
