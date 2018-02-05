import io from 'socket.io-client';
import * as event from '../constants/event';
import * as store from '../helpers/storage';
import {BASE_URL} from 'CONFIG';

let socket = null;

export const subscribeProjectChanges = ({project_alias, onUpdateChanges}) => {
    console.log('subscribeProjectChanges', project_alias);
    if (socket) {
        socket.on(event.PROJECTS_CHANGES_EVENT, onUpdateChanges);
        socket.emit(event.SUBSCRIBE_PROJECTS_CHANGES_EVENT, project_alias);
    } else {
        retry(subscribeProjectChanges, {project_alias, onUpdateChanges});
    }
}

export const unSubscribeProjectChanges = ({project_alias}) => {
    console.log('unSubscribeProjectChanges', project_alias);
    if (socket) {
        socket.off(event.PROJECTS_CHANGES_EVENT);
        socket.emit(event.UN_SUBSCRIBE_PROJECTS_CHANGES_EVENT, project_alias);
    }
    // else {
    //   retry(unSubscribeProjectChanges, {project_alias});
    // }
}

export const subscribePagesChanges = ({page_id, onCrawlSuccess, onCrawlFail}) => {
    console.log('subscribePageChanges ', page_id);
    if (socket) {
        socket.emit(event.SUBSCRIBE_PAGES_CHANGES_EVENT, page_id);
        socket.on(event.GET_HISTORY_PAGE_SUCCESSFUL_EVENT, onCrawlSuccess);
        socket.on(event.GET_HISTORY_PAGE_FAILURE_EVENT, onCrawlFail);
    } else {
        retry(subscribePagesChanges, {page_id, onCrawlSuccess, onCrawlFail});
    }
}

export const unsubscribePagesChanges = ({page_id}) => {
    console.log('unsubscribePageChanges ', page_id);
    if (socket) {
        socket.emit(event.UN_SUBSCRIBE_PAGES_CHANGES_EVENT, page_id);
        socket.off(event.GET_HISTORY_PAGE_SUCCESSFUL_EVENT);
        socket.off(event.GET_HISTORY_PAGE_FAILURE_EVENT);
    }
}

export const getPageHistory = ({page_id}) => {
    console.log('getPageHistory ', page_id);
    if (socket) {
        socket.emit(event.GET_HISTORY_PAGE_EVENT, page_id);
    } else {
        retry(getPageHistory, {page_id});
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

        function unsubscribeActivePage(_socket) {
            _socket.off(event.ACTIVE_PAGE_UPDATE_EVENT);
            _socket.off(event.ACTIVE_PAGE_FAILURE_EVENT);
            _socket.off(event.ACTIVE_PAGE_SUCCESSFUL_EVENT);
        }
    } else {
        retry(activePage, {page_fb_id, onUpdate, onDone});
    }
};

export const connect = (cb) => {
    if (socket) {
        return;
    }
    const serverUrl = BASE_URL;
    const access_token = store.get('access_token');
    const query = {access_token: access_token};
    let _socket = io.connect(serverUrl, {query});

    _socket.on('connect', () => {
        socket = _socket;
        console.log('Connect socket successfully!');
        cb();
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
    console.log('retry');

    const onConnected = () => {
        func(params);
    }

    connect(onConnected);
    // setTimeout(func, 1000, params);
}

export default socket;
