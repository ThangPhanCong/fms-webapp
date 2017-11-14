import io from 'socket.io-client';
import * as event from '../constants/event';
import {BASE_URL} from 'CONFIG';

let socket = null;

export const subscribePageChanges = ({page_fb_id, onUpdateChanges}) => {
  if (socket) {
    socket.emit(event.SUBSCRIBE_PAGE_CHANGES_EVENT, page_fb_id);
    socket.on(event.PAGE_CHANGES_EVENT, onUpdateChanges);
  } else {
    retry(subscribePageChanges, {page_fb_id, onUpdateChanges});
  }
}

export const subscribeProjectChanges = ({project_alias, onUpdateChanges}) => {
  if (socket) {
    socket.on(event.PROJECTS_CHANGES_EVENT, onUpdateChanges);
    socket.emit(event.SUBSCRIBE_PROJECTS_CHANGES_EVENT, project_alias);
  } else {
    retry(subscribeProjectChanges, {project_alias, onUpdateChanges});
  }
}

export const unSubscribeProjectChanges = ({project_alias}) => {
  if (socket) {
    socket.off(event.PROJECTS_CHANGES_EVENT);
    socket.emit(event.UN_SUBSCRIBE_PROJECTS_CHANGES_EVENT, project_alias);
  } else {
    retry(unSubscribeProjectChanges, {project_alias});
  }
}

export const activePage = ({page_fb_id, onUpdate, onDone}) => {
  if (socket) {
    socket.emit(event.ACTIVE_PAGE_EVENT, page_fb_id);

    socket.on(event.ACTIVE_PAGE_UPDATE_EVENT, (res) => {
      onUpdate(res.data);
    });

    socket.on(event.ACTIVE_PAGE_SUCCESSFUL_EVENT, (res) => {
      onDone(null, res);
      unsubscribeActivePage(socket);
    });

    socket.on(event.ACTIVE_PAGE_FAILURE_EVENT, (res) => {
      onDone(true, res);
      unsubscribeActivePage(socket);
    });

    function unsubscribeActivePage (_socket) {
      _socket.off(event.ACTIVE_PAGE_UPDATE_EVENT);
      _socket.off(event.ACTIVE_PAGE_FAILURE_EVENT);
      _socket.off(event.ACTIVE_PAGE_SUCCESSFUL_EVENT);
    }
  } else {
    retry(activePage, {page_fb_id, onUpdate, onDone});
  }
};

export const connect = (access_token) => {
  if (socket) {
    return;
  }
  const serverUrl = BASE_URL;
  let query = {access_token: access_token};
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

export const disconnect = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

const retry = (func, params) => {
  setTimeout(func, 1000, params);
}

export default socket;
