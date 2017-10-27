

const io = require('socket.io-client');
const constant = require('constant');
let socket = null;

let subscribePageChanges = ({page_fb_id, onUpdateChanges}) => {
  if (socket) {
    socket.emit(constant.SUBSCRIBE_PAGE_CHANGES_EVENT, page_fb_id);
    socket.on(constant.PAGE_CHANGES_EVENT, onUpdateChanges);
  } else {
    retry(subscribePageChanges, {page_fb_id, onUpdateChanges});
  }
};

let activePage = ({page_fb_id, onUpdate, onDone}) => {
  if (socket) {
    socket.emit(constant.ACTIVE_PAGE_EVENT, page_fb_id);

    socket.on(constant.ACTIVE_PAGE_UPDATE_EVENT, (res) => {
      console.log('ACTIVE_PAGE_UPDATE_EVENT', res.data);

      onUpdate(res.data);
    });

    socket.on(constant.ACTIVE_PAGE_SUCCESSFUL_EVENT, (res) => {
      console.log('ACTIVE_PAGE_SUCCESSFUL_EVENT', res);

      onDone(null, res);
      unsubscribeActivePage(socket);
    });

    socket.on(constant.ACTIVE_PAGE_FAILURE_EVENT, (res) => {
      console.log('ACTIVE_PAGE_FAILURE_EVENT', res);

      onDone(true, res);
      unsubscribeActivePage(socket);
    });

    function unsubscribeActivePage (_socket) {
      _socket.off(constant.ACTIVE_PAGE_UPDATE_EVENT);
      _socket.off(constant.ACTIVE_PAGE_FAILURE_EVENT);
      _socket.off(constant.ACTIVE_PAGE_SUCCESSFUL_EVENT);
    }
  } else {
    retry(activePage, {page_fb_id, onUpdate, onDone});
  }
};

let retry = (func, params) => {
  setTimeout(func, 1000, params);
}

let connect = (serverUrl, jwt) => {
  if (socket) {
    return;
  }
  let query = {access_token: jwt};
	let _socket = io.connect(serverUrl, {query});

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
exports.subscribePageChanges = subscribePageChanges;
exports.activePage = activePage;
